---
sidebar_position: 13
---

# Pusher

**Pusher for Realtime Notifications**

Pusher is a third party service being used to power the
[chat system](https://dev.to/connect) and Push Notifications on
[iOS](https://apps.apple.com/us/app/dev-community/id1439094790) &
[Android](https://play.google.com/store/apps/details?id=to.dev.dev_android)
native apps.

## Chat System

In order to use the chat functionality within your development environment, you
will need to sign up for a free-tier Pusher account and retrieve its keys. Then
you'll need to provide those keys to the Rails application.

1. [Sign up](https://dashboard.pusher.com/accounts/sign_up) or
   [sign in](https://dashboard.pusher.com/) to your Pusher account.

2. Once signed in, fill in the prompt to create a new Pusher Channels app.

   ![Create a new Pusher Channel app](/img/docs/backend/pusher-create.png)

3. In your new Pusher Channels app, click the "App Keys" tab.

   ![click the "App Keys" tab](/img/docs/backend/pusher-apps-key.png)

4. Change your keys accordingly (name of Pusher key -> name of our application
   key):

   ```text
   app_id -> PUSHER_APP_ID
   key -> PUSHER_KEY
   secret -> PUSHER_SECRET
   cluster -> PUSHER_CLUSTER
   ```

   ![Change you app keys](/img/docs/backend/pusher-keys.png)

5. Done.
