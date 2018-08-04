import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { initialState } from '../problems/Piston-Cylinder/initialState';
import App from './App';
import { displaySpinner } from './Spinner';
import { displayError } from './ErrorModal';
import { pcylWebApp } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

export class PromptForDesign extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: true,
            designs: [],
            name: "startup"
        };
        this.getDesigns();
    }

    getDesigns() {
        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designs')
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                   throw Error(res.statusText);
                }
                return res.json()
            })
            .then(designs => this.setState({ designs }))
            .catch(error => {
                displayError('GET of design names failed: '+error.message);
            });
    }
    
    getDesign(name) {
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        displaySpinner(true);
        fetch('/api/v1/designs/'+name)
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .then(design => {
                const store = createStore(pcylWebApp, design, middleware);
                ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
            })
            .catch(error => {
                displayError('GET of \'startup\' design failed with message: \''+error.message+'\'. Using builtin initialState instead. You may continue in "demo mode" but you will be unable to save your work.');
                const store = createStore(pcylWebApp, initialState, middleware);
                ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
            });
    }

    onSelect(event) {
//        console.log(event.target.value)
        this.setState({
            name: event.target.value 
        });
    }
    
    onOpen() {
        this.setState({
            modal: !this.state.modal
        });
//        console.log(this.state.name);
        // Load the model
        var name = this.state.name;
        if (name === undefined) name = 'startup';
        this.getDesign(name);
    }
    
    onCancel() {
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        const { designs } = this.state;
        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                    <img src="favicon.ico" alt="The Grumpys"/> &nbsp; Open Design Optimization : Platform<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Piston - Cylinder Design Problem</ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="fileOpenSelect">PCyl-Web is experimental software.<br />See the Help : About menu for details.<br /><br />Select design to open:</Label>
                        <Input type="select" id="fileOpenSelect" onChange={this.onSelect} value={this.state.name}>
                            {designs.map((design, index) =>
                                <option key={index} value={design}>{design}</option>
                            )}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onOpen}>Open</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

