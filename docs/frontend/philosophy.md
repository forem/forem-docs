---
sidebar_position: 1
---

# Philosophy

## Architecture

Our application is server side-rendered with an["Islands Architecture"](https://jasonformat.com/islands-architecture/).

The general idea of an “Islands” architecture is to render HTML pages on the server, and inject placeholders or slots around highly dynamic regions. These placeholders/slots contain the server-rendered HTML output from their corresponding widget. They denote regions that can then be "hydrated" on the client into small self-contained widgets, reusing their server-rendered initial HTML.

The Islands architecture permits us to add pockets of interactivity to the application. A DOM element becomes the root of that particular interactivity, typically rendering a Preact component.

## Current JavaScript Approaches

The current JavaScript approaches described below are:

- [Initializers & the asset pipeline (Legacy)](javascript-approaches/initializers)
- [Packs & Webpacker](javascript-approaches/packs)
- [Preact](javascript-approaches/preact)
- [Stimulus JS (Legacy)](javascript-approaches/stimulus-js)
- [Inline Scripts](javascript-approaches/inline-scripts)

You can also read more about the [Overlaps & Challenges](javascript-approaches/overlaps-and-challenges).


With these options, we sometimes need to **decide what rendering mechanism to use for the frontend**, we advise the usage of:
- Vanilla JavaScript where we need to do some basic interactivity, e.g. adding an event listener, minimal form validation, etc. The preferred way of incorporating the JavaScript is through pack files.
- Preact for complex interactivity: search bar, autocomplete, multi-autocomplete, post subscription button, accessible colour picker.

## Examples

### Vanilla JavaScript

[Bootstrapping dropdowns on a blog post page](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/articlePage.jsx#L4) with JavaScript to make them interactive and accessible.

### Preact

The [comment subscription component](https://storybook.forem.com/?path=/story/app-components-comment-subscription--subscribed) [source](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/CommentSubscription/CommentSubscription.jsx) is an excellent example of this.

The initial potential component state is loaded, a subscribe button. If the user has not subscribed to comments of a post, the Preact component renders, but the VDOM diff determines there is nothing to do, so the server-side rendered markup remains the same. When a user subscribed to post comments and the page loads, the server-side rendered subscribe button renders, and then the comment subscription component renders the button in the unsubscribe state.

