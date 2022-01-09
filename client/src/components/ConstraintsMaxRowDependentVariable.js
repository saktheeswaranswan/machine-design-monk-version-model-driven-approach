import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';

class ConstraintsMaxRowDependentVariable extends Component {

    constructor(props) {
        super(props);
        this.onChangeMaxConstraint = this.onChangeMaxConstraint.bind(this);
        this.onSetFlagMaxConstrained = this.onSetFlagMaxConstrained.bind(this)
        this.onResetFlagMaxConstrained = this.onResetFlagMaxConstrained.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterButton = this.onEnterButton.bind(this);
        this.onVariableButton = this.onVariableButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = { // Always a "number"
            modal: false, // Default: do not display modal
            valueString: this.props.element.cmax.toString(), // Update the display
            focused: false,
        };
    }

    onSetFlagMaxConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
        logValue(this.props.element.name,'Enabled','MaxConstraintFlag',false);
    }

    onResetFlagMaxConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
        logValue(this.props.element.name,'Disabled','MaxConstraintFlag',false);
    }

    onChangeMaxConstraint(event) {
        this.setState({
            valueString: event.target.value, // Update the display
        });
        var value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            if (this.props.element.lmax & FIXED) {
                this.props.changeSymbolConstraint(this.props.element.name, MIN, value);
                logValue(this.props.element.name,event.target.value,'MinConstraint');
            }
            this.props.changeSymbolConstraint(this.props.element.name, MAX, value);
            logValue(this.props.element.name,event.target.value,'MaxConstraint');
            this.props.onChangeValid();
        } else {
            this.props.onChangeInvalid();
        }
    }

    onClick(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onClick event.target.value=",event.target.value);
        // Show modal only if there are cmaxchoices
        if (this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0) {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    onChangeValue(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onChangeValue event.target.value=",event.target.value);
        this.setState({
            valueString: event.target.value,
            focused: true,
        });
    }

    onEnterButton(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onEnterButton event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
        var value = parseFloat(this.state.valueString);
        if (!isNaN(value)) {
            if (this.props.element.lmax & FIXED) {
                this.props.resetSymbolFlag(this.props.element.name, MIN, FDCL);
                this.props.changeSymbolConstraint(this.props.element.name, MIN, value);
            }
            this.props.resetSymbolFlag(this.props.element.name, MAX, FDCL);
            this.props.changeSymbolConstraint(this.props.element.name, MAX, value);
        }
    }

    onVariableButton(event, source_name) {
//        console.log("In ConstraintsMaxRowDependentVariable.onVariableButton event.target.value=",event.target.value," source_name=",source_name);
        this.setState({
            modal: !this.state.modal
        });
        if (this.props.element.lmax & FIXED) {
            this.props.setSymbolFlag(this.props.element.name, MIN, FDCL, source_name);
        }
        this.props.setSymbolFlag(this.props.element.name, MAX, FDCL, source_name);
    }

    onCancel(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onCancel event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In ConstraintsMaxRowDependentVariable.render this=',this);
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var value_class = 'text-right ';
        if (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) {
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                value_class += "text-not-feasible ";
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                value_class += "text-close-to-feasible ";
            } else if (this.props.objective_value > 0.0) {
                value_class += "text-feasible ";
            } else {
                value_class += "text-strictly-feasible ";
            }
        }
        if (this.props.element.lmax & CONSTRAINED && this.state.focused && isNaN(parseFloat(this.state.valueString))) {
            value_class += "borders-invalid ";
        }
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle d-lg-none" id={'dependent_variable_max_constrain_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip className="d-lg-none">{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Form.Check type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetFlagMaxConstrained : this.onSetFlagMaxConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{this.props.element.lmax & FDCL ? 'FDCL =' + this.props.element.cmaxchoices[this.props.element.cmaxchoice] : '=' + this.props.element.cmax + ' (non-FDCL)'}</Tooltip>}>
                                    <FormControlTypeNumber id={this.props.element.name + "_cmax"} className={value_class} value={this.props.element.lmax & CONSTRAINED ? (this.state.focused ? this.state.valueString : this.props.element.cmax.toString()) : ''} onChangeValid={this.onChangeMaxConstraint} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} onClick={this.onClick}/>
                                </OverlayTrigger>
                            :
                                <FormControlTypeNumber id={this.props.element.name + "_cmax"} className={value_class} value={this.props.element.lmax & CONSTRAINED ? (this.state.focused ? this.state.valueString : this.props.element.cmax.toString()) : ''} onChangeValid={this.onChangeMaxConstraint} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} onClick={this.onClick}/>
                            }
                        </InputGroup>
                        {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ?
                        <Modal show={this.state.modal} className={this.props.className} size="lg" onHide={this.onCancel}>
                            <Modal.Header>
                                <Modal.Title>
                                    Functionally Determined Constraint Level (FDCL) - Set {this.props.element.name} Max Constraint
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table borderless="true">
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">
                                                Select constraint variable or enter constraint value.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Variable:&nbsp;</td>
                                            <td>
                                                <InputGroup>
                                                    <ButtonGroup>
                                                        {this.props.element.cmaxchoices.map((e) => {return (
                                                            <Button key={e} variant="primary" onClick={(event) => {this.onVariableButton(event,e)}} style={{marginBotton: '5px'}} active={this.props.element.cmaxchoices[this.props.element.cmaxchoice] === e}>{e}</Button>
                                                        );})}
                                                    </ButtonGroup>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Value:&nbsp;</td>
                                            <td>
                                                <InputGroup>
                                                    <FormControlTypeNumber id={this.props.element.name + "_cmax"} className={value_class} value={this.state.focused ? this.state.valueString : this.props.element.cmax.toString()} onChangeValid={this.onChangeValue} />
                                                    <Button variant="primary" disabled={this.state.focused && isNaN(parseFloat(this.state.valueString))} onClick={this.onEnterButton}>Enter</Button>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                            </Modal.Footer>
                        </Modal> : ''}
                    </td>
                    <td className={"text-right align-middle small " + (this.props.system_controls.show_violations ? "" : "d-none")} colSpan="1">
                        {this.props.element.lmax & FIXED ? (this.props.element.vmax*100.0).toFixed(1) : (this.props.element.lmax & CONSTRAINED ? (this.props.element.vmax*100.0).toFixed(1) + '%' : '')}
                    </td>
                </tr>
            </tbody>
        );
    }
}

ConstraintsMaxRowDependentVariable.propTypes = {
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
}

ConstraintsMaxRowDependentVariable.defaultProps = {
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolConstraint: changeSymbolConstraint,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintsMaxRowDependentVariable);
