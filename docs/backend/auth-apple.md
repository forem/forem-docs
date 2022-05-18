---
title: Apple Authentication
sidebar_position: 7
---

# Sign in with Apple Authentication

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

Forem allows you to authenticate using
[Sign in with Apple](https://developer.apple.com/sign-in-with-apple/). In order
to use this authentication method you'll need to be enrolled to the
[Apple Developer Program](https://developer.apple.com/programs/) in order to
retrieve the necessary credentials and an HTTPS supported URL for the callback
configuration (HTTP won't work). Then you'll need to provide the keys to the
Rails application.

# Apple Developer Portal Configuration

[Register/Sign in](https://developer.apple.com/account) to your Apple Developer
Account.

## Service ID Configuration

1. [Create a Service ID](https://developer.apple.com/account/resources/identifiers/list/serviceId)

![Create Service ID](https://user-images.githubusercontent.com/6045239/92610177-a5cc9e00-f274-11ea-9f63-20d8356d0bee.png)

2. Name the Service and finalize the registration

![Naming Service ID](https://user-images.githubusercontent.com/6045239/92610168-a36a4400-f274-11ea-8f79-7516c0c6c9c3.png)

3. Configure Domains and Subdomains & the callback URL. This example uses
   [ngrok](https://ngrok.io) for HTTPS support.

![Callback URLS](https://user-images.githubusercontent.com/6045239/92610184-a8c78e80-f274-11ea-9439-a98c6b627567.png)

## Key Configuration

1. [Register a new Key](https://developer.apple.com/account/resources/authkeys/add).
   Enable the "Sign in with Apple" option and configure it so it's associated
   with the corresponding App ID

![Register a new Key](https://user-images.githubusercontent.com/6045239/92611125-b3ceee80-f275-11ea-9c00-e1b5ca2f9af0.png)

2. Download the Key

![Download the Key](https://user-images.githubusercontent.com/6045239/92611466-0f00e100-f276-11ea-912d-f8a74b6dfb04.png)

# Configuring the Rails Application

Now with both the Service ID and Key you'll need to enable Apple Authentication
and pass in the credentials in the admin dashboard
`/admin/customization/config`.

![Admin Authentication Configuration Dashboard](https://user-images.githubusercontent.com/6045239/133795693-56573842-387c-46e6-8326-d64808d571cd.png)

Fill in each of the configuration fields.

Make sure the PEM key is copied exactly the way it appears in the file you downloaded from the Apple Developer portal, including newlines. If this isn't done correctly users will encounter an `Invalid curve name` error. **Make sure a newline is added at the very end of the Apple PEM field**.

![Apple config](https://user-images.githubusercontent.com/6045239/133795521-246ede88-15f0-45d1-a060-5e7d29e77568.png)

Save the changes and you're ready.

## Email configuration

Apple uses what they call Private Email Relay Service to hide user's emails. For
this to work first
[create a new email source](https://developer.apple.com/account/resources/services/list).

![Email configuration](https://user-images.githubusercontent.com/6045239/92612469-22607c00-f277-11ea-918d-697cf4a18b15.png)

Emails sent need to be authenticated and the configuration depends on the
different providers available:

- [Mailchimp](https://mailchimp.com/help/set-up-custom-domain-authentication-dkim-and-spf/)
- [SendGrid](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)
- [SES](https://docs.aws.amazon.com/es_es/ses/latest/DeveloperGuide/send-email-authentication-dkim.html)
