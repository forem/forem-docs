---
sidebar_position: 6
---

# Google OAuth2 Authentication

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

Forem allows you to authenticate using Google OAuth2. To use this authentication method
in local development, you will need to set up Google client application and retrieve its
keys. Then you'll need to provide these keys to the Rails application.

## Google Admin Console.

1. [Click this link to create a new OAuth application in your Google console](https://console.cloud.google.com/projectcreate) -
   you will be redirected to sign in to Google account if you have not already.

2. Go to **OAuth Consent Screen** section. Set the **Publishing Status** to **Testing**.

   ![OAuth Consent Section](/img/docs/backend/google-1.png)

   ![Publishing Status](/img/docs/backend/google-2.png)

3. Add your test user email to the **Test Users** section.

   ![Add Test Users](/img/docs/backend/google-3.png)

4. Go to the **Credentials** section and at the top of the screen click **Create Credentials** -> **OAuth Client ID**.

   ![Adding OAuth Credentials](/img/docs/backend/google-4.png)

5. Select **Web Application** as the **Application Type**, and name it.

   ![Naming OAuth Application](/img/docs/backend/google-5.png)

6. Under **Authorized Redirect URIs** add the URI `http://localhost:3000/users/auth/google_oauth2/callback`. Replace the port `3000`
   if you  run Forem on another port.

   ![Create URI Redirect](/img/docs/backend/google-6.png)

7. On the resulting screen you'll find your app's **Client ID** and **Client Secret**. Make a note of them.

   ![Client ID and Key](/img/docs/backend/google-7.png)

8. Click  **OAuth Consent Screen** in the sidebar, then click **Edit App** next to your app's name.

   ![Consent Screen](/img/docs/backend/google-9.png)

9. Fill out the information on the resulting **Edit App Registration** screen, then click **Next Step**.

   ![Editing App Registration](/img/docs/backend/google-10.png)

10. On the next screen, **Scopes**, click **Add or Remove Scopes**.

   ![Add Scopes](/img/docs/backend/google-11.png)

11. Click the checkboxes next to the first two unlabeled scopes in the **Updated Selected Scopes** section.

   ![Update Selected Scopes](/img/docs/backend/google-12.png)

12. Complete the rest of the app registration screens.

## Your Forem

13. Enable the Google Authentication provider in the admin dashboard, entering the **Client ID** and **Client Key** from step 7.

   ![Forem Admin Dashboard](/img/docs/backend/google-8.png)

14. Done.
