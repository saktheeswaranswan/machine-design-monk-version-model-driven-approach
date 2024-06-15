import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/modelSlice';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';
import { toODOPPrecision } from '../toODOPPrecision';

export default function ConstraintsMaxRowIndependentVariable({ element, index, onChangeValid, onChangeInvalid, onSet, onReset }) {
//  console.log('ConstraintsMaxRowIndependentVariable - Mounting...','element=',element,'index=',index);
  const [show, setShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [valueString, setValueString] = useState(false);
  const show_violations = useSelector((state) => state.modelSlice.model.system_controls.show_violations);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log('ConstraintsMaxRowIndependentVariable - Mounted');
//    return () => console.log('ConstraintsMaxRowIndependentVariable - Unmounting ...');
    return () => { };
  }, []);

  const onSetFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onSetFlagMaxConstrained', 'event.target.value=', event.target.value);
    dispatch(setSymbolFlag(element.name, MAX, CONSTRAINED));
    logValue(element.name, 'Enabled', 'MaxConstraintFlag', false);
    if (typeof onSet === "function") onSet(event);
  }

  const onResetFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onResetFlagMaxConstrained', 'event.target.value=', event.target.value);
    dispatch(resetSymbolFlag(element.name, MAX, CONSTRAINED));
    logValue(element.name, 'Disabled', 'MaxConstraintFlag', false);
    if (typeof onReset === "function") onReset(event);
  }

  const onChangeValidMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onChangeValidMaxConstraint', 'event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
    logValue(element.name, event.target.value, 'MaxConstraint');
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onChangeInvalidMaxConstraint event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onClick = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onClick', 'event.target.value=', event.target.value);
    // Show modal only if there are cmaxchoices
    if (element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
      setValueString(element.cmax.toString());
      setShow(!show);
    }
  }

  const onChangeValidValue = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onChangeValidValue', 'event.target.value=', event.target.value);
    setValueString(event.target.value);
    setIsInvalidValue(false);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onChangeInvalidValue', 'event.target.value=', event.target.value);
    setIsInvalidValue(true);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onEnterButton = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onEnterButton', 'event.target.value=', event.target.value);
    setShow(!show);
    var value = parseFloat(valueString);
    if (element.lmax & FIXED) {
      dispatch(resetSymbolFlag(element.name, MIN, FDCL));
      dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    }
    dispatch(resetSymbolFlag(element.name, MAX, FDCL));
    dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
  }

  const onVariableButton = (event, source_name) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onVariableButton', 'event.target.value=', event.target.value, 'source_name=', source_name);
    setShow(!show);
    if (element.lmax & FIXED) {
      dispatch(setSymbolFlag(element.name, MIN, FDCL, source_name));
    }
    dispatch(setSymbolFlag(element.name, MAX, FDCL, source_name));
  }

  const onCancel = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onCancel', 'event.target.value=', event.target.value);
    setShow(!show);
  }

  // =======================================
  // Constraint Maximum Column
  // =======================================
  var results = getAlertsByName(element.name + ' MAX');
  var className = results.className;
  var icon_alerts = results.alerts;
  return (
    <tbody id={'cmnriv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle d-lg-none" id={'cmxriv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip className="d-lg-none">{element.tooltip}</Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            <InputGroup.Text>
              <Form.Check id={'cmxriv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for maximum value" checked={element.lmax & CONSTRAINED} onChange={element.lmax & CONSTRAINED ? onResetFlagMaxConstrained : onSetFlagMaxConstrained} disabled={element.lmax & FIXED ? true : false} />
            </InputGroup.Text>
            <FormControlTypeNumber id={'cmxriv_cmin_' + element.name} icon_alerts={icon_alerts} className={className} value={element.cmax} validmin={element.validmin} validmax={element.validmax} disabled={element.lmax & FIXED ? true : (element.lmax & CONSTRAINED ? false : true)} disabledText={element.lmax & CONSTRAINED ? false : true} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onClick={onClick} />
          </InputGroup>
          {element.cmaxchoices !== undefined && element.cmaxchoices.length > 0 && show &&
            <Modal show={show} size="lg" onHide={onCancel}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Functionally Determined Constraint Level (FDCL) - Set {element.name} Max Constraint
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table borderless="true" className="table-secondary">
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
                            {element.cmaxchoices.map((e) => {
                              return (
                                <Button key={e} variant="primary" onClick={(event) => { onVariableButton(event, e) }} style={{ marginBotton: '5px' }} active={element.cmaxchoices[element.cmaxchoice] === e}>{e}</Button>
                              );
                            })}
                          </ButtonGroup>
                        </InputGroup>
                      </td>
                    </tr>
                    <tr>
                      <td>Value:&nbsp;</td>
                      <td>
                        <InputGroup>
                          <FormControlTypeNumber id={'cmxriv_cmaxfdcl_' + element.name} className={className} value={element.cmax} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} />
                          <Button variant="primary" disabled={isInvalidValue} onClick={onEnterButton}>Enter</Button>
                        </InputGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
              </Modal.Footer>
            </Modal>}
        </td>
        <td className={"text-end align-middle small " + className + (show_violations === 0 ? "d-none" : "")} colSpan="1">
          {show_violations === 1 && element.vmax <= 0 ?
            ''
            : (element.lmax & FIXED ?
              ''
              : (element.lmax & CONSTRAINED ?
                toODOPPrecision(element.vmax * 100.0)
                : ''))}
        </td>
      </tr>
    </tbody>
  );
}
