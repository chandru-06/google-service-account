const express = require('express');
const {google} = require('googleapis');
const fs = require('fs');
const credentials = require('./credentials.json');
const scopes = [
    'https://www.googleapis.com/auth/drive'
  ];
  const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
  );
const drive = google.drive({ version: "v3", auth });
var folderId = '1CLJMZqorTtlOeeBqH0HhLnVE-hyrDEpm';
var bodyParser = require('body-parser')
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const { Readable } = require("stream");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.use(fileUpload());


// landing Page....
app.get('/', (req, res) => {

  res.sendFile(__dirname + '/sample.html');

});


// upload to google drive
app.post('/single',(req,res) => {
 const file = req.files.fileIn;
 console.log(file);
 var fileMetadata = {
  'name': file.name,
  parents: [folderId]
};
const readable = Readable.from(file.data)
var media = {
  mimeType: file.mimetype,
  body: readable
};
drive.files.create({
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    console.log('File Id: ', file.id);
    res.redirect(301,'/success');
  }
});
});

// success Page....
app.get('/success', (req, res) => {

  res.sendFile(__dirname + '/success.html');

});


app.listen(port, () => { console.log(`Server running on http://localhost:${port}/`)});