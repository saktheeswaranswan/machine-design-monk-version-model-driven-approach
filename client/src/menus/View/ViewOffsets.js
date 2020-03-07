import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class ViewOffsets extends Component {

    constructor(props) {
//        console.log('In ViewOffsets.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }
    
    toggle() {
//        console.log('In ViewOffsets.toggle');
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In ViewOffsets.render');
        var ip = 0;
        var ix = 0;
        var isc = 0;
        var il = 0;
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Offsets
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Offsets
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>
                        {'// Independent Variables (input-only)\n'}
                        {Object.values(this.props.symbol_table).map((element) => {console.log("element=",element); return (element.type === "equationset" && element.input) ? 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ip++) + ';\n' : ''})}
                        {'\n// Dependent Variables (input-output)\n'}
                        {Object.values(this.props.symbol_table).map((element) => {console.log("element=",element); return ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) ? 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ix++) + ';\n' : ''})}
                        {'\n// System Controls (Preferences)\n'}
                        {Object.values(this.props.system_controls).map((element) => {console.log("element=",element); return 'export const ' + element.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (isc++) + ';\n'})}
                        {'\n// Labels (Properties)\n'}
                        {this.props.labels.map((element) => {console.log("element=",element); return 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (il++) + ';\n'})}
                        </pre>
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
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
    labels: state.labels
});

export default connect(mapStateToProps)(ViewOffsets);
