/**
 * Creates cpp files and compiles them from json payloads 
 * 
 * c++ api references for microbit : https://lancaster-university.github.io/microbit-docs/
 * 
 */
 const fs = require('fs');
 const execSync = require("child_process").execSync;
 
 const cppPath = '../microbit-v2-samples/source/main.cpp'
 const hexPath = '../microbit-v2-samples/MICROBIT.hex'
 const buildFolder = 'C:/Users/hunch/Temp_Server/microbit-v2-samples'
 const play = '#include "MicroBit.h" \n' +
              'MicroBit uBit; \n' + 
              'int \n' +
              'main() \n' +
              '{ \n' +
              "    uBit.init(); \n"           
 const playClose = "    release_fiber(); \n" +
                   '}'
 
/**
 * This function invokes the convert2cpp function to 
 * create a c++ file from the json payload then invokes
 * the system cmd and executes a command to compile it.
 * @param {*} data
 *  JSON payload
 */
 exports.compile = (data) => {
 
     if (fs.existsSync(cppPath)) {
         fs.unlinkSync(cppPath)
     }
 
     let converted = convert2cpp(data)
     fs.writeFileSync(cppPath, converted, (error) => {
         if (error) console.log(error);
     })
 
     console.log('Attempting to compile...')
     execSync(`cd ${buildFolder} && py build.py`), (error) => {
         if (error) {console.log(`error: ${error.message}`)
             return
         }
     }
     console.log('Compile completed')
 }
 
 // logic in this will need to be modified in the future. 
 // be aware of your c++ syntax and + signs 
 // if you see 1-2 kb hex files being output its likely a compiler issue with your c code strings
 function convert2cpp(data) {
     let cppOutput = ``
     let jsonObj = JSON.parse(data)
 
     for ( let x in jsonObj ) {
         console.log(jsonObj[x].id)
     }
     // this check should also be on the front end?
     if (jsonObj[0].id != "Play") {
         console.log("No play at beginning of function...")
         return
     } else {
         for ( let x in jsonObj) {
             switch ( jsonObj[x].id ) {
                 case "Play": 
                     cppOutput = play
                     break
                 case "Scroll":
                     // need a check on this? regex? dont want hostile values/ code being passed to compiler...
                     console.log(jsonObj[x].Value)
                     let val = JSON.stringify(jsonObj[x].Value)
                     let scroll = '   while(1) { \n' +
                                 `        uBit.display.scroll(${val}); \n` +
                                 '    }'
                     cppOutput = cppOutput + scroll
                     break
                 case "End":
                     cppOutput = cppOutput + playClose
                     break
             }
         }
     }
     return cppOutput
 }