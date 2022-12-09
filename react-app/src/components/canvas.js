/**
 * This was an old component but we've kept the functions in here for now..
 */
import React from "react";

const runico = require('../images/runico.png');
const debugico = require('../images/debugico.png');
const importico = require('../images/importico.png');

function Canvas(){
    // other methods can be invoked or written here
    const run = () => {
        // do stuff when run is clicked
    }

    const debug = () => {
        // do stuff when debug is clicked
    }

    const imprt = () => {
        // probably shouldnt be hard coded but need it for presentation
        const url = 'http://localhost:3001/compC';
        // get blocks in the canvas area that are attached together 
        const testin = [
                        {"id": "Play"}, 
                        {"id": "Scroll", "Value":"Testing 123"},
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
        <div class='container'>
            <div  className='canvas'>
            <input type="image" onClick={run} src={runico} id="runico" alt="run"/>
            <input type="image" onClick={debug}src={debugico} id="debugico" alt="debug"/>
            <input type="image" onClick={imprt} src={importico} id="importico" alt="import"/>
    
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        </div>   
        </div>
    )
}

export default Canvas;