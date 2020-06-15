const express = require('express')
const app = express();
var multer  = require('multer');
var upload = multer();
var cors = require('cors');

app.use (cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(express.json());
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/api', require('./consumer/message_consumer'));

app.use('/api', require('./fe_api/scan'));
app.use('/api', require('./fe_api/searchUserTrans'));

app.listen(30000, () => {
  console.log('Example app listening on port 30000!')
});

module.exports = app;