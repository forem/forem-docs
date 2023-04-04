---
sidebar_position: 5
---

# Facebook Authentication

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

Forem allows you to authenticate using Facebook. In order to use this
authentication method in local development, you will need to setup a Facebook
App and retrieve its keys. Then you'll need to provide these keys to the Rails
application.

## Sign up

1. [Sign in](https://facebook.com) to your Facebook account.

2. In order to get the API keys, you will have to
   [convert your account to a developer account](https://developers.facebook.com/).

## Get API keys

1. [Sign up](#facebook-sign-up) or [sign in](https://developers.facebook.com) to
   your Facebook developer account.

2. From **My Apps** dashboard, click on **Add a New App**.

   ![Add new app](/img/docs/backend/add-newapp.png)

3. Select **For Everything Else**.

   ![Select For Everything Else](/img/docs/backend/everything-else.png)

4. Fill in the app display name and contact email, then click on **Create App
   ID**.

   ![Create App Id](/img/docs/backend/create-appid.png)

5. On the **Add a Product** screen, click **Set Up** under the **Facebook
   Login** section.

   ![Click Set Up on Facebook Login](/img/docs/backend/setup-login.png)

6. Ignore the quickstart options, and click **Settings -> Basic** in the sidebar.

   ![Click settings/basic](/img/docs/backend/settings-basic.png)

7. From the basic settings screen dashboard copy the **App ID** and **App
   Secret** values to your `.env` file accordingly (name of Facebook key -> name
   of our `Settings::General` variable).

   ```text
   APP ID -> FACEBOOK_APP_ID
   API secret -> FACEBOOK_APP_SECRET
   ```

   ![Add app id and app  secret](/img/docs/backend/app-secret.png)

## Configure the Facebook App

1. From the basic settings screen dashboard set your application's domain name
   in **App Domains** field, and be sure to click **Save Changes**.

   ![Configure the facebook app](/img/docs/backend/config-facebook.png)

2. Naviate to **Facebook Login --> Settings**, and enter the following callback
   URL in the field **Valid OAuth Redirect URIs**:

   `https://<your domain>>/users/auth/facebook/callback`

   ![Enter valid OAuth redirect URI](/img/docs/backend/facebook-login.png)
