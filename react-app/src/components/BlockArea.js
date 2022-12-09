import React, { Component } from "react";
import "./BlockArea.css"
import Infinite from "../images/infinite.svg"
import ShowString from "../images/showstring.svg"
import HelloWorld from "../images/HelloWorld.png"

import Debugico from "../images/debugico.png"
import Runico from "../images/runico.png"
import Importico from "../images/importico.png"

import  BlockMenu  from "./BlockMenu";

export default class BlockArea extends Component {

      render() {

        
      const imprt = () => {
        // probably shouldnt be hard coded but need it for presentation
        const url = 'http://localhost:3001/compC';
        // get blocks in the canvas area that are attached together 
        const testin = [
                        {"id": "Play"}, 
                        {"id": "Scroll", "Value":"Hello World!"},
                        {"id": "End"}
                        ]
        // make a request to backend for compile and file (will do this locally right now)
        // with help from https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
        getCompile(url, testin)
              .then((blob) => {
                // get blob back and reconstruct it for download.
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'MICROBIT.hex';
                document.body.appendChild(link)
                link.click()
                link.parentNode.removeChild(link)
              })
              .catch((err) => {
                console.log(err)
              })
      }
  
      // sends API request to backend with json of requirements
      async function getCompile(url, json) {
          console.log(json)
          const response = await fetch(url,{
              method: 'POST' , 
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json' 
                  },
                  body: JSON.stringify(json)
              })
          return response.blob()
      }
      
        return (

            <div className="container">
            <div class="row justify-content-center align-self-center">
              <div class="col-12 border border-dark rounded" id="BlockArea">
                <div className="d-flex h-100 ">
                  < BlockMenu/>
                  <img src={Infinite} className = "mb-1" id="Play" style={{width : "170px", height : "75px"}}/>
                  <img src={ShowString} className = "mb-1" id="ShowString" style={{width : "170px", height : "75px"}}/>
                  <img src={HelloWorld} className = "mb-1" id="HelloWorld" style={{width : "58px", height : "20px"}}/>
                  <input type="image" src={Runico} id="Runico" style={{width : "70px", height : "70px"}}/>
                  <input type="image" src={Debugico} id="Debugico" style={{width : "70px", height : "70px"}}/>
                  <input type="image" onClick={imprt} src={Importico} id="Importico" style={{width : "200px", height : "70px"}}/>
                </div>
              </div>
            </div>
          </div>
      
        );
        }
}