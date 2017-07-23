# SilverStripe 4 Headless Demo

This project provides a simple Ionic app demonstrating how SilverStripe 4 can be used as a headless
CMS via its GraphQL API.

In this demo, the Member database of your SilverStripe site is presented as a "Staff" section.

## Setting up the server

To use this demo, you will need a SilverStripe 4 instance. Make sure you're running SilverStripe 4
beta1 or later. You need to update the configuration to:

 * Allow cross-origin requests
 * Expose members via GraphQL
 * Allow log-in via JSON Web Tokens

Create `mysite/_config/graphql.yml` and add the following configuration:

```yml
SilverStripe\GraphQL\Controller:
  cors:
    Enabled: true
    Allow-Origin: '*'
    Allow-Headers: 'Authorization, Content-Type'
    Allow-Methods:  'GET, POST, OPTIONS'
    Max-Age: 86400

  schema:
    scaffolding:
      types:
        SilverStripe\Security\Member:
          fields: [ID, Name, FirstName, Surname, Email]
          operations:
            create: true
            read: true
```

Then install the JWT authentication package:

    composer require firesphere/silverstripe-graphql-jwt:^1.0@dev

## Running the client locally

First, update `src/app/app.module.ts` and enter the correct URL for your GraphQL endpoint in this
part of the code:

```js
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql/',
    opts: {
        credentials: 'same-origin',
    },
});
```

 * If you haven't yet installed Ionic, install that with `npm install -g cordova ionic`.
 * On first download, run `npm install` in the root of your project folder.
 * Start Ionic, for example with `ionic serve`. For more information on the different ways to test
   your applicaton, see [the Ionic docs].(http://ionicframework.com/docs/v1/guide/testing.html)

This will give you all you need and boot up your app. For more information, read the `About` page.

