import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeName, changeUser, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileSaveAs extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSaveAs.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveAs = this.onSaveAs.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
        this.state = {
            modal: false,
            designs: [],
            type: this.props.state.type,
            name: this.props.state.name,
        };
    }
    
    getDesigns(type) {
//        console.log('In FileSaveAs.getDesigns type=', type);
        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
                headers: {
                  Authorization: 'Bearer ' + this.props.user
                }
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                   throw Error(res.statusText);
                }
                return res.json()
            })
            .then(designs => this.setState({ designs }))
            .catch(error => {
                displayError('GET of design names failed with message: \''+error.message+'\'');
            });
    }
    
    postDesign(type,name) {
        this.props.changeName(name);
        this.props.changeUser(this.props.user);
        var method = 'POST'; // Create it
        if (this.state.designs.filter(e => {return e.name === name && e.user === this.props.user}).length > 0) { // Does it already exist?
            method = 'PUT'; // Update it
        }
//        console.log('In FileSaveAs.postDesign type=', type,' name=', name,' method=', method);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: method,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + this.props.user
                },
                body: JSON.stringify(this.props.state, null, 2)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                logUsage('event', 'FileSaveAs', { 'event_label': type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayError('POST of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    toggle() {
//        console.log('In FileSaveAs.toggle this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        this.getDesigns(this.props.state.type);
        this.setState({
            modal: !this.state.modal,
            type: this.props.state.type,
            name: this.props.state.name
        });
    }

    onTextInput(event) {
//        console.log('In FileSaveAs.onTextInput event.target.value=',event.target.value);
        this.setState({
            name: event.target.value 
        });
    }
    
    onSaveAs() {
//        console.log('In FileSaveAs.onSaveAs this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var type = this.state.type;
        var name = this.state.name;
        this.postDesign(type,name);
        this.props.deleteAutoSave();
    }
    
    onCancel() {
//        console.log('In FileSaveAs.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In FileSaveAs.render this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle} disabled={!this.props.user}>
                    Save As&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>  &nbsp; File : Save As
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <Form.Label htmlFor="fileSaveAsText">Save As:</Form.Label>
                        <Form.Control type="text" id="fileSaveAsText" placeholder="Enter design name here" onChange={this.onTextInput}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSaveAs}>Save As</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
});

const mapDispatchToProps = {
    changeName: changeName,
    changeUser: changeUser,
    deleteAutoSave: deleteAutoSave,
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSaveAs)
);
