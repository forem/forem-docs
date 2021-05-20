---
sidebar_position: 3
---

# Apple Authentication (beta)

**Sign in with Apple Authentication**

Forem allows you to authenticate using
[Sign in with Apple](https://developer.apple.com/sign-in-with-apple/). In order
to use this authentication method you'll need to be enrolled to the
[Apple Developer Program](https://developer.apple.com/programs/) in order to
retrieve the necessary credentials and an HTTPS supported URL for the callback
configuration (HTTP won't work). Then you'll need to provide the keys to the
Rails application.

## Beta support

This authentication provider is currently marked as beta. This means it will be
available but hidden from public access until more thoroughly tested.

If you want to make this feature publicly available (without the state
parameter) you can enable the `apple_auth` feature flag from the Flipper
dashboard or the Rails console with `Flipper.enable(:apple_auth)`.

## Apple Developer Portal Configuration

[Register/Sign in](https://developer.apple.com/account) to your Apple Developer
Account.

### Service ID Configuration

1. [Create a Service ID](https://developer.apple.com/account/resources/identifiers/list/serviceId)

![Create Service ID](/img/docs/backend/service-id.png)

2. Name the Service and finalize the registration

![Naming Service ID](/img/docs/backend/service-registration.png)

3. Configure Domains and Subdomains & the callback URL. This example uses
   [ngrok](https://ngrok.io) for HTTPS support.

![Callback URLS](/img/docs/backend/callback-url.png)

### Key Configuration

1. [Register a new Key](https://developer.apple.com/account/resources/authkeys/add).
   Enable the "Sign in with Apple" option and configure it so it's associated
   with the corresponding App ID

![Register a new Key](/img/docs/backend/key-registration.png)

2. Download the Key

![Download the Key](/img/docs/backend/key-download.png)

## Configuring the Rails Application

Now with both the Service ID and Key you'll need to enable Apple Authentication
and pass in the credentials in the admin dashboard
`/admin/customization/config`.

![Admin Authentication Configuration Dashboard](/img/docs/backend/admin-auth.png)

Add the corresponding configuration data. Make sure the PEM key you downloaded
has explicit linebreaks (`\n`), don't forget the one at the very end of it.

![Apple config](/img/docs/backend/appleadmin-config.png)

Save the changes and restart your server for these values to take effect.

### Email configuration

Apple uses what they call Private Email Relay Service to hide user's emails. For
this to work first
[create a new email source](https://developer.apple.com/account/resources/services/list).

![Email configuration](/img/docs/backend/email-source.png)

Emails sent need to be authenticated and the configuration depends on the
different providers available:

- [Mailchimp](https://mailchimp.com/help/set-up-custom-domain-authentication-dkim-and-spf/)
- [SendGrid](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)
- [SES](https://docs.aws.amazon.com/es_es/ses/latest/DeveloperGuide/send-email-authentication-dkim.html)
