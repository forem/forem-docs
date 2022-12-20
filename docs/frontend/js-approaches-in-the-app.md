---
sidebar_position: 2
---

# Current Javascript Approaches in the application

## Initializers & the asset pipeline

> app/assets/javascripts/initializers

The asset pipeline is where we have the "legacy" JavaScript. It's legacy in the sense that it's not EcmaScript Modules (ESM). It's a bunch of JS files concatenated together.

- Served with Sprockets / as static assets
- Available globally
- `base.js.erb` concatenates all the files together and gives us base.js in production/development environments
- `initializePage.js` calls its initializers on every page
- Initializes interactivity for server-rendered UI
- e.g. `initializeArticleReactions.js` - fetches reaction counts and adds click listeners. Adds interactivity to buttons in `app/views/articles/_reaction_button.html.erb`.
- Some html.erb views reference function names directly, e.g. `handleCommentSubmit` in `initializeCommentsPage.js.erb.`

When refactoring or adding new functionality that lives in the asset pipeline, strongly consider moving it to packs (see next section).

## Packs & Webpacker

> app/javascript/packs

- Served via webpack, managed by Webpacker (a gem which allows us to use webpack in a Rails app) which allows us to write our code in ESM via "pack" files
- Pack files are Webpacker's name for a [webpack entry point](https://webpack.js.org/concepts/entry-points/). Each pack represents an entry point, and allows us to only load what we need
- Mounted in views as needed via `<%= javascript_packs_with_chunks_tag "packName", defer: true %>` (one or more packs can be referenced in this tag)
- Usually loaded and run async with `defer: true`

For example - followButtons.js - initializes functionality of follow buttons rendered in many places. Each view that requires follow button functionality must include the pack.

## A note on code splitting & caching
Under the hood, we have Webpacker configured for code splitting. This means if two pack files import the same files/code, a common chunk is created so as to avoid downloading the same file more than once.

It should be noted that a new build being deployed doesn't mean that a user has to re-download all the Javascript code over again the next time they visit. Webpacker (webpack) uses content hashing, so unless the contents of the generated file change, the same file will remain in the browser cache.

## Preact
The Forem frontend codebase uses the [Islands Architecture pattern](https://jasonformat.com/islands-architecture): a server-side rendered app that has pockets of interactivity. Think of it as multi mini-applications existing in the frontend.

You can see this in the app with the way we handle Preact components - loading them in to replace or enhance parts of a server-rendered view (some good examples include our `Modal` and `Snackbar` components).

- Served via webpack(er)
- Mostly used for individual components rich with interactivity
- In some cases Preact "takes over" from a server-rendered, plainer, version of the same (e.g. articleForm.jsx and app/views/articles/_v2_form.html.erb) - try clicking 'Create Post' with JS disabled 😉

## A note on dynamic imports
Unlike the backend, it's costly downloading frontend assets (HTML, CSS, JS), which is why we should only ever download what we need to render a page in a usable state. From there we can load enhanced interactivity, like the page feed, or modals. The general pattern is only load something when you need it.

This is why you’ll find [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) in our code.

Here are some sections of code worth checking out:

- [Onboarding](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/Onboarding.jsx#L20-L26)
- [Pausing animated gifs on a post](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/articlePage.jsx#L11-L17)
- [Loading Modals in the member details view](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/admin/editUser.jsx#L84-L89) in the admin section. The Modal code isn't loaded until someone requests the first modal. From there it's dynamically loaded and then required imports continue to be accessible/cached for the next time we need it.

## Stimulus JS (Legacy)

We used this framework ins ome parts of the admin area, however we have made a decision to no longre use it and will be removing it in favour of using vanilla JavaScript or Preact where appropriate.

- Controllers in `app/javascript/admin/controllers`
- Hooks up to `html.erb` views with data attributes e.g. `data-controller="modal_controller, data-action="click->modal#onClick"`
- Layers interactivity onto server-rendered views
e.g. `app/javascript/admin/controllers/reaction_controller.js` used with `app/views/admin/feedback_messages/_abuse_reports.html.erb`

## Inline scripts

- Less frequently used
- Several refactored recently to packs
- Mostly initializing liquid tag behaviours e.g. `app/liquid_tags/runkit_tag.rb`

## Overlaps

### Webpacker code in initializers

> app/javascript/packs/base.jsx

e.g. Preact Modal, MentionAutocompleteTextArea

- Added to the Forem namespace on the window object in `base.jsx`
- Typically in an ESM world, we shouldn't require code to live on the window object, but due to the nature of the application, it's required so that non-ESM code can consume it
- Can then be accessed via e.g. `window.Forem.showModal()`, e.g. see `app/assets/javascripts/initializers/initializeCommentsPage.js.erb` where we replace the vanilla textarea with the mention autocomplete one

### Stimulus JS code

The following Stimulus related code will be removed once we completely remove Stimulus from our application.

### Preact in Stimulus JS
e.g. `app/javascript/admin/controllers/modal_controller.js`

- In some cases we want our reusable Preact components in the admin area, e.g. Modals.
- We can dynamically import and render in the Stimulus controller
- Currently only used for Modal and Snackbar & is a relatively new pattern for us

#### Stimulus JS in packs (creator onboarding)
e.g. `loadCreatorSettings` in base.jsx

- Allows us to use admin controllers in the main user-facing views
- Specifically added for the new creator onboarding flow


## Challenges

Below are some of the challenges that we experience when working within this structure. We're currently working on improving the state of JavaScript and removing some of the challenges.

- Non-initializer code needed by initializers, needing to add functions to the window.Forem namespace
- Some initializer code re-runs on every page with unintended consequences
- Async loading vs progressive enhancement (including testing challenges like Cypress attempting to click a button that doesn't have a handler attached yet)
- Optimistic UI updates and silent failures (e.g. failed follow button click)
- Duplication - e.g. the feed is loaded in multiple ways (server-side and Preact client-side), comment HTML exists in initializer JS code and html.erb code.
- Multiple ways of implementing and layering interactivity on the same design system component (html.erb, Preact)