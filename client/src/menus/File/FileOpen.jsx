import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { changeName, loadInitialState, load, restoreAutoSave, deleteAutoSave } from '../../store/modelSlice';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
//import { withOktaAuth } from '@okta/okta-react';
//import { withRouter } from 'react-router-dom';

export default function FileOpen() {
//  console.log("FileOpen - Mounting...");
  const model_user = useSelector((state) => state.modelSlice.user);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const model_name = useSelector((state) => state.modelSlice.name);
  const [show, setShow] = useState(config.url.prompt);
  const [types, setTypes] = useState(config.env.types);
  const [names, setNames] = useState([{ user: model_user, name: model_name }]);
  const [type, setType] = useState(model_type);
  const [name, setName] = useState(model_name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

//  useEffect(() => {
////    console.log("FileOpen - Mounted");
//    getDesignNames(model_user, model_type);
//    return () => { };
//  }, []);

  useEffect(() => {
//    console.log('FileOpen','model_user=',model_user,'model_type=',model_type);
    setType(model_type);
    getDesignNames(model_user, model_type);
    return () => { };
  }, [model_user, model_type]);

  const getDesignNames = (user, type) => {
//    console.log('FileOpen.getDesignNames user=', user, 'type=', type);
    // Get the names and store them in state
    displaySpinner(true);
    fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => {
        if (!res.ok) {
          //                console.warn('FileOpen.getDesignNames res=',res);
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(names => {
//        console.log('FileOpen.getDesignNames user=', user, 'type=', type, 'names=', names);
        var name;
        if (names.length > 0) {
          var i = names.findIndex(element => element.name === config.url.name)
          if (i > 0) {
            name = names[i].name;
          } else {
            name = names[0].name;
          }
        } else {
          name = '';
        }
        setNames(names);
        setName(name);
      })
      .catch(error => {
        displayMessage('GET of design names failed with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const getDesign = (user, type, name) => {
//    console.log('FileOpen.getDesign user=', user, 'type=', type, 'name=', name);
    displaySpinner(true);
    fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs/' + encodeURIComponent(name), {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then((design) => {
//        console.log('FileOpen.getDesign design=', design);
        var { migrate } = require('../../designtypes/' + design.type + '/migrate.js'); // Dynamically load migrate
        var migrated_design = migrate(design);
        if (migrated_design.jsontype === "ODOP") {
          dispatch(changeName(name));
          dispatch(load(migrated_design));
          dispatch(deleteAutoSave());
          logUsage('event', 'FileOpen', { event_label: type + ' ' + name });
        } else {
          displayMessage('Invalid JSON type, function ignored');
        }
      })
      .catch(error => {
        displayMessage('GET of \'' + name + '\' design failed for type \'' + type + '\' with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const toggle = () => {
//    console.log('FileOpen.toggle');
    var type = (types.includes(model_type) ? model_type : config.url.type);
    getDesignNames(model_user, type);
    var name = (names.includes(model_name) ? model_name : config.url.name);
    setType(type);
    setName(name);
    setShow(!show);
  }

  const onSelectType = (event) => {
//    console.log('FileOpen.onSelectType', 'event.target.value=', event.target.value)
    setType(event.target.value);
    setNames([]);
    getDesignNames(model_user, event.target.value);
  }

  const onSelectName = (event) => {
//    console.log('FileOpen.onSelectName', 'event.target.value=', event.target.value)
    setName(event.target.value);
  }

  const onSignIn = () => {
//    console.log('FileOpen.onSignIn');
    setShow(!show);
    navigate.push('/login');
  }

  const onLoadInitialState = () => {
//    console.log('FileOpen.onLoadInitialState');
    setShow(!show);
    let rc = dispatch(loadInitialState(type, 'US'));
//    console.log('rc=',rc);
    dispatch(deleteAutoSave());
    logUsage('event', 'FileOpen', { event_label: type + ' load initialState US' });
  }

  const onLoadMetricInitialState = () => {
//    console.log('FileOpen.onLoadMetricInitialState');
    setShow(!show);
    dispatch(loadInitialState(type, 'Metric'));
    dispatch(deleteAutoSave());
    logUsage('event', 'FileOpen', { event_label: type + ' load initialState Metric' });
  }

  const onLoadAutoSave = () => {
//    console.log('FileOpen.onLoadAutoSave');
    setShow(!show);
    dispatch(restoreAutoSave());
    dispatch(deleteAutoSave());
    logUsage('event', 'FileOpen', { event_label: type + ' load autoSave' });
  }

  const onCancel = () => {
//    console.log('FileOpen.onCancel');
    setShow(!show); // Noop - all done    
  }

  const onOpen = () => {
//    console.log('FileOpen.onOpen');
    setShow(!show);
    getDesign(model_user, type, name); // Load the model
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Open&hellip;
      </NavDropdown.Item>
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Open
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          {/* {!this.props.authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>} */}
          <Form.Label htmlFor="fileOpenSelectType">Select design type to open:</Form.Label>
          <Form.Control as="select" id="fileOpenSelectType" onChange={onSelectType} value={type}>
            {types.map((designtype, index) =>
              <option key={index} value={designtype}>{designtype}</option>
            )}
          </Form.Control>
          <br />
          <Form.Label htmlFor="fileOpenSelectName">Select {/* {!this.props.authState.isAuthenticated ? "system" : "private or system"} */} design to open:</Form.Label>
          <Form.Control as="select" id="fileOpenSelectName" onChange={onSelectName} value={name}>
            {names.filter((design, index, self) => { return self.map(design => { return design.name }).indexOf(design.name) === index }).map((design, index) =>
              <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
            )}
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          {/* {!this.props.authState.isAuthenticated && <Button variant="info" onClick={onSignIn}>Sign In...</Button>}{' '} */}
          {config.node.env !== "production" && <Button variant="secondary" onClick={onLoadInitialState}>Load Initial State</Button>}{' '}
          {config.node.env !== "production" && <Button variant="secondary" onClick={onLoadMetricInitialState}>Load Metric Initial State</Button>}{' '}
          {typeof (Storage) !== "undefined" && localStorage.getItem('autosave') !== null && <Button variant="secondary" onClick={onLoadAutoSave}>Load Auto Save</Button>}{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onOpen} disabled={names.length === 0 ? true : false}>Open</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
