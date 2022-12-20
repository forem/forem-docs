---
title: Overlap and Challenges
sidebar_position: 2
---

# Overlaps & Challenges

## Overlaps

There are some overlaps of the different JavaScript appraoches that we've outlined below:

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