/**
 * Contents of the info page. 
 */
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaSlackHash } from 'react-icons/fa';
import '../styles/Info.css';

function Info() {
    return (
        <div className="info">
            <Container className="py-2">
                <section className="py-4">
                    <Row className="d-flex flex-wrap justify-content-center align-items-center">
                        <Col className="p-2 py-4 text-center">
                            <img
                                style={{ maxWidth: '300px', minWidth: '250px' }}
                                src="assets/microbit-logo.png"
                                alt="Microbit By Octopus"
                            />
                        </Col>
                        <Col className="px-2">
                            <div className="display-5">Learn & Play</div>
                            <p className="lead py-1">
                                We attempt to design a functional program for coordinate positioning
                                patterns using the functionality of microbits.
                                <br></br>
                                <Button
                                style={{color: 'sky blue'}}
                                className="Info-link" 
                                href="https://makecode.microbit.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                > 
                                Start Tutorial                                
                                </Button>
                            </p>
                        </Col>
                    </Row>
                </section>
                <section id="step1" className="py-4 steps">
                    <Row className="d-flex flex-wrap justify-content-between align-items-center">
                        <Col className="px-2">
                            <a href="#step1" className="display-5">
                                <span className="step-icon">
                                    <FaSlackHash />
                                </span>
                                <span>Step 1</span>
                            </a>
                            <p className="lead py-1">
                                Think about it, what you want to design in your program.
                            </p>
                        </Col>
                        <Col className="px-2 text-right">
                            <img
                                style={{ borderRadius: '7%' }}
                                src="assets/microbit-playing.gif"
                                alt="Microbit By Octopus"
                            />
                        </Col>
                    </Row>
                </section>
                <section id="step2" className="py-4 steps">
                    <Row className="d-flex flex-wrap justify-content-between align-items-center reverse">
                        <Col className="px-2 text-left">
                            <img src="assets/step-2.jpg" alt="Microbit By Octopus" />
                        </Col>
                        <Col className="px-2">
                            <a href="#step2" className="display-5">
                                <span className="step-icon">
                                    <FaSlackHash />
                                </span>
                                <span>Step 2</span>
                            </a>
                            <p className="lead py-1">
                                Use our function blocks to create your own programs.
                            </p>
                        </Col>
                    </Row>
                </section>
                <section id="step3" className="py-4 steps">
                    <Row className="d-flex flex-wrap justify-content-between align-items-center">
                        <Col className="px-2">
                            <a href="#step3" className="display-5">
                                <span className="step-icon">
                                    <FaSlackHash />
                                </span>
                                <span>Step 3</span>
                            </a>
                            <p className="lead py-1">
                                Connect to Microbit, import the program files into it, and enjoy the
                                game.
                            </p>
                        </Col>
                        <Col className="px-2 text-right">
                            <img src="assets/step-3.jpg" alt="Microbit By Octopus" />
                        </Col>
                    </Row>
                </section>
            </Container>
        </div>
    );
}

export default Info;
