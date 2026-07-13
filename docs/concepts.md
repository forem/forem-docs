---
title: Working with Concepts
slug: /concepts
---

# Working with Concepts

Concepts in Forem allow you to group and classify content semantically using advanced machine learning models (specifically `gemini-embedding-2`). Instead of relying solely on traditional tagging or exact keyword matching, concepts define a "semantic anchor" using a name and description. Forem automatically generates embeddings for these anchors and maps articles to them when the semantic similarity exceeds a specified threshold.

This guide is designed for curators, creators, and users who have been granted access to manage specific concepts on a Forem platform (e.g., [DEV.to](https://dev.to)), as well as Forem administrators who manage the concepts ecosystem.

---

## Authorization & Roles

Access to the Concepts API is determined by your user role and explicit permissions:

1. **Users with Concept Access (Curators / Specific Owners)**:
   - If a Forem administrator has granted you access to a concept, that concept is considered one of your **accessible concepts**.
   - You can list your accessible concepts, retrieve their details, fetch articles mapped to them, and **update** their metadata (e.g., description, similarity threshold, and score).
   
2. **Super Administrators**:
   - Have full system-wide access.
   - Can **create** new concepts globally, **delete** concepts, and trigger **historical backfills (lookbacks)** to categorize older articles.

:::info API Headers
All requests to the Forem API require the following headers:
- `Accept: application/vnd.forem.api-v1+json`
- `api-key: YOUR_API_KEY` (Generate this from your settings page on DEV.to)
:::

---

## Accessing Concepts

These endpoints allow you to query, search, and retrieve concepts that you have permission to access.

### 1. List All Accessible Concepts
Retrieves a paginated list of concepts that you have been granted access to.

* **HTTP Method:** `GET`
* **Path:** `/api/concepts`
* **Query Parameters:**
  - `page` (integer, optional): The page number for pagination. Default is `1`.
  - `per_page` (integer, optional): The number of items to return per page. Default is `10`.
  - `days` (integer, optional): The window of days used to calculate popularity scores for the concepts (e.g., `7` or `14`).

#### Example Request
```bash
curl -X GET "https://dev.to/api/concepts?page=1&per_page=10&days=7" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_API_KEY"
```

---

### 2. Retrieve Details of a Single Concept
Retrieves detailed information for a specific concept, including its similarity thresholds, description, and popularity metrics.

* **HTTP Method:** `GET`
* **Path:** `/api/concepts/{id}`
* **Path Parameters:**
  - `id` (integer, required): The ID of the concept.
* **Query Parameters:**
  - `days` (integer, optional): The window of days to calculate the popularity score for this concept.

#### Example Request
```bash
curl -X GET "https://dev.to/api/concepts/123?days=14" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_API_KEY"
```

---

### 3. Retrieve Articles Mapped to a Concept
Retrieves a paginated list of articles that have been classified under a specific concept.

* **HTTP Method:** `GET`
* **Path:** `/api/concepts/{id}/articles`
* **Path Parameters:**
  - `id` (integer, required): The ID of the concept.
* **Query Parameters:**
  - `page` (integer, optional): Page number for pagination. Default is `1`.
  - `per_page` (integer, optional): Number of articles to return per page. Default is `20`.
  - `sort` (string, optional): How to order the resulting articles.
    - `-similarity` (default): Orders articles by semantic relevance (cosine distance to the concept's anchor embedding), showing the most relevant articles first.
    - `-published_at`: Orders articles chronologically, showing the most recently published articles first.

#### Example Request
```bash
curl -X GET "https://dev.to/api/concepts/123/articles?sort=-similarity&page=1&per_page=20" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_API_KEY"
```

---

## Modifying & Managing Concepts

Depending on your permissions, you can create, modify, backfill, or delete concepts.

### 1. Update a Concept's Metadata
If you have access to a concept (or if you are a Super Admin), you can update its metadata to refine classification rules.

* **HTTP Method:** `PATCH`
* **Path:** `/api/concepts/{id}`
* **Path Parameters:**
  - `id` (integer, required): The ID of the concept to update.
* **Request Body (JSON):**
  - `concept` (object, required):
    - `description` (string, optional): Updates the semantic description used to calculate the anchor embedding. Modifying this will recompute the concept's embedding, which may change which articles are classified under this concept.
    - `similarity_threshold` (number, optional): A value between `0.0` and `1.0` (typically `0.7` to `0.9`). Determines how closely an article's embedding must match the concept's anchor embedding to be classified under it. A higher threshold makes classification stricter (fewer, highly relevant articles), while a lower threshold is more permissive (more articles, potential for noise).
    - `score` (number, optional): A weight/priority score assigned to the concept.

#### Example Request
```bash
curl -X PATCH "https://dev.to/api/concepts/123" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "concept": {
         "description": "Updated machine learning and deep neural networks definition.",
         "similarity_threshold": 0.80
       }
     }'
```

---

### 2. Create a New Concept (Super Admin Only)
Super Admins can create new global concepts. When created, Forem automatically generates a semantic anchor embedding using `gemini-embedding-2` based on the concept's initial description.

* **HTTP Method:** `POST`
* **Path:** `/api/admin/concepts`
* **Request Body (JSON):**
  - `concept` (object, required):
    - `name` (string, required): The display name of the concept.
    - `description` (string, required): The detailed description used to generate the semantic embedding. Be descriptive to ensure high-quality matching.
    - `similarity_threshold` (number, required): The threshold for matching (e.g., `0.75`).
    - `score` (number, optional): The priority score/weight (e.g., `1.0`).

#### Example Request
```bash
curl -X POST "https://dev.to/api/admin/concepts" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_SUPER_ADMIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "concept": {
         "name": "Machine Learning",
         "description": "Artificial intelligence, deep learning, training neural networks, transformers, and LLMs.",
         "similarity_threshold": 0.75,
         "score": 1.0
       }
     }'
```

---

### 3. Trigger Historical Backfill / Lookback (Super Admin Only)
When a concept is newly created or significantly updated, newly published articles will be classified automatically. However, existing articles are not automatically re-evaluated unless you trigger a historical lookback.

This endpoint queues a background worker to scan articles published within the last `N` days and evaluate them against the concept's anchor embedding.

* **HTTP Method:** `POST`
* **Path:** `/api/admin/concepts/{id}/trigger_lookback`
* **Path Parameters:**
  - `id` (integer, required): The ID of the concept.
* **Request Body (JSON):**
  - `days` (integer, required): The number of historical days to scan (e.g., `30` to backfill the last month of articles).

#### Example Request
```bash
curl -X POST "https://dev.to/api/admin/concepts/123/trigger_lookback" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_SUPER_ADMIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "days": 30
     }'
```

---

### 4. Delete a Concept (Super Admin Only)
Permanently deletes the concept anchor and removes all associated article classifications. This action is irreversible.

* **HTTP Method:** `DELETE`
* **Path:** `/api/admin/concepts/{id}`
* **Path Parameters:**
  - `id` (integer, required): The ID of the concept to delete.

#### Example Request
```bash
curl -X DELETE "https://dev.to/api/admin/concepts/123" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_SUPER_ADMIN_API_KEY"
```
