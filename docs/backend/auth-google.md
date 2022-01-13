---
sidebar_position: 6
---

# Google OAuth2 Authentication

Forem allows you to authenticate using Google OAuth2. To use this authentication method
in local development, you will need to set up Google client application and retrieve its
keys. Then you'll need to provide these keys to the Rails application.

1. [Click this link to create a new OAuth application in your Google console](https://console.cloud.google.com/projectcreate) -
   you will be redirected to sign in to Google account if you have not already.

2. Go to **OAuth Consent Screen** section. Set the **Publishing Status** to **Testing**

   ![OAuth Consent Section](/img/docs/backend/google-1.png)

   ![Publishing Status](/img/docs/backend/google-2.png)

3. Add your test user email to the **Test Users** section

   ![Add Test Users](/img/docs/backend/google-3.png)

4. Go to the **Credentials** section and at the top of the screen click **Create Credentials** -> **OAuth Client ID**

   ![Adding OAuth Credentials](/img/docs/backend/google-4.png)

5. Select **Web Application** as the **Application Type**, and name it

   ![Naming OAuth Application](/img/docs/backend/google-5.png)

6. Under **Authorized Redirect URIs** add the URI `http://localhost:3000/users/auth/google_oauth2/callback`. Replace the port `3000` 
   if you  run Forem on another port.

   ![Create URI Redirect](/img/docs/backend/google-6.png)

7. On the resulting screen you'll find your app's **Client ID** and **Client Secret**. Make a note of them.

   ![Client ID and Key](/img/docs/backend/google-7.png)

8. Enable the Google Authentication provider in the admin dashboard, entering the **Client ID** and **Client Key** from the previous step.

   ![Forem Admin Dashboard](/img/docs/backend/google-8.png)

9. Done.
