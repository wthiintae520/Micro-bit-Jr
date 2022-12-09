[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8471690&assignment_repo_type=AssignmentRepo)
# CST8334 Software Development Project
## Client

Andrew McDonald

## Authors

Team Octopus 

* Mike Berube   
* Jie Ke
* Temucingiray Turkes
* Seema Thapagurung
* Yunting Yin

## Description

A webpage for coding with the MicroBit device. Uses pictures as standins for functions that then translate to the device.

## Prerequisites

* Node
* npm 
* Python (server-side)

## Setting up the local environment

REACT APPLICATION SETUP

1)&emsp;Clone the repo to a folder and cd into the react-app folder inside 
2)&emsp;Run this to download required node modules.

    npm install 

3)&emsp;then run:

    npm start


NODE BACKEND SETUP  
I used a windows environment so you are on your own in linux or mac, they do have a docker file available as well as linux instructions here https://github.com/lancaster-university/microbit-v2-samples

1)&emsp;You need Node, npm, and python installed before hand.

2)&emsp;You want a directory structure similar to  this  
    &emsp;  --> Temp_server  
    &emsp;&emsp; // place the git source for https://github.com/lancaster-university/microbit-v2-samples in here  
    &emsp;&emsp; --> microbit-v2-samples  
    &emsp;&emsp; // backend directory from our source goes here.  
    &emsp;&emsp; --> backend code directory goes here

3)&emsp;Follow installation steps for this libraries local building [https://github.com/lancaster-university/microbit-v2-samples].
    This is important since we will be using their toolchain/compiler 
    here as well as the build tools.  
    This isn't stated in their repo but you will likely need another tool like Ninja [ Windows ] for building, as well as Cmake

4)&emsp;Under /Temp_server/backend run this to install the required node modules for our scripts (express, etc):

    npm install

5)&emsp;To start the local server, run this command inside of /Temp_Server/backend (may have to change the hard coded ports in Controller)

    node Controller.js

## Running the application

Starting the front end - navigate to the src directory and run these commands ( first time run npm install under /react-app before npm start)

    cd react-app
    npm start

Starting the local server - cd into the backend folder under /Temp_Server/backend and run:

    node Controller.js

## Future Recommendations

Things that might be interesting to consider moving forward in this projects development
- Hosting an api service remotely (can handle more users) or fully within the react application.
- Block transformations and interactions ie. dragging and dropping/deleting etc
- Advanced functions of the v2 microbit ie. Sound and Motion
- Implementing a working microbit simulator.
- More advanced CSS animations and sounds for kids
- Support for different devices

## References

### Microbit Dev References  

- Microbit js library for interacting with a microbit over USB: https://github.com/ARMmbed/dapjs  
- Microbit build tools and samples for compiling c++ to a usable .hex file: https://github.com/lancaster-university/microbit-v2-samples  
- Microbit community site: https://tech.microbit.org/  
- Microbit Docs for using the C/C++ api: https://lancaster-university.github.io/microbit-docs/

### MakeCode References 

- Microsoft MakeCode source: https://github.com/microsoft/pxt-microbit  
- This is the library that microsoft forked for use in MakeCodes blocks:  https://developers.google.com/blockly/guides/overview  
- The microsoft Makecode fork of blockly:  https://github.com/microsoft/pxt-blockly

https://fontawesome.com/docs