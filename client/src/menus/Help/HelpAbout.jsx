import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { version as release_version } from '../../version';
import { logUsage } from '../../logUsage';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';

export default function HelpAbout() {
//  console.log("HelpAbout - Mounting...");
  const [show, setShow] = useState(false);
  const [sizes, setSizes] = useState('');
  const [size, setSize] = useState('');
  const user = useSelector((state) => state.modelSlice.user);
  const type = useSelector((state) => state.modelSlice.model.type);
  const version = useSelector((state) => state.modelSlice.model.version);
  const jsontype = useSelector((state) => state.modelSlice.model.jsontype);
  const units = useSelector((state) => state.modelSlice.model.units);
  const { oktaAuth, authState } = useOktaAuth();
//  console.log('HelpAbout','oktaAuth=',oktaAuth,'authState=',authState);

  useEffect(() => {
//    console.log("HelpAbout - Mounted");
    getDBSize(user);
//    return () => console.log("HelpAbout - Unmounting ...");
    return () => {};
  }, []);

  const toggle = () => {
//    console.log('In HelpAbout.toggle');
    setShow(!show);
    if (show) logUsage('event', 'HelpAbout', { event_label: 'HelpAbout' });
  }

  const getDBSize = (user) => {
//    console.log('In HelpAbout.getDBSize');
    displaySpinner(true);
    fetch('/api/v1/db_size', {
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
    .then(sizes => {
//        console.log('In HelpAbout.getSize sizes=', sizes);
      setSizes(sizes);
      var size = '';
      if (sizes.length > 0) {
        size = sizes[0]; // Default to first name
      }
//        console.log('In HelpAbout.getSize size=', size);
      setSize(size);
      logUsage('event', 'HelpAbout', { event_label: 'getDBSize: ' + size });
    })
    .catch(error => {
      displayMessage('GET of DB Size failed with message: \'' + error.message + '\'');
    })
    .finally(() => {
      displaySpinner(false);
    });
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        About
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />  &nbsp; About ODOP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Link to <a href="/docs/About/" target="_blank" rel="noopener noreferrer">About</a> topics
          <br />
          Link to <a href={'/docs/Help/DesignTypes/' + type + '/description.html'} target="_blank" rel="noopener noreferrer">{type} Design Type</a> description
          <br />
          Link to <a href="https://www.springdesignsoftware.org/" target="_blank" rel="noopener noreferrer">Spring Design Software Website</a> home page
          <hr />
          This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">Open Source </a> software.
          <br />
          About <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" rel="noopener noreferrer">MIT License</a>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <a href="https://github.com/thegrumpys/odop/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">ODOP License</a>
          <hr />
          ODOP Software Version: {release_version()}<br />
          {config.node.env !== "production" &&
            <>
              User Authenticated: {authState.isAuthenticated ? 'true' : 'false'}<br />
              User Email: {authState.isAuthenticated ? authState.idToken.claims.email : 'Unknown'}<br />
              User ClientId: {user === null ? 'Unknown' : user}<br />
            </>
          }
          Model: {jsontype} {type}<br />
          Model Units: {units}<br />
          Model Version: {version}<br />
          {config.node.env !== "production" && <span>DB Size: {size} MB</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
