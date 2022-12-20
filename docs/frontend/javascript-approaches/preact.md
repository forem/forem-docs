---
title: Preact
sidebar_position: 3
---

The Forem frontend codebase uses the [Islands Architecture pattern](https://jasonformat.com/islands-architecture): a server-side rendered app that has pockets of interactivity. Think of it as multi mini-applications existing in the frontend.

You can see this in the app with the way we handle Preact components - loading them in to replace or enhance parts of a server-rendered view (some good examples include our `Modal` and `Snackbar` components).

- Served via webpack(er)
- Mostly used for individual components rich with interactivity
- In some cases Preact "takes over" from a server-rendered, plainer, version of the same (e.g. articleForm.jsx and app/views/articles/_v2_form.html.erb) - try clicking 'Create Post' with JS disabled 😉

** A note on dynamic imports **

Unlike the backend, it's costly downloading frontend assets (HTML, CSS, JS), which is why we should only ever download what we need to render a page in a usable state. From there we can load enhanced interactivity, like the page feed, or modals. The general pattern is only load something when you need it.

This is why you’ll find [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) in our code.

Here are some sections of code worth checking out:

- [Onboarding](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/Onboarding.jsx#L20-L26)
- [Pausing animated gifs on a post](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/articlePage.jsx#L11-L17)
- [Loading Modals in the member details view](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/packs/admin/editUser.jsx#L84-L89) in the admin section. The Modal code isn't loaded until someone requests the first modal. From there it's dynamically loaded and then required imports continue to be accessible/cached for the next time we need it.