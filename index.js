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

//   drive.files.list({}, (err, res) => {
//     if (err) throw err;
//     const files = res.data.files;
//     if (files.length) {
//     files.map((file) => {
//       console.log(file);
//     });
//     } else {
//       console.log('No files found');
//     }
//   });

var folderId = '1CLJMZqorTtlOeeBqH0HhLnVE-hyrDEpm';
var fileMetadata = {
  'name': 'image-2.mp4',
  parents: [folderId]
};
var media = {
  mimeType: 'video/mp4',
  body: fs.createReadStream('sample-1.mp4')
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
  }
});


  
  