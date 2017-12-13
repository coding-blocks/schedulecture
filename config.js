var clientId, clientSecret, callBackURL;
if (process.env.HEROKU_APP_NAME) {
  clientId = "305318444";
  clientSecret = "0LH6aQvR6avoCOkJtUFOIMxQqbN3LJP2FyLenoQqp5VpV2MuFZ7t6NFK55tFbUQC";
  callBackURL = "http://schedulecture.herokuapp.com/users/login/cb/callback";
}
else {
  clientId = "8473906170";
  clientSecret = "CwgBS7nr90EFyLF7u3TGPnwRHhhNt4MU57BbgJESEldSPiN2azHHaqvwHPpTVrfB";
  callBackURL = 'http://localhost:4000/users/login/cb/callback';
}

module.exports = {clientId, clientSecret, callBackURL};