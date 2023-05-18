---
title: Pack Files & Webpacker
sidebar_position: 2
---

:::important

Any new functionality that requires an initializer, should now be moved to Packs and Webpacker.

:::

# Pack Files & Webpacker

> app/javascript/packs

The Webpacker (a gem which allows us to use webpack in a Rails app) serves and manages the JavaScript code and allows us to write our code in ESM via "pack" files. Pack files are Webpacker's name for a [webpack entry point](https://webpack.js.org/concepts/entry-points/). Each pack represents an entry point, and allows us to only load what we need.

They are mounted in views as needed via `<%= javascript_packs_with_chunks_tag "packName", defer: true %>` (one or more packs can be referenced in this tag), and are usually loaded and run async with `defer: true`

The include statement corresponds to the pack `app/javascript/packs/packName.js`

If you have more than one webpacker pack on the page, you need to include it in
the same `javascript_packs_with_chunks_tag` call. The reason being is it avoids
loading split chunks multiple times.

```erb
<%= javascript_packs_with_chunks_tag "webShare", "someOtherPack", defer: true %>
```

## Example

[followButtons.js](https://github.com/forem/forem/blob/d14db7534934319a343f786c21291f4d916507c1/app/views/articles/show.html.erb#L241-L242) initializes the functionality of the follow buttons that are rendered in many places. Each view that requires follow button functionality must include the pack.


## Webpack aliases

The project uses
[webpack aliases](https://webpack.js.org/configuration/resolve/#resolvealias).
The aliases used in the project can be found under `alias` in
https://github.com/forem/forem/blob/main/config/webpack/environment.js

I'm sure you've had to reference a component or utility file in JavaScript, and it looks something like this.

```
import { somethingExported } from '../../../../awesome-something';
...
```

If you move files around, that import folder path will change. Maybe it's this now.

```
import { somethingExported } from '../awesome-something';
...
```

webpack provides an aliases concept that allows you to alias a folder with a name instead. The above could now become.
// @utilities is the alias to the actual folder
import { somethingExported } from '@utilities/awesome-something';

...
Aliases allow webpack to locate the correct folder for files when bundling things up and make it easier for developers to move code around. On its own, it will work for webpack, but your editor or other parts of your frontend setup might not be aware of it. As we saw above, we use them for Preact to alias the `'react'` and `'react-dom'` packages to use React 3rd party components.

We use eslint in our project, so to avoid module not found errors, we [configure eslint to be mindful of the aliases](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/.eslintrc.js#L23-L37).

We use Storybook to build our components in isolation and showcase our design system. Storybook uses webpack under the hood, so it needs to [be aware of the same aliases](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/app/javascript/.storybook/main.js#L76-L79) we have configured in our application's webpack configuration.

The last puzzle piece is making your editor aware of the aliases. Not everyone uses VS Code, but if you do, VS Code has a[ jsconfig.json](https://github.com/forem/forem/blob/0024fe40d6ade998a216216b00f157fa7f49e1c0/jsconfig.json#L5-L9) that can make it aware of project aliases.

More reading:

- [webpack aliases](https://webpack.js.org/configuration/resolve/#resolvealias)
- [jsonfig.json](https://code.visualstudio.com/docs/languages/jsconfig) in VS Code
- [Storybook and Webpack](https://storybook.js.org/docs/react/configure/webpack)
- [Enhance Jest configuration with Module Aliases](https://alexjover.com/blog/enhance-jest-configuration-with-module-aliases/)
- [import-js/eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/tree/main/resolvers/webpack)


## Initializers in Webpacker

In JavaScript, an initializer refers to a block of code that is executed when an object is created or instantiated. It is a special method or function that initializes the state or sets up the initial values of an object. In this codebase, intializers represent a block(s) of functionality and state that ensures that an object/functionality starts with the desired properties, state and/or behaviors.

Initializers, that formerly lived within the asset pipeline, now reside in Webpack. 

```
app/javascript/packs/initializers
```

When creating an initializer, you can add it to  `baseInitializers.js` file which will initialize the code upon load. This is  similar to the way `initializePage.js` behaves in the asset pipeline.

Here are [some examples of initializers that currently exist](https://github.com/forem/forem/blob/main/app/javascript/packs/baseInitializers.js#L11-L15). 
```
initializeCommentDate();
initializeCommentPreview();
initializeNotifications();
initializeTimeFixer();
initializeDateHelpers();

```

Moving forward all initializer creations should be implemented in this format.

## Code splitting & caching

Under the hood, we have Webpacker configured for code splitting. This means if two pack files import the same files/code, a common chunk is created so as to avoid downloading the same file more than once.

It should be noted that a new build being deployed doesn't mean that a user has to re-download all the Javascript code over again the next time they visit. Webpacker (webpack) uses content hashing, so unless the contents of the generated file change, the same file will remain in the browser cache.

## Additional Resources

For more information in regards to `javascript_packs_with_chunks_tag`, see
https://github.com/rails/webpacker/blob/master/lib/webpacker/helper.rb

Aside from the Webpacker repository, see also Ross Kaffenberger's
[visual guide to Webpacker](https://rossta.net/blog/visual-guide-to-webpacker.html).

If you're interested in bundles sizes and what's contained within them for a
production build, run `bin/bundleAnalyzer` from the command line.