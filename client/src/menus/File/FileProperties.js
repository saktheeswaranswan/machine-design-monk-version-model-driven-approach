import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeLabelsValue } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';

class FileProperties extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRestoreDefaults = this.onRestoreDefaults.bind(this);
        this.onApplyandClose = this.onApplyandClose.bind(this);
        // Initialze modal flag off 
        // Initialize the state.labels to the props.labels
        this.state = {
            modal: false,
            labels: this.props.labels
        };
    }

    toggle() {
        // Open the modal
        // Copy the props.labels into the state.labels
        this.setState({
            modal: !this.state.modal,
            labels: this.props.labels
        });
    }

    onChange(name, value) {
        // Save the value into the state.labels
        this.setState({
            labels: this.state.labels.map((label) => {
                if (label.name === name) {
                    return Object.assign({}, label, {
                        value: value.replace(/["\\/]/ig, '') // replace invalid JSON characters with nothing throughout
                    });
                }
                return label;
            })
        });
    }
    
    onRestoreDefaults() {
        // Copy the default values into the state.labels
        var { initialState } = require('../../designtypes/'+this.props.type+'/initialState.js'); // Dynamically load initialState
        this.setState({
            labels: initialState.labels
        });
    }
    
    onApplyandClose() {
        // Close the modal
        this.setState({
            modal: !this.state.modal
        });
        // Copy the state.labels into the props.labels
        this.props.changeLabelsValue(this.state.labels);
        logUsage('function=FileProperties');
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Properties&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Properties
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold">Name</Col>
                                <Col className="text-right font-weight-bold">Value</Col>
                            </Row>
                            {
                                this.state.labels.map(
                                    (label) => {
                                        return (
                                            <Row key={label.name}>
                                                <Col className="align-middle text-left">{label.name}</Col>
                                                <Col className="align-middle text-left">
                                                    <Form.Control as="textarea" className="input-group-lg" value={label.value} onChange={(event) => {this.onChange(label.name, event.target.value)}}/>
                                                </Col>
                                            </Row>
                                        );
                                    })
                            }
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button variant="primary" onClick={this.onRestoreDefaults}>Restore Defaults</Button>
                        <Button variant="primary" onClick={this.onApplyandClose}>Apply and Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type,
    labels: state.labels
});

const mapDispatchToProps = {
    changeLabelsValue: changeLabelsValue
};

export default connect(mapStateToProps, mapDispatchToProps)(FileProperties);
