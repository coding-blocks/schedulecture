# passport-oneauth



[Passport](http://passportjs.org/) strategy for authenticating with [OneAuth](https://codingblocks.com/)
using the OAuth 2.0 API.



This module lets you authenticate using coding-blocks's Oneauth server in your Node.js applications.
By plugging into Passport, Oneauth authentication can be integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install passport-oneauth
```

## Usage

#### Create an Application

Before using `passport-oneauth`, you must register an application with Coding Blocks.
If you have not already done so, a new application can be created at
[developer applications](https://account.codingblocks.com/clients/add .Your application will be issued a client ID and client
secret, which need to be provided to the strategy.  You will also need to
configure a callback URL which matches the route in your application.

#### Configure Strategy

The Oneauth authentication strategy authenticates users using a coding-blocks account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
GitHub profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```js
var OneauthStrategy = require('passport-oneauth').Strategy;

passport.use(new OneauthStrategy({
    clientID: ONEAUTH_CLIENT_ID,
    clientSecret: ONEAUTH_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/oneauth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ oneauthId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'oneauth'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/oneauth',
  passport.authenticate('oneauth'));

app.get('/auth/oneauth/callback',
  passport.authenticate('oneauth', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-facebook-example)
as a starting point for their own web applications.  The example shows how to
authenticate users using Facebook.  However, because both Facebook and Oneauth
use OAuth 2.0, the code is similar.  Simply replace references to Facebook with
corresponding references to Oneauth.





