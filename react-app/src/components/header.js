/**
 *  Component for website header
 */
import React from "react"
import './header.css'

const microbitico = require('../images/microbitico.png')
const infoico = require('../images/infoico.png')

const microbitStyle = {
    width:'80px',
    height:'60px'
}
const infoStyle = {
    width: '60px',
    height: '60px'
}

function Header() {
    return (
        <nav class="navbar navbar-expand-md navbar-light mb-4">
            <a class="navbar-brand" href="indexInitial.html">
                <img alt="Microbit" src={microbitico} style={microbitStyle}></img>
            </a>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                </ul>
                <form class="form-inline mt-2 mt-md-0">
                    <a class="navbar-brand" href="./infopage.js">
                        <img alt="Info" src={infoico}style={infoStyle}>
                        {/* <NavLink to= './infopage.js'>
                            </NavLink>   */}
                        </img>
                    </a>
                </form>
            </div>
        </nav>
    )
}

export default Header;