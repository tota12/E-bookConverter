// Express to run server and routes
const express = require('express');
const app = express();
// file-upload for uploading files
const upload = require('express-fileupload')
const ebookConverter = require('node-ebook-converter');
const path = require('path');
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(upload());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Initialize the main project folder
app.use(express.static('src'));
// Spin up the server
const port = 5000;
app.listen(port, ()=>
  console.log(`running on localhost: ${port}`));
//requests
app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
  //res.sendFile(__dirname + '/index.html')
})
app.post('/', (req, res) => 
{
  if(req.files)
  {
    var file = req.files.file;
    var fileName = file.name;
    console.log(fileName);
    file.mv('./input/' + fileName, function(error)
    {
      if(error)
      {
        console.log(error);
      }else
      {
        console.log('File Uploaded');
      }
    })
    ebookConverter.convert({
      input: `input/${fileName}`,
      output: `output/${fileName}.epub`,
      delete: true
    }).then(response => console.log(response))
      .then(()=>{
        var output = `${__dirname}\\output\\${fileName}.epub`;
        res.sendFile(output);
      })
      .catch(error => console.error(error));
    
    
  }
})
ebookConverter.setPoolSize(2);