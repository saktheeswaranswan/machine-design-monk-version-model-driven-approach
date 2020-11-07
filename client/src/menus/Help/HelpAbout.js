import React, { Component } from 'react';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { version } from '../../version';
import { logUsage } from '../../logUsage';

class HelpAbout extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'HelpAbout');
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    About
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>  &nbsp; About {this.props.type}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">Open Source </a> software. &nbsp; 
                        <a href="https://github.com/thegrumpys/odop/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">MIT License.</a> <br />
                        Software version &nbsp; {version()}  <br />
                        Design Model version &nbsp; {this.props.version}<br />
                        Link to <a href="https://thegrumpys.github.io/odop/About/" target="_blank" rel="noopener noreferrer">website home page</a>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type, 
    version: state.version
  });

export default connect(mapStateToProps)(HelpAbout);
