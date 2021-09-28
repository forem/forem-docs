---
sidebar_position: 5
---

# GitPod

If you prefer working on a cloud IDE, you can spin up your own instance of Forem
in the cloud, using [GitPod](https://gitpod.io).

1. Fork the Forem respository. Navigate to https://github.com/forem/forem and click on the Fork button.

![Repository Fork button](/img/docs/gitpod/fork-button.png)

2. Copy the URL of your forked repository, e.g. https://github.com/forked-user/forem
3. In the browser address bar enter, e.g. https://gitpod.io/#https://github.com/forked-user/forem, where the URL after `https://gitpod.io/#` is the forked repository address. Note: If it's your first time using Gitpod, you will be redirected to their sign in/sign up flow.
4. Gitpod will load your forked version of Forem. If it's the first time doing this, it will take several minutes. All the pieces you need for your cloud environment are installing, including Ruby gems and npm packages.

![Gitpod prebuild running](/img/docs/gitpod/gitpod-prebuild.png)

![Gitpod building containers](/img/docs/gitpod/gitpod-pulling-container-image.png)

5. The IDE opens

![Gitpod IDE](/img/docs/gitpod/gitpod-ide.png)

6. Gitpod prompts to install the recommended extensions. It's not required, but it will provide a better editing experience.

![Gitpod install recommended extensions](/img/docs/gitpod/gitpod-install-vscode-extensions.png)

7. It will still take a few minutes to prepare the workspace.
8. Two terminal sessions will be running. The one named `Open Site: gp` with the prompt `Awaiting port 3000...`.

![Gitpod Open Site terminal session](/img/docs/gitpod/gitpod-open-site-terminal-session.png)

This will remain until the web server is started which is running in the other terminal session named `Forem Server: bash`.

![Gitpod Forem Server terminal session](/img/docs/gitpod/gitpod-forem-server-terminal-session.png)


9. The local Forem development instance loads in the Gitpod browser preview window.

![Gitpod browser preview with the Forem development instance loaded](/img/docs/gitpod/gitpod-preview-browser.png)

10. You can now code, review, or try out the project.

Additional information:

- The Forem local development instance ships with one user, the admin account. The email for the user is `admin@forem.local` and the password is `password`.
- More about Gitpod in this article on dev.to about [Gitpod and Forem (previously DEV)](https://dev.to/ben/spin-up-a-local-instance-of-dev-in-the-cloud-with-gitpod-it-s-incredibly-simple-pij).
- Although other methods of authentication are available, only email will work. To use other forms of authentication, they need to be configured. Visit the [Authentication](/backend/authentication) section to configure social logins.
- Instead of manually building a Gitpod URL, consider installing the [Gitpod browser extension](https://www.gitpod.io/docs/browser-extension/).