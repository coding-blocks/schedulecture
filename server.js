/**
 * Created by tech4GT on 8/25/17.
 */


const express = require('express');

const app = express();
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({extended : true}))
const api_v1 = require('./backend/routes/api_v1')


app.use('/', express.static(__dirname + "/frontend"));
// app.use('/api/v1',api_v1)
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.listen(process.env.PORT || 4000, function () {
  console.log(`Server listening at ` + (process.env.PORT || 4000));
});
