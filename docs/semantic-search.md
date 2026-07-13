---
title: Semantic Search
slug: /semantic-search
---

# Embedding-Driven Semantic Search

Forem supports embedding-driven semantic search, which allows users to search for content based on the actual *meaning* and *intent* of their query rather than relying on exact keyword matching.

This feature uses advanced machine learning models to generate high-dimensional vector embeddings of articles and concept anchors, which are then compared using vector similarity algorithms to locate the most conceptually relevant results.

---

## Technical Overview

* **Embedding Model:** Forem generates 768-dimensional text embeddings using Google's `gemini-embedding-2` model.
* **Vector Database Indexing:** Under the hood, Forem utilizes PostgreSQL with the `pgvector` extension (version `0.8.0+`) and Hierarchical Navigable Small World (**HNSW**) indexes to perform high-performance, low-latency cosine distance searches.
* **Distance Metric:** Search results are ordered by cosine distance (represented by the `<=>` operator in SQL queries). 

---

## Keyword Search vs. Semantic Search

When searching for articles on a Forem platform, clients can choose between traditional keyword search and semantic search depending on the use case:

| Feature / Aspect | Keyword Search (`/api/articles/search`) | Semantic Search (`/api/articles/semantic_search`) |
| :--- | :--- | :--- |
| **Matching Style** | Lexical matching (exact terms, tags, matches titles/body) | Semantic similarity (matches intent/meaning) |
| **Authentication** | Publicly accessible (no API key required) | Authenticated (requires a valid `api-key`) |
| **Result Metrics** | Matches count / Relevance ranking | Cosine distance and similarity score |
| **Filtering** | Basic search queries | Refinements via cosine distance thresholds |

---

## Authentication & Headers

Unlike standard keyword search, semantic search endpoints require authentication. You must include your API key and the version 1 accept header in the request:

:::info API Headers
* `Accept: application/vnd.forem.api-v1+json`
* `api-key: YOUR_API_KEY` (Generate this in your settings page on DEV.to)
:::

---

## Endpoints

### 1. Semantic Article Search
Search all published articles on the platform semantically using a natural language query.

* **HTTP Method:** `GET`
* **Path:** `/api/articles/semantic_search`
* **Query Parameters:**
  - `q` (string, **required**): The natural language query term (e.g., `React performance optimization` or `Rust connection pooling`).
  - `per_page` (integer, optional): The number of articles to return per page (default is `10`, maximum is `50`).
  - `page` (integer, optional): Pagination page index.
  - `threshold` (number, optional): An optional cosine distance threshold filter (between `0.0` and `2.0`). Articles with a cosine distance *greater* than this value will be filtered out.

#### Example Request
```bash
curl -X GET "https://dev.to/api/articles/semantic_search?q=Rust+connection+pooling&per_page=5" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_API_KEY"
```

#### Example Response
```json
[
  {
    "id": 12345,
    "title": "Configuring Database Connection Pools in Rust with r2d2",
    "description": "A comprehensive guide on managing PostgreSQL connection pooling in a modern Rust application...",
    "cover_image": "https://media.dev.to/uploads/...",
    "slug": "configuring-database-connection-pools-in-rust",
    "path": "/devteam/configuring-database-connection-pools-in-rust",
    "url": "https://dev.to/devteam/configuring-database-connection-pools-in-rust",
    "comments_count": 8,
    "public_reactions_count": 42,
    "published_at": "2026-07-10T14:22:00.000Z",
    "distance": 0.185204,
    "similarity": 0.814796
  }
]
```

---

### 2. Semantic Concept Search
Query Forem's Concepts database semantically based on a natural language search query.

* **Permissions:** 
  - **Super Administrators** can search across all concepts globally in the system.
  - **Regular users / curators** will only receive results from concepts they have been explicitly granted access to (their **accessible concepts**).
* **HTTP Method:** `GET`
* **Path:** `/api/concepts/search`
* **Query Parameters:**
  - `q` (string, **required**): The natural language query to match against concept descriptions (e.g., `databases` or `functional programming`).
  - `per_page` (integer, optional): Limit of concepts returned (default is `10`, maximum is `50`).
  - `threshold` (number, optional): Optional cosine distance threshold (between `0.0` and `2.0`) to filter results.

#### Example Request
```bash
curl -X GET "https://dev.to/api/concepts/search?q=databases&per_page=3" \
     -H "Accept: application/vnd.forem.api-v1+json" \
     -H "api-key: YOUR_API_KEY"
```

#### Example Response
```json
[
  {
    "id": 42,
    "name": "SQL Databases",
    "slug": "sql-databases",
    "description": "Relational databases, SQL queries, table schemas, transactions, indexing, and normalization.",
    "parent_id": null,
    "score": 1.0,
    "similarity_threshold": 0.78,
    "created_at": "2026-06-15T10:00:00.000Z",
    "updated_at": "2026-07-01T12:00:00.000Z",
    "distance": 0.220194,
    "similarity": 0.779806
  }
]
```

---

## Understanding Metrics: Distance vs. Similarity

The semantic search endpoints return two mathematical fields that help gauge relevance:

1. **Distance (`distance`)**
   * **What it is:** The cosine distance between the search query's vector embedding and the target item's embedding.
   * **Range:** Between `0.0` and `2.0`.
   * **Interpretation:** Lower values indicate closer semantic relevance. A distance of `0.0` represents a perfect match (identical direction), whereas `1.0` indicates orthogonality (no relation), and `2.0` represents complete opposites.

2. **Similarity (`similarity`)**
   * **What it is:** A normalized similarity score calculated from the cosine distance: `1.0 - distance` (rounded to 6 decimal places).
   * **Range:** Between `-1.0` and `1.0` (practically `0.0` to `1.0` for meaningful matches).
   * **Interpretation:** Higher values represent stronger semantic matches. A similarity score above `0.75` is typically considered a highly relevant result.

:::tip Tuning Search Results
Use the `threshold` query parameter to enforce a maximum acceptable `distance`. For example, setting `threshold=0.3` will ensure you only retrieve highly-relevant articles or concepts with a similarity score of `0.7` or greater.
:::
