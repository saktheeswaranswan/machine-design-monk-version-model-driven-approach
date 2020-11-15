import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { load, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileImport extends Component {

    constructor(props) {
        super(props);
//        console.log('In FileImport.constructor props=',props);
        this.toggle = this.toggle.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileImport = this.onFileImport.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            selectedFile: null, // Initially, no file is selected
            fileReader: new FileReader(),
        };
        this.state.fileReader.onloadend = this.onLoadEnd; // On Load End callback
        this.state.fileReader.onError = this.onError; // On Error callback
    }

    toggle() {
//        console.log('In FileImport.toggle');
        this.setState({
            modal: !this.state.modal, // Display Modal
        });
    }

    // On file select (from the pop up)
    onFileChange(event) {
//        console.log('In FileImport.onFileChange event=',event);
        this.setState({ 
            selectedFile: event.target.files[0]
        });
    };

    // On file upload (click the upload button)
    onFileImport() {
//        console.log('In FileImport.onFileImport');
        this.setState({
            modal: !this.state.modal, // Hide Modal
        });
        displaySpinner(true);
        this.state.fileReader.readAsText(this.state.selectedFile); // Begin Reading Text File
    };
    
    onLoadEnd(event) {
//        console.log('In FileImport.onLoadEnd event=',event);
        displaySpinner(false);
        var design = JSON.parse(this.state.fileReader.result); // Convert file contents to JSON object
//        console.log('In FileImport.onLoadEnd design.type=',design.type,'design.name=',design.name);
        var path = require('path');
        var filename = path.basename(this.state.selectedFile.name,'.json'); // Drop prefix directories and suffix extension
        design.name = filename; // Replace design name with file name
        var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
        var migrated_design = migrate(design);
        this.props.load({name: selectedFile.name, model: migrated_design});
        this.props.deleteAutoSave();
        logUsage('event', 'FileImport', { 'event_label': migrated_design.type + ' ' + migrated_design.name });
    }
    
    onError(e) {
//        console.log('In FileImport.onError e=',e);
        displaySpinner(false);
        displayError('GET of design names failed with message: \''+this.state.fileReader.error.message+'\'');
    }

    onCancel() {
//        console.log('In FileImport.onCancel');
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In FileImport.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Import&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Import
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.File custom>
                            <Form.File.Input accept=".json" onChange={this.onFileChange} />
                            <Form.File.Label data-browse="Select File">{this.state.selectedFile == null ? 'No File Selected' : this.state.selectedFile.name}</Form.File.Label>
                        </Form.File>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onFileImport} disabled={this.state.selectedFile == null}>Import</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    load: load,
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileImport)
);
