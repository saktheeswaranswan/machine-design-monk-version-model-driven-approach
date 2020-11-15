import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Tabs,
    Tab,
    NavDropdown,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import classnames from 'classnames';
import { deleteAutoSave } from '../store/actionCreators';
import { ExecutePanel } from './ExecutePanel';
import { DesignTable } from './DesignTable';
import { connect } from 'react-redux';
import FileOpen from '../menus/File/FileOpen';
import FileSave from '../menus/File/FileSave';
import FileSaveAs from '../menus/File/FileSaveAs';
import FileDelete from '../menus/File/FileDelete';
import FileRecent from '../menus/File/FileRecent';
import FilePreferences from '../menus/File/FilePreferences';
import FileProperties from '../menus/File/FileProperties';
import FileImport from '../menus/File/FileImport';
import FileExport from '../menus/File/FileExport';
import ActionSearch from '../menus/Action/ActionSearch';
import ActionSeek from '../menus/Action/ActionSeek';
import ActionTrade from '../menus/Action/ActionTrade';
import ActionSelectSize from '../menus/Action/ActionSelectSize';
import ActionSelectCatalog from '../menus/Action/ActionSelectCatalog';
import ActionExecute from '../menus/Action/ActionExecute';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import HelpMotd from '../menus/Help/HelpMotd';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpDemo from '../menus/Help/HelpDemo';
import HelpTutorial from '../menus/Help/HelpTutorial';
import HelpAbout from '../menus/Help/HelpAbout';
import { withAuth } from '@okta/okta-react';
import { logUsage } from '../logUsage';

class App extends Component {
    
    constructor(props) {
//        console.log("In App.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.setKey = this.setKey.bind(this);
        this.report = this.report.bind(this);
        var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
        var report_names = getReportNames();
//        console.log('In App.constructor report_names=', report_names);
        this.state = {
            isOpen: false,
            activeTab: "1",
            report_names: report_names
        };
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In App.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
            var report_names = getReportNames();
//            console.log('In App.componentDidUpdate report_names=', report_names);
            this.setState({
                report_names: report_names,
            });
        }
    }

    toggle() {
//        console.log('In App.toggle');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    setKey(tab) {
//        console.log('In App.setKey tab=',tab);
        logUsage('event', 'Tab', { 'event_label': tab });
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    report(report_name) {
//        console.log('In App.report report_name=',report_name);
        
        // Loop to create prefs from system_controls
        var prefs = [];
        for(var key in this.props.system_controls) {
            prefs.push(this.props.system_controls[key]);
        }

        // Loop to create symbol_table
        var st = [];
        this.props.symbol_table.forEach((element) => {
            st.push(Object.assign({},element));
        });

        // Loop to create labels
        var labels = [];
        this.props.labels.forEach((element) => {
            labels.push(Object.assign({},element));
        });

        // Generate design-type specific report
        var { report } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load report
        var output = report(report_name, prefs, st, labels);
        return output;
    }
  
    render() {
//        console.log('In App.render');
        var src = 'designtypes/'+this.props.type+'/favicon.ico';
        var alt = this.props.type+' icon';
//        console.log('src=',src,' alt=',alt);
        return (
            <React.Fragment>
                <Navbar variant="light" bg="light" expand="md" fixed="top">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app. Save&nbsp;your&nbsp;work&nbsp;first! See&nbsp;Help&nbsp;AutoSave.</Tooltip>}>
                    <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>ODOP</Navbar.Brand>
                  </OverlayTrigger>
                  <Navbar.Toggle onClick={this.toggle} />
                    <Navbar.Collapse in={this.state.isOpen}>
                        <Nav className="mr-auto">
                            <NavDropdown title="File">
                                <FileOpen />
                                <FileRecent />
                                <FileSave />
                                <FileSaveAs />
                                <FileDelete />
                                <NavDropdown.Divider />
                                <FileImport />
                                <FileExport />
                                <NavDropdown.Divider />
                                <FilePreferences />
                                <FileProperties />
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {this.props.deleteAutoSave();this.props.auth.logout()}}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Action">
                                <ActionSearch />
                                <ActionSeek />
                                <ActionTrade />
                                <NavDropdown.Divider />
                                <ActionSelectSize />
                                <ActionSelectCatalog />
                                <NavDropdown.Divider />
                                <ActionExecute />
                            </NavDropdown>
                            <NavDropdown title="View">
                                <NavDropdown.Item disabled>
                                    Define  Sub-Problems&hellip;
                                </NavDropdown.Item>
                                <NavDropdown.Item disabled>
                                    Display Sub-Problems&hellip;
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {process.env.NODE_ENV !== "production" && <ViewOffsets />}
                                {process.env.NODE_ENV !== "production" && <ViewSymbolTableOffsets />}
                            </NavDropdown>
                            <NavDropdown title="Help">
                                <HelpMotd />
                                <HelpIndex />
                                <HelpDemo />
                                <HelpTutorial />
                                <HelpAbout />
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link className={classnames({ active: this.state.activeTab === "1" })} onClick={() => { this.setKey("1"); }}>
                                    <span className="d-none d-md-inline">Design: </span><img className="d-none d-md-inline" src={src} alt={alt} height="30px"/> {this.props.name}
                                </Nav.Link>
                            </Nav.Item>
                            {this.state.report_names.map((element,i) => {return (
                                <Nav.Item key={element}>
                                    <Nav.Link className={classnames({ active: this.state.activeTab === (i+2).toString() })} onClick={() => { this.setKey((i+2).toString()); }}>
                                        <span className="d-none d-md-inline">Report: </span>{element}
                                    </Nav.Link>
                                </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container style={{backgroundColor: '#eee', paddingTop: '100px'}}>
                    <ExecutePanel />
                    <Tabs defaultActiveKey="1" activeKey={this.state.activeTab} onSelect={k => this.setKey(k)}>
                        <Tab eventKey="1">
                            <Container fluid>
                                <DesignTable />
                            </Container>
                        </Tab>
                        {this.state.report_names.map((element,i) => {return (
                            <Tab key={element} eventKey={(i+2).toString()}>
                                <div id={"report-"+i}>{this.report(element)}</div>
                            </Tab>
                            );
                        })}
                    </Tabs>
                </Container>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    name: state.model.name,
    type: state.model.type,
    version: state.model.version,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    labels: state.model.labels,
});

const mapDispatchToProps = {
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
