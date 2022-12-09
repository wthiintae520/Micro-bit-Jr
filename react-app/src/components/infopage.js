/**
 * Component for the info page component
 */
import './info.css';

function Infopage() {
  return (

    <div className="Infopage">
      <header className="Info-header">        
      <div className="introduction">
        <img src="./info0.png" className="Info-logo" alt="logo" />
        <p>
        We attempt to design a functional program for coordinate 
              positioning patterns using the functionality of microbits. 
        </p>
        </div><br></br>
        <div className="step1">
        <img src="https://cdn.sanity.io/images/ajwvhvgo/production/462ad9350fa259a6c6504125ae2246d0707cadbf-383x313.gif?rect=0,16,383,280&bg=fff&w=520&h=380&q=80&fit=min&auto=format" className="App-logo" alt="logo" />
        <p>
        Step1<br></br>Think about it, what you want to design in your program.
        </p>
        </div><br></br>

        <div className="step2">
        <img src="./info2.png" className="Info-logo" alt="logo" />
        <p>
        Step2<br></br>Use our function blocks to create your own programs.  
        </p>
        </div><br></br>
        <div className="step3">
        <img src="./info3.png" className="Info-logo" alt="logo" />
        <p>
        Step3 <br></br>Connect to Microbit, import the program files into it, and enjoy the game.
        </p>
        </div><br></br>
        <a
          className="Info-link"
          href="https://makecode.microbit.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn makecode
        </a><br></br>
        <div>
        About us:  
        </div>

      </header>


    </div>

  );
}

export default Infopage;
