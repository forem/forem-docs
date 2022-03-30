---
sidebar_position: 8
---

# Caching

_This has been adapted from [The Three Caches of Forem // Take on Rules](https://takeonrules.com/2022/03/29/the-three-caches-of-forem/)_


In the Forem code base, we make extensive use of various caching strategies. And as with any cache, we always run the risk of not invalidating the right caches.

The three caching strategies are:

- Edge Caching
- Rails Caching
- Database Caching

At a high level, we leverage caches to improve performance. Let’s delve into each strategy. But before we do, let’s introduce a few concepts.

## Response Documents and Fragments

The <dfn>response document</dfn> is a single file sent from the server in response to a request.

Remember that what you see rendered in your browser is almost always from the combination of many _response documents_ sent from the server: <abbr title="Hypertext Markup Language">HTML</abbr> documents, Javascript files, <abbr title="Cascading Stylesheet">CSS</abbr> files, and <abbr title="XMLHttpRequest">XHR</abbr> that modify the <abbr title="Document Object Model">DOM</abbr>.

To build a single _response document_, the server often assembles multiple fragments to form that singular document. In Ruby on Rails this is done with like layouts, views, and partial views.

## Back to Listing the Caching Strategies

Let’s now work from the broader caching strategies to the more narrow ones.

### Edge Caching

Edge caching is about trying to put as many of the _response documents_ as close to the client as possible to reduce latency on content delivery.

At Forem, we enable the usage of either Fastly or Nginx. When we bust the edge cache, we are evicting specific _response documents_.

The next time someone requests that _response document_ the server will reassemble it (from the various constituent parts).

You can see [our Edge Busting strategy here](https://github.com/forem/forem/blob/3ddda918cb40f8bfb7fa8ad7dae5736717872bc8/app/services/edge_cache/bust.rb).

### Rails Caching

We use the Rails cache to store all kinds of things, mostly fragments that we use to build the response document.

Each entry we put into the Rails cache has a unique key. When we use the cache, we check if the key exists. If so we use what’s in the cache for that key. Otherwise, we run the cached logic and put it in the cache with that key.

What does that key look like? It depends. But in a general sense it often includes a timestamp. Let’s create a quick and arbitrary example.

Let’s say it is very expensive to generate the <abbr title="Hypertext Markup Language">HTML</abbr> for an article’s card. We choose to cache the article’s card’s <abbr title="Hypertext Markup Language">HTML</abbr>. The key for that might like like the following: `article-<article_id>-<article_last_updated_at>`

Then when we check the cache, we use the article’s ID and when it was last updated. In this way, older updates to the article might still be in the cache, but we’re not going to fetch those.

There are more complicated strategies we use. As part of the site’s layout we cache information; the community name, tracking analytics, last deploy date, last commit id, and more.

When an admin makes a site wide change, that prompts to use a new key; so long as we remember to update the attributes in the key. This [pull request](https://github.com/forem/forem/pull/17040) resolved one of the issues (in a not yet available in production) when we didn’t update the attribute keys.

You can learn more about [Caching with Rails](https://guides.rubyonrails.org/caching_with_rails.html) over at the Rails Guides.

### Database Caching

The last is database caching. We cache an article’s tag list, user, and organization information (if applicable). These are cached as fields on the articles table. The purpose of these cached attributes is performance. Where possible, we prefer to minimize joins for queries that we frequently perform (e.g. get me a list of articles being a very common query for a Forem).

On <time datetime="2022-03-28">2022-03-08</time> we reported an issue where [changing an organization’s image should invalidate the associated articles cached organization (Issue #17041)](https://github.com/forem/forem/issues/17041). The solution is whenever we update an organization we should revisit each article associated with that organization.

This [pull request](https://github.com/forem/forem/pull/17052) looked to fix the reported error and provides points in the code where we're caching at the database layer.

## Way-finding in the Era of Caching

To properly troubleshoot a caching issue, a recommendation is to request a screenshot and an arrow pointing to the specific thing that isn’t updating. This will help track down in the code which caching strategy might be in play.