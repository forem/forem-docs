---
sidebar_position: 1
---

# Initializers & the asset pipeline

> app/assets/javascripts/initializers

:::important

When refactoring or adding new functionality that lives in the asset pipeline, strongly consider moving it to Packs and Webpacker.

:::

The asset pipeline is where we have the "legacy" JavaScript. It's legacy in the sense that it's not EcmaScript Modules (ESM). It's a bunch of JS files concatenated together being served using [Sprockets](https://github.com/rails/sprockets-rails) which packages static assets. They are available globally.

This source code is not transpiled, only packaged and minified, and will be limited to whatever flavor of JavaScript can run on the user's web browser.

`app/assets/javascripts/application.js` contains the manifest JavaScript file which is included globally in the primary template, `app/views/layouts/application.html.erb`.

`application.js` automatically includes all JS files via the statement:

```
//= require_tree .
```

One JS file in particular, `app/assets/javascripts/initializePage.js`, bootstraps the majority of the functionality and calls its initializers on every page. You will notice, within this file, that major sections of the websites are bootstrapped, for example:

```
initializeBaseTracking();
initializeCommentsPage();
initEditorResize();
initLeaveEditorWarning();
initializeArticleReactions();
initNotifications();
initializeSplitTestTracking();
```

All the "initializers" are in `/app/assets/javascripts/initializers`.


Another example of an initializer is `initializeArticleReactions.js` which fetches reaction counts and adds click listeners. It adds interactivity to buttons in `app/views/articles/_reaction_button.html.erb`.

It's useful to note that some html.erb views reference function names directly, e.g. `handleCommentSubmit` in `initializeCommentsPage.js.erb.`


`base.js.erb` concatenates all the files together and gives us `base.js` in production/development environments.


