import React, { Component } from "react";
import "./BlockMenu.css"

import IcoBasic from "../images/icobasic.png"
import IcoMath from "../images/icomath.png"

import Play from "../images/play.svg"
import ShowNumber from "../images/shownumber.svg"
import ShowString from "../images/showstring.svg"
import Waitfor from "../images/waitfor.svg"
import Infinite from "../images/infinite.svg"
import Repeat from "../images/repeat.svg"
import ShowSymbol from "../images/showsymbol.svg"

import Addition from "../images/addition.svg"
import Subtraction from "../images/subtraction.svg"
import Division from "../images/division.svg"
import Multiplication from "../images/multiplication.svg"

export default class BlockMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          basic: false,
          math: false,
        };
        this.toggleBasic = this.toggleBasic.bind(this);
        this.toggleMath = this.toggleMath.bind(this);
      }

      toggleBasic(){
        this.setState({ basic: !this.state.basic , math: false})
      }

      toggleMath(){
        this.setState({ math: !this.state.math , basic: false})
      }

      render() {

        const Basicshow = (this.state.basic) ? "" : "d-none" ;
        const Mathshow = (this.state.math) ? "" : "d-none" ;
        const Barshow = (this.state.bar) ? "" : "d-none";
        return (
      
          <div className="d-flex h-100 ">
            <div className="d-inline-flex flex-column flex-shrink-00 bg-light border-end border-dark h-100" style={{width : "4.5rem" , marginLeft : "-10px" , marginRight : "1px"}}>
              <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li>
                  <a className="nav-link py-5 border-bottom border-dark rounded-0 text-center" style={{marginLeft : "-5px"}} onClick={ () => {this.toggleBasic();}}>
                    <img className="bi" src={IcoBasic} style={{width : "45px", height : "45px"}}/>
                  </a>
                </li>
                <li>
                  <a className="nav-link py-5 border-bottom border-dark rounded-0" style={{marginLeft : "-5px"}} onClick={ () => {this.toggleMath();}}>
                    <img className="bi" src={IcoMath} style={{width : "45px", height : "45px"}}/>
                  </a>
                </li>
              </ul>
            </div>
            <div className={"d-inline-flex flex-column align-items-stretch float-right flex-shrink-0 border h-100 bg-light "} style={{overflowY:"scroll"}}>
              <div className={"list-group list-group-flush border-bottom " + Basicshow}>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Play} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Infinite} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Repeat} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={ShowString} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Waitfor} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={ShowSymbol} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
              </div>
              <div className={"list-group list-group-flush border-bottom "+ Mathshow} style={{width : "202px"}}>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={ShowNumber} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Addition} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Subtraction} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Division} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
                <a href="#" className="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <img src={Multiplication} className = "mb-1" style={{width : "170px", height : "75px"}}/>
                </a>
              </div>
            </div>
          </div>
      
        );
        }
}