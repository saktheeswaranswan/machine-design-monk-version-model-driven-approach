import React, { Component } from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED, CONSTRAINED } from '../../store/actionTypes';
import { changeSymbolValue, fixSymbolValue } from '../../store/actionCreators';
import * as mo from './mat_ips_offsets';
import NameValueUnitsHeaderIndependentVariable from '../../components/NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsRowIndependentVariable from '../../components/NameValueUnitsRowIndependentVariable';
import NameValueUnitsHeaderDependentVariable from '../../components/NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from '../../components/NameValueUnitsRowDependentVariable';
import ConstraintsMinHeaderIndependentVariable from '../../components/ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from '../../components/ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from '../../components/ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from '../../components/ConstraintsMinRowDependentVariable';
import ConstraintsMaxHeaderIndependentVariable from '../../components/ConstraintsMaxHeaderIndependentVariable';
import ConstraintsMaxRowIndependentVariable from '../../components/ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxHeaderDependentVariable from '../../components/ConstraintsMaxHeaderDependentVariable';
import ConstraintsMaxRowDependentVariable from '../../components/ConstraintsMaxRowDependentVariable';
import NameValueUnitsHeaderCalcInput from '../../components/NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from '../../components/NameValueUnitsRowCalcInput';
import { logValue } from '../../logUsage';
import { logUsage } from '../../logUsage';
import { toODOPPrecision } from '../../toODOPPrecision';

class SymbolValueWireDia extends Component {

    constructor(props) {
//        console.log('In SymbolValueWireDia.constructor props=',props);
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            modal: false,
        };
    }

    onSelect(event) {
//        console.log('In SymbolValueWireDia.onSelect event.target.value=',event.target.value);
        var wire_dia = parseFloat(event.target.value);
//        console.log('In SymbolValueWireDia.onSelect wire_dia=',wire_dia);
        this.props.changeSymbolValue(this.props.element.name,wire_dia);
        this.props.fixSymbolValue(this.props.element.name);
        logValue(this.props.element.name,wire_dia);
    }

    onContextMenu(e) {
//        console.log('In SymbolValueWireDia.onContextMenu this=',this,'e=',e);
        e.preventDefault();
        this.setState({
            modal: true,
        });
    }

    onContextHelp() {
//        console.log('In SymbolValueWireDia.onContextHelp this=',this);
        logUsage('event', 'SymbolValueWireDia', { 'event_label': 'context Help button' });
        this.setState({
            modal: !this.state.modal
        });
        window.open('https://thegrumpys.github.io/odop/Help/settingValues', '_blank');
    }

    onClose() {
//        console.log('In SymbolValueWireDia.onClose this=',this);
        this.setState({
            modal: false,
        });
    }

    getValueClass() {
        var value_class = '';
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            value_class += "text-not-feasible ";
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            value_class += "text-close-to-feasible ";
        } else if (this.props.objective_value > 0.0) {
            value_class += "text-feasible ";
        } else {
            value_class += "text-strictly-feasible ";
        }
//        console.log('In SymbolValueWireDia.getValueClass value_class=',value_class);
        return value_class;
    }

    render() {
//        console.log('In SymbolValueWireDia.render this=',this);

//        console.log('In SymbolValueWireDia.render ../' + this.props.type + '/symbol_table_offsets.js');
        var o = require('../'+this.props.type+'/symbol_table_offsets.js'); // Dynamically load table
//        console.log('In SymbolValueWireDia.render o =', o);

        // Find size name, load size table, and get wire diameter value
//        console.log('In SymbolValueWireDia.render this.props.symbol_table[o.Material_File].value =', this.props.symbol_table[o.Material_File].value);
        var m_tab;
        if (this.props.symbol_table[o.Material_File].value === "mat_SI.json")
            m_tab = require('./mat_SI.json');
        else
            m_tab = require('./mat_ips.json');
//        console.log('In SymbolValueWireDia.render m_tab =', m_tab);
        var i = this.props.symbol_table[o.Material_Type].value;
//        console.log('In SymbolValueWireDia.render i=',i);
        var size_name = m_tab[i][mo.siznam];
//        console.log('In SymbolValueWireDia.render size_name=',size_name);
        var size_table = require('./'+size_name+'.json'); // Dynamically load table
//        console.log('In SymbolValueWireDia.render size_table=',size_table);
        const needle = this.props.element.value;
//        console.log('In SymbolValueWireDia.render needle=',needle);
        var default_value = size_table.find((element,index) => {
            if (index > 0) { // skip the column header
                if (element[0] !== needle) return false; // keep looking
                else return true; // were done
            } else {
                return false; // keep looking
            }
        });
//        console.log('In SymbolValueWireDia.render default_value=',default_value);

        var value_class = 'text-right ';
        var value_tooltip;
        var value_fix_free_text = '';
        if (!this.props.element.input && (this.props.element.lmin & FIXED && this.props.element.vmin > 0.0) && (this.props.element.lmax & FIXED && this.props.element.vmax > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "FIX VIOLATION: Value outside the range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
        } else if (!this.props.element.input && (this.props.element.lmin & FIXED && this.props.element.vmin > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "FIX VIOLATION: Value less than "+this.props.element.cmin.toODOPPrecision();
        } else if (!this.props.element.input && (this.props.element.lmax & FIXED && this.props.element.vmax > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "FIX VIOLATION: Value greater than "+this.props.element.cmax.toODOPPrecision();
        } else if ((this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) && (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "CONSTRAINT VIOLATION: Value outside the range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
        } else if (this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) {
            value_class += this.getValueClass();
            value_tooltip = "CONSTRAINT VIOLATION: Value less than "+this.props.element.cmin.toODOPPrecision();
        } else if (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) {
            value_class += this.getValueClass();
            value_tooltip = "CONSTRAINT VIOLATION: Value greater than "+this.props.element.cmax.toODOPPrecision();
        }
        if (this.props.element.lmin & FIXED) {
            value_class += "borders-fixed ";
            if (this.props.element.type !== "calcinput") {
                if (this.props.element.input) { // Independent Variable?
                  value_fix_free_text = <div className="mb-3"><em>Fixed status prevents <img src="SearchButton.png" alt="SearchButton"/> from changing the value of this variable.</em></div>; // For Fixed
                } else {
                  value_fix_free_text = <div className="mb-3"><em>Fixed status restrains the <img src="SearchButton.png" alt="SearchButton"/> result to be as close as possible to the constraint value.</em></div>; // For Fixed
                }
            }
        } else {
            if (this.props.element.type !== "calcinput") {
                value_fix_free_text = <div className="mb-3"><em>Free status allows <img src="SearchButton.png" alt="SearchButton"/> to change the value of this variable.</em></div>; // For Free
            }
            if (this.props.element.lmin & CONSTRAINED) {
                value_class += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                value_class += "borders-constrained-max ";
            }
        }
//        console.log('In SymbolValueWireDia.render value_class=',value_class);
        return (
            <React.Fragment>
                <td className={"align-middle " + this.props.className}>
                    <InputGroup>
                        {(value_tooltip !== undefined ?
                            <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                <Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={default_value === undefined ? this.props.element.value : default_value[0]} onChange={this.onSelect} onContextMenu={this.onContextMenu}>
                                    {default_value === undefined && <option key={0} value={this.props.element.value}>{this.props.element.value+" Non-std"}</option>}
                                    {size_table.map((value, index) => index > 0 ? <option key={index} value={value[0]}>{value[0]}</option> : '')}
                                </Form.Control>
                            </OverlayTrigger>
                        :
                            <Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={default_value === undefined ? this.props.element.value : default_value[0]} onChange={this.onSelect} onContextMenu={this.onContextMenu}>
                            {default_value === undefined && <option key={0} value={this.props.element.value}>{this.props.element.value+" Non-std"}</option>}
                                {size_table.map((value, index) => index > 0 ? <option key={index} value={value[0]}>{value[0]}</option> : '')}
                            </Form.Control>
                        )}
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onClose}>
                    <Modal.Header>
                        <Modal.Title>
                        {this.props.element.type === "equationset" && (this.props.element.input ? 'Independent Variable' : 'Dependent Variable')} Value Input
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <NameValueUnitsHeaderIndependentVariable />
                                    <NameValueUnitsRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <NameValueUnitsHeaderDependentVariable />
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <React.Fragment>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                        </Table>
                        <Table size="sm" style={{backgroundColor: '#eee'}} className="mb-0">
                            <tbody>
                                <tr className="table-light">
                                    <td>
                                        {value_fix_free_text}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMinHeaderIndependentVariable />
                                    <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMinHeaderDependentVariable />
                                    <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMaxHeaderIndependentVariable />
                                    <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMaxHeaderDependentVariable />
                                    <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button outline="true" variant="info" onClick={this.onContextHelp}>Help</Button>{' '}
                        &nbsp;
                        <Button variant="primary" onClick={this.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    fixSymbolValue: fixSymbolValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValueWireDia);
