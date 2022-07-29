---
sidebar_position: 3
---

# Contributing to the API Specification Docs

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

The v0 and v1 APIs are described with the [OpenAPI 3 specification](https://spec.openapis.org/oas/v3.0.3).

Swagger.io has
[great docs](https://swagger.io/docs/specification/basic-structure/) that are
helpful to understand the specification better.

## Where you can find the spec file

We auto-generate the v0 documentation from `api_v0.yml`, and v1 documentation from the `api_v1.json`, both 
located within the `/docs` directory. We use [ReDoc](https://github.com/Redocly/redoc) to turn the OpenAPI
3 format into a readable and searchable HTML documentation.

## Updating API docs

There should be very infrequent reasons to update the v0 documentation. If must make changes to the v0 API docs, 
make sure to bump the version at the top of `api_v0.yml`, in `info.version`.

v1 API documentation is generated from the file `api_v1.json` which is generated via the [Forem source code](https://github.com/forem/forem) via the [rswag gem](https://github.com/rswag/rswag). To add to the documentation: create or add to an existing
documentation test under `spec/requests/api/v1/docs`. Run the documentation suite via the command

```shell
SWAGGER_DRY_RUN=0 RAILS_ENV=test rails rswag PATTERN="spec/requests/api/v1/docs/*_spec.rb"
```

 An OpenAPI 3 spec file will be generated at `swagger/v1/api_v1.json`. Copy this file to the root of the forem-docs project, then refer to the 
[forem-docs readme](https://github.com/forem/forem-docs/blob/main/README.md) to rebuild the documentation site.

## Running and editing the docs locally

If you want to browse the documentation locally you can use:

```shell
yarn api-docs:serve
```

This will let you browse the auto-generated version of the doc locally, and it
will reload the documentation after every change of the specification file.

## Linting and validation

We use [spectral](https://github.com/stoplightio/spectral) and
[ibm-openapi-validator](https://github.com/IBM/openapi-validator) to validate
the spec file. The validation is performed as a `pre-commit` hook.

You can also manually validate the document, running:

```shell
yarn api-docs:lint
```

If you have Visual Studio Code, we suggest you install the following extensions
that enable validation and navigation within the spec file:

- [OpenAPI (Swagger) editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)
- [openapi-designer live preview](https://marketplace.visualstudio.com/items?itemName=philosowaffle.openapi-designer)
