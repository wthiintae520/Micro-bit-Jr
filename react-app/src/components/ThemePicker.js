/**
 * Component for the theme picker 
 */
import { Button, Col, Modal, Row } from 'react-bootstrap';
import '../styles/ThemePicker.css';

function ThemePickerModal({ colorThemes, setColorTheme, activeTheme, isModalOpen, onModalClose }) {
    function closeModal() {
        onModalClose();
    }

    return (
        <Modal
            show={isModalOpen}
            onHide={() => closeModal()}
            fullscreen="lg-down"
            size="lg"
            centered
            scrollable
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton closeVariant={activeTheme.type.match(/dark/i) && 'white'}>
                <Modal.Title>Pick a theme</Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex flex-wrap justify-content-center align-items-center">
                {colorThemes.map((theme) => (
                    <div
                        key={theme.name}
                        className="theme-name d-flex flex-column justify-content-center align-items-center"
                    >
                        <Button
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            className={`border-1 rounded-3 border m-3 ${
                                activeTheme.name === theme.name
                                    ? 'border-success bg-success bg-opacity-25'
                                    : 'border-white'
                            }`}
                            variant="light"
                            onClick={() => setColorTheme(theme.name)}
                        >
                            <Row
                                className="d-flex flex-wrap p-0 m-2 rounded-3 overflow-hidden"
                                style={{ width: '100px', height: '100px' }}
                            >
                                {Object.keys(theme.colors).map((key) => (
                                    <Col
                                        key={key}
                                        style={{
                                            backgroundColor: theme.colors[key],
                                            minWidth: '33%',
                                        }}
                                    />
                                ))}
                            </Row>
                        </Button>
                        <p>{theme.name}</p>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default ThemePickerModal;
