# Forem Developer Docs

Welcome to Forem's developer documentation! The docs are built using [Docusaurus 2](https://docusaurus.io/), a React and Markdown based documentation website generator.

## Technical Overview

Most of the configuration here is not too different from the basic `preset-classic` of Docusaurus. The main folders are:
- `docs`: where the documentation lives
- `src`: any custom CSS, components or pages
- `static/img`: any image files

## Installation

```console
git clone https://github.com/forem/forem-docs.git
yarn install
```

## Local Development

Once installed:

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

All relevant Markdown files are in `docs/`. To update any docs, simply update the Markdown file with your favorite Markdown editor.
You can also add new files to the relevant sections.

For other types of contributions outside of text changes to Markdown files, please see [Docusaurus' docs](https://docusaurus.io/docs) for additional info.

## Search

On production, search is run by [Algolia](https://www.algolia.com), specifically their [DocSearch service](https://docsearch.algolia.com/).
The service scrapes the website every 24 hours or so, so new contributions to the docs may take about that long to update.

## Testing Production Builds

To see if your changes will build (for ex. you made added some screenshots) you can run:

```console
yarn build
```

Alternatively, you can make a pull request and use the corresponding deploy preview that builds.
