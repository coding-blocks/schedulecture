/**
 * Created by tech4GT on 8/25/17.
 */

const express = require('express');

const app = express();


app.use('/', express.static(__dirname + "/frontend"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.listen(process.env.PORT || 4000, function () {
  console.log(`Server listening at ` + (process.env.PORT || 4000));
});