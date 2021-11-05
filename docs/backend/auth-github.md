---
sidebar_position: 6
---

# GitHub Authentication

Forem allows you to authenticate using GitHub. To use this authentication method
in local development, you will need to set up a GitHub App and retrieve its
keys. Then you'll need to provide these keys to the Rails application.

1. [Click this link to create a new OAuth application in your Github account](https://github.com/settings/applications/new) -
   you will be redirected to sign in to Github account if you have not already.

2. Fill in the form with an application name, description, and the URL
   `http://localhost:3000/users/auth/github/callback`. Replace the port `3000` if you run Forem on another
   port.

   ![Fill in form](/img/docs/backend/github-oauth.png)

3. You will be redirected to the app's **Developer settings**. Here you will
   find the keys. Add them to your `.env` file accordingly (name of GitHub key
   -> name of our `ENV` variable):

   ```text
   Client ID -> GITHUB_KEY
   Client Secret -> GITHUB_SECRET
   ```

   ![Add api keys to .env file](/img/docs/backend/github-keys.png)

4. Done.
