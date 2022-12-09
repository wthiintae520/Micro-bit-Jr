/**
 * 
 * API for interfacing with the compiler from the front end
 * 
 */
 const express = require('express');
 const app = express();
 const cors = require('cors')
 const { compile } =  require('./cppGenerator.js')
 const hexPath = '../microbit-v2-samples/'
 
 app.use(cors())
 app.use(express.json())
 
 const port = process.env.PORT || 3001;
 app.listen(port, () => console.log(`Listening on port ${port}...`));
 

 /**
  * This listener handles POST calls to the API and passes back the required 
  * hex file.
  */
 app.post('/compC', (req,res) => {
     let options = {
         root: hexPath
     }
     let incomingPayLoad = JSON.stringify(req.body)
     let filename = 'MICROBIT.hex'
     compile(incomingPayLoad)
     res.sendFile( filename, options, (err) => {
         if(err) {
             console.log(err)
         } else {
             console.log('Sent: ' + filename)
         }
     });
 }).on('error', (err) => {
     console.log("Request error",err)
 })