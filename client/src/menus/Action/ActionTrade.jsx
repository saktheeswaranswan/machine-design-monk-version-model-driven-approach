import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { MIN, MAX, CONSTRAINED, FDCL } from '../../store/actionTypes';
import {
  changeSymbolConstraint,
  saveInputSymbolValues,
  restoreInputSymbolValues,
  changeResultTerminationCondition,
  search,
  saveAutoSave
} from '../../store/modelSlice';
import { logUsage } from '../../logUsage';
import FormControlTypeNumber from '../../components/FormControlTypeNumber';
import store from "../../store/store";

export default function ActionTrade() {
  console.log('ActionTrade - Mounting...');

  const objmin = useSelector((state) => state.modelSlice.model.system_controls.objmin);
  const objective_value = useSelector((state) => state.modelSlice.model.result.objective_value);
  const [strategyShow, setStrategyShow] = useState(false);
  const [arbitraryShow, setArbitraryModal] = useState(false);
  const [sizeShow, setSizeModal] = useState(false);
  const [feasibleShow, setFeasibleModal] = useState(false);
  const [establishShow, setEstablishModal] = useState(false);
  const [notFeasibleShow, setNotFeasibleModal] = useState(false);
  const [arbitraryContinueDisabled, setArbitraryContinueDisabled] = useState(false);
  const [nviol, setNviol] = useState(0);
  const [vflag, setVflag] = useState([]);
  const [ldir, setLdir] = useState([]);
  const [dir, setDir] = useState([]);
  const [tc, setTc] = useState(undefined);
  const [rk1, SetRk1] = useState(undefined);
  const [smallest, setSmallest] = useState(undefined);
  const [biggest, setBiggest] = useState(undefined);
  const [defaultEstPercent, setDefaultEstPercent] = useState(undefined);
  const dispatch = useDispatch();

//===========================================================
// Trade Menu Item
//===========================================================

  const strategyToggle = () => {
    console.log('In ActionTrade.strategyToggle');
    logUsage('event', 'ActionTrade', { event_label: 'ActionTrade' });
    dispatch(saveAutoSave());
    var design;
    var ncode;
//        dispatch(saveInputSymbolValues());
//        dispatch(search());
    design = store.getState().modelSlice;
    var nviol = commonViolationSetup();
    if (design.model.result.objective_value <= design.model.system_controls.objmin || nviol === 0) {
      dispatch(restoreInputSymbolValues());
      ncode = 'OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE';
      dispatch(changeResultTerminationCondition(ncode));
      return;
    } else {
      setStrategyShow(!strategyShow);
    }
  }

  const commonViolationSetup = () => {
    console.log('In ActionTrade.commonViolationSetup');
    var design;
    var element;
    var nviol = 0;
    var ldir = [];
    var vflag = [];
    dispatch(saveInputSymbolValues());
    dispatch(search());
    design = store.getState().modelSlice;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
      element = design.model.symbol_table[i];
      if (element.lmin & CONSTRAINED && !(element.lmin & FDCL) && element.vmin > 0.0) {
        nviol++
        vflag[nviol - 1] = i;
        ldir[nviol - 1] = -1;
      } else if (element.lmax & CONSTRAINED && !(element.lmax & FDCL) && element.vmax > 0.0) {
        nviol++
        vflag[nviol - 1] = i;
        ldir[nviol - 1] = +1;
      }
    }
    console.log('nviol=',nviol,'vflag=',vflag,'ldir=',ldir);
    setNviol(nviol);
    setVflag(vflag);
    setLdir(ldir);
    return nviol;
  }

  const onNoop = () => { // No-op for onHide
    console.log('In ActionTrade.onNoop');
  }

//===========================================================
// Strategy Modal
//===========================================================

  const onStrategyDone = () => { // Option 3
    console.log('In ActionTrade.onStrategyDone');
    dispatch(restoreInputSymbolValues());
    var ncode;
    ncode = 'TRADE CANCELLED';
    dispatch(changeResultTerminationCondition(ncode));
    setStrategyShow(!strategyShow);
    return;
  }

  const onStrategyExisting = () => { // Option 2
    console.log('In ActionTrade.onStrategyExisting');
    var design;
    var element;
    var value;
    var ncode;
    design = store.getState().modelSlice;
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        value = element.cmin + element.vmin * element.smin * ldir[i];
        dispatch(changeSymbolConstraint(element.name, MIN, value));
      } else {
        value = element.cmax + element.vmax * element.smax * ldir[i];
        dispatch(changeSymbolConstraint(element.name, MAX, value));
      }
    }
    ncode = 'CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS';
    dispatch(changeResultTerminationCondition(ncode));
    setStrategyShow(!strategyShow);
    return;
  }

  const onStrategyArbitrary = () => { // Option 1
    console.log('In ActionTrade.onStrategyArbitrary');
    var design;
    var element;
    var dir = [];
    var isArbitraryInvalid = [];
    design = store.getState().modelSlice;
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        dir[i] = ldir[i] * element.vmin;
      } else {
        dir[i] = ldir[i] * element.vmax;
      }
      isArbitraryInvalid[i] = false;
    }
    setDir(dir);
    setIsArbitraryInvalid(isArbitraryInvalid);
    setArbitraryContinueDisabled(arbitraryContinueDisabled);
    setStrategyShow(!strategyShow); // Hide strategy
    setArbitraryShow(!arbitraryShow); // Show arbitrary
  }

  const onStrategyProportional = () => { // Option 0
    console.log('In ActionTrade.onStrategyProportional');
    var design;
    var element;
    var dir = [];
    design = store.getState().modelSlice;
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        dir[i] = ldir[i] * element.vmin;
      } else {
        dir[i] = ldir[i] * element.vmax;
      }
    }
    commonArbitraryOrProportional(dir);
    setStrategyShow(!strategyShow);
    setSizeShow(!sizeShow);
  }

  const onStrategyContextHelp = () => {
    console.log('In ActionTrade.onStrategyContextHelp');
    window.open('/docs/Help/trade.html', '_blank');
  }

  const commonArbitraryOrProportional = (dir) => {
    console.log('In ActionTrade.commonArbitraryOrProportional dir=',dir);
    /**
     * **** CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE
     * *****
     */
    var design;
    var element;
    var temp2;
    var value = 0.0;
    var itemp = 0;
    var temp;
    design = store.getState().modelSlice;
    for (let i = 0; i < nviol; i++) {
      temp2 = Math.abs(dir[i]);
      if (temp2 > value) {
        value = temp2;
        itemp = i;
      }
    }
    var tc = [];
    for (let i = 0; i < nviol; i++) {
      dir[i] = dir[i] / value;
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        tc[i] = element.cmin;
      } else {
        tc[i] = element.cmax;
      }
    }
    var rk1;
    var smallest;
    var biggest;
    var defaultEstPercent;
//          c1 = 0.0
    rk1 = design.model.result.objective_value;
    /* estimate best step size */
    smallest = Number.MAX_VALUE;
    biggest = Number.MIN_VALUE;
    for (let i = 0; i < nviol; i++) {
      temp2 = Math.abs(dir[i]);
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        if (temp2 > design.model.system_controls.smallnum) {
          temp = element.vmin / temp2;
        } else {
          temp = element.vmin;
        }
      } else {
        if (temp2 > design.model.system_controls.smallnum) {
          temp = element.vmax / temp2;
        } else {
          temp = element.vmax;
        }
      }
      if (temp > design.model.system_controls.smallnum && temp < smallest) {
        smallest = temp;
      }
      if (temp > biggest) {
        biggest = temp;
      }
    }
    let j = vflag[itemp];
    element = design.model.symbol_table[j];
    if (ldir[itemp] < 0) {
      defaultEstPercent = 90 * element.vmin; // 90% of vmin
    } else {
      defaultEstPercent = 90 * element.vmax; // 90% of vmax
    }
    if (defaultEstPercent / 100.0 < design.model.system_controls.smallnum) {
      defaultEstPercent = design.model.system_controls.smallnum * 100.0;
    }
    setDir(dir);
    setTc(tc);
    setRk1(rk1);
    setSmallest(smallest);
    setBiggest(biggest);
    setDefaultEstPercent(defaultEstPercent);
  }
//===========================================================
// Arbitrary Modal
//===========================================================

  const onArbitraryCancel = () => {
    console.log('In ActionTrade.onArbitraryCancel');
    dispatch(restoreInputSymbolValues());
    var ncode;
    ncode = 'TRADE CANCELLED';
    dispatch(changeResultTerminationCondition(ncode));
    setArbitraryShow(!arbitraryShow); // Hide arbitrary show
    return;
  }

  const onArbitraryContinue = () => {
    console.log('In ActionTrade.onArbitraryContinue');
    commonArbitraryOrProportional(dir);
    setArbitraryShow(!arbitraryShow); // Hide arbitrary
    setSizeShow(!sizeShow); // Show size
  }

  const onArbitraryChangeValid = (i, event) => {
    console.log('In ActionTrade.onArbitraryChangeValid i=',i,' event.target.value=',event.target.value);
    var design;
    design = store.getState().modelSlice;
    var dir = ldir.map((element, index) => {
      var value;
      if (index === i) {
        value = element * parseFloat(event.target.value);
//                console.log('i1=',i,' element=',element,' index=',index,' value=',value);
      } else {
        value = dir[index];
//                console.log('i2=',i,' element=',element,' index=',index,' value=',value);
      }
      return value;
    });
//        console.log('In ActionTrade.onArbitraryChangeValid dir=',dir);
    var greatestValue = dir.reduce((previousValue, currentValue) => { return Math.abs(currentValue) > previousValue ? Math.abs(currentValue) : previousValue }, 0.0);
//        console.log('In ActionTrade.onArbitraryChangeValid greatestValue=',greatestValue);
    var isArbitraryInvalid = isArbitraryInvalid.map((element, index) => {
      if (index === i) {
        return false;
      } else {
        return element;
      }
    });
//        console.log('In ActionTrade.onArbitraryChangeValid isArbitraryInvalid=',isArbitraryInvalid);
    var notAllArbitraryValid = isArbitraryInvalid.reduce((previousValue, currentValue) => { return previousValue || currentValue }, false);
//        console.log('In ActionTrade.onArbitraryChangeValid notAllNumbers=',notAllArbitraryValid);
    var arbitraryContinueDisabled = greatestValue < design.model.system_controls.smallnum || notAllArbitraryValid;
//        console.log('In ActionTrade.onArbitraryChangeValid arbitraryContinueDisabled=',arbitraryContinueDisabled);
    setDir(dir);
    setIsArbitraryInvalid(isArbitraryInvalid);
    setArbitraryContinueDisabled(arbitraryContinueDisabled);
  }

  const onArbitraryChangeInvalid = (i, event) => {
    console.log('In ActionTrade.onArbitraryChangeInvalid i=',i,' event.target.value=',event.target.value);
    var design;
    design = store.getState().modelSlice;
    var greatestValue = dir.reduce((previousValue, currentValue) => { return Math.abs(currentValue) > previousValue ? Math.abs(currentValue) : previousValue }, 0.0);
//        console.log('In ActionTrade.onArbitraryChangeInvalid greatestValue=',greatestValue);
    var isArbitraryInvalid = isArbitraryInvalid.map((element, index) => {
      if (index === i) {
        return true;
      } else {
        return element;
      }
    });
//        console.log('In ActionTrade.onArbitraryChangeInvalid isArbitraryInvalid=',isArbitraryInvalid);
    var notAllArbitraryValid = isArbitraryInvalid.reduce((previousValue, currentValue) => { return previousValue || currentValue }, false);
//        console.log('In ActionTrade.onArbitraryChangeInvalid notAllNumbers=',notAllArbitraryValid);
    var arbitraryContinueDisabled = greatestValue < design.model.system_controls.smallnum || notAllArbitraryValid;
//        console.log('In ActionTrade.onArbitraryChangeInvalid arbitraryContinueDisabled=',arbitraryContinueDisabled);
    setIsArbitraryInvalid(isArbitraryInvalid);
    setArbitraryContinueDisabled(arbitraryContinueDisabled);
  }
//===========================================================
// Size Modal
//===========================================================

  const onSizeCancel = () => {
    console.log('In ActionTrade.onSizeCancel');
    dispatch(restoreInputSymbolValues());
    var ncode;
    ncode = 'TRADE CANCELLED';
    dispatch(changeResultTerminationCondition(ncode));
    setSizeShow(!sizeShow);
    return;
  }

  const onSizeContinue = () => {
    console.log('In ActionTrade.onSizeContinue');
    var design;
    var element;
    var c2;
    var c3;
    var rk3;
    var value;
    design = store.getState().modelSlice;
    c3 = defaultEstPercent / 100.0; // Convert from percent to actual value
// TAKE FIRST EXPLORATORY RELAXATION STEP
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        value = element.cmin + dir[i] * element.cmin * c3;
        dispatch(changeSymbolConstraint(element.name, MIN, value));
      } else {
        value = element.cmax + dir[i] * element.cmax * c3;
        dispatch(changeSymbolConstraint(element.name, MAX, value));
      }
    }
    design = store.getState().modelSlice;
    if (design.model.result.objective_value > design.model.system_controls.objmin) {
      dispatch(search());
    }
    design = store.getState().modelSlice;
    if (design.model.result.objective_value <= design.model.system_controls.objmin) {
// Feasible was found, go show Feasible Modal
      setSizeShow(!sizeShow);
      setFeasibleShow(!feasibleShow);
      return;
    } else {
//            if (design.model.system_controls.ioopt > 1) {
//                console.log('TRIAL (FULL STEP) CONSTRAINTS:');
//                clister();
//            }
      rk3 = design.model.result.objective_value;
// MAKE SECOND EXPLORATORY STEP 1/2 WAY TO THE FIRST ONE
      c2 = c3 / 2.0;
      for (let i = 0; i < nviol; i++) {
        let j = vflag[i];
        element = design.model.symbol_table[j];
        if (ldir[i] < 0) {
          value = tc[i] + dir[i] * tc[i] * c2;
          dispatch(changeSymbolConstraint(element.name, MIN, value));
        } else {
          value = tc[i] + dir[i] * tc[i] * c2;
          dispatch(changeSymbolConstraint(element.name, MAX, value));
        }
      }
      dispatch(restoreInputSymbolValues());
      dispatch(search());
      design = store.getState().modelSlice;
      if (design.model.result.objective_value <= design.model.system_controls.objmin) {
// Feasible was found, go show Feasible Modal
        setSizeShow(!sizeShow);
        setFeasibleShow(!feasibleShow);
        return;
      }
      var c0;
      var rk2;
      var a;
      var b;
      var smc;
      var rk1ac;
      var rk2ab;
      var rk3bc;
      var capa;
      var capb;
      var capc;
      var arg;
//            if (design.model.system_controls.ioopt > 1) {
//                console.log('TRIAL (HALF STEP) CONSTRAINTS:');
//                clister();
//            }
      rk2 = design.model.result.objective_value;
      /** ******** QUADRATIC EXTRAPOLATION ****************************** */
      /* REFER TO THESIS FIGURE 4-2 */
      /* FOR THE CASE THAT C1 ^= 0 : */
      /* A=C1-C2; */
      /* SMC=C1-C3; */
      /* CAPB= C1*(RK2AB-RK3BC) -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC); */
      /* CAPC= C2*C3*RK1AC -C1*C3*RK2AB +C1*C2*RK3BC; */
      /* HOWEVER IN THIS CASE C1=0, SO TERMS DROP OUT */
      a = -c2;
      b = c2 - c3;
      smc = -c3;
      rk1ac = rk1 / (a * smc);
      rk2ab = rk2 / (a * b);
      rk3bc = rk3 / (b * smc);
      capa = rk1ac - rk2ab + rk3bc;
      capb = -c2 * (rk1ac + rk3bc) + c3 * (rk2ab - rk1ac);
      capc = rk1;
      arg = capb * capb - 4.0 * capa * capc;
      if (arg < 0.0) {
//                console.log('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.');
//                console.log('PARABOLA AXIS OF SYMMETRY:');
        c0 = -capb / (2.0 * capa);
      } else {
        /* TAKE SMALLER ROOT */
        c0 = (-capb - Math.sqrt(arg)) / (2.0 * capa);
        /** ******************************************************************* */
//                console.log('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:');
      }
      for (let i = 0; i < nviol; i++) {
        let j = vflag[i];
        element = design.model.symbol_table[j];
        if (ldir[i] < 0) {
          value = tc[i] + dir[i] * tc[i] * c0;
          dispatch(changeSymbolConstraint(element.name, MIN, value));
//                        console.log(element.name + ' MIN ' + value + ' ' + element.units);
        } else {
          value = tc[i] + dir[i] * tc[i] * c0;
          dispatch(changeSymbolConstraint(element.name, MAX, value));
//                        console.log(element.name + ' MAX ' + value + ' ' + element.units);
        }
      }
      design = store.getState().modelSlice;
      dispatch(search());
    }
    setSizeShow(!sizeShow);
    setEstablishShow(!establishShow);
  }

  const onSizeChangeValid = (event) => {
    console.log('In ActionTrade.onSizeChangeValid');
    setDefaultEst(parseFloat(event.target.value));
    setIsSizeInvalid(false);
  }

  const onSizeChangeInvalid = (event) => {
    console.log('In ActionTrade.onSizeChangeInvalid');
    setIsSizeInvalid(true);
  }
//===========================================================
// Feasible Modal
//===========================================================

  const onFeasibleRestart = () => {
    console.log('In ActionTrade.onFeasibleRestart');
    var design;
    var element;
    design = store.getState().modelSlice;
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        dispatch(changeSymbolConstraint(element.name, MIN, tc[i]));
      } else {
        dispatch(changeSymbolConstraint(element.name, MAX, tc[i]));
      }
    }
    dispatch(restoreInputSymbolValues());
    commonViolationSetup();
    commonArbitraryOrProportional(dir);
    setFeasibleShow(!feasibleShow);
    setSizeShow(!sizeShow);
  }

  const onFeasibleDone = () => {
    console.log('In ActionTrade.onFeasibleDone');
    setFeasibleShow(!feasibleShow);
    return;
  }
//===========================================================
// Establish Modal
//===========================================================

  const onEstablishAccept = () => {
    console.log('In ActionTrade.onEstablishAccept');
    var design;
    var ncode;
//        design = store.getState().modelSlice;
//        dispatch(search());
    design = store.getState().modelSlice; // Re-access store to get latest element values
    if (design.model.result.objective_value <= design.model.system_controls.objmin) {
      ncode = 'ACCEPTED TRADE RESULT';
      dispatch(changeResultTerminationCondition(ncode));
      setEstablishShow(!establishShow);
      return;
    }
    setEstablishShow(!establishShow);
    setNotFeasibleShow(!notFeasibleShow);
  }

  const onEstablishDone = () => {
    console.log('In ActionTrade.onEstablishDone');
    dispatch(restoreInputSymbolValues());
    var design;
    var element;
    var ncode;
    design = store.getState().modelSlice;
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        dispatch(changeSymbolConstraint(element.name, MIN, tc[i]));
      } else {
        dispatch(changeSymbolConstraint(element.name, MAX, tc[i]));
      }
    }
    dispatch(restoreInputSymbolValues());
    ncode = 'DECLINED TRADE RESULT';
    dispatch(changeResultTerminationCondition(ncode));
    setEstablishShow(!establishShow);
    return;
  }
//===========================================================
// Not Feasible Modal
//===========================================================

  const onNotFeasibleRestart = () => {
    console.log('In ActionTrade.onNotFeasibleRestart');
    var design;
    design = store.getState().modelSlice;
    var element;
    for (let i = 0; i < nviol; i++) {
      let j = vflag[i];
      element = design.model.symbol_table[j];
      if (ldir[i] < 0) {
        dispatch(changeSymbolConstraint(element.name, MIN, tc[i]));
      } else {
        dispatch(changeSymbolConstraint(element.name, MAX, tc[i]));
      }
    }
    dispatch(restoreInputSymbolValues());
    commonViolationSetup()
    setNotFeasibleShow(!notFeasibleShow);
    setStrategyShow(!strategyShow);
  }

  const onNotFeasibleRepeat = () => {
    console.log('In ActionTrade.onNotFeasibleRepeat');
//      dispatch(saveInputSymbolValues());
    commonViolationSetup()
    setNotFeasibleShow(!notFeasibleShow);
    setStrategyShow(!strategyShow);
  }

  const onNotFeasibleDone = () => {
    console.log('In ActionTrade.onNotFeasibleDone');
    var ncode;
    ncode = 'ACCEPTED TRADE RESULT';
    dispatch(changeResultTerminationCondition(ncode));
    setNotFeasibleShow(!notFeasibleShow);
  }
//    clister() {
//        var design;
//        var element;
//        design = store.getState().modelSlice;
//        console.log('CONSTRAINT                % VIOLATION           LEVEL');
//        for (let i = 0; i < nviol; i++) {
//            let j = vflag[i];
//            element = design.model.symbol_table[j];
//            if (ldir[i] < 0) {
//                console.log(element.name + ' MIN ' + element.vmin * 100.0 + ' ' + element.cmin + ' ' + element.units);
//            } else {
//                console.log(element.name + ' MAX ' + element.vmax * 100.0 + ' ' + element.cmax + ' ' + element.units);
//            }
//        }
//    }

  const list_constraints = () => {
    return (
      <Container>
        <Row>
          <Col className="text-start font-weight-bold align-middle" xs="3">Name</Col>
          <Col className="text-start font-weight-bold align-middle" xs="1"></Col>
          <Col className="text-end font-weight-bold align-middle" xs="3">Violation</Col>
          <Col className="text-end font-weight-bold align-middle" xs="3">Constraint</Col>
          <Col className="text-end font-weight-bold align-middle" xs="2">Units</Col>
        </Row>
        {
          vflag.map((j, i) => {
            var design;
            var element;
            var constraint_class;
            design = store.getState().modelSlice;
            element = design.model.symbol_table[j];
            if (ldir[i] < 0) {
//                                console.log(element.name + ' MIN ' + element.vmin * 100.0 + ' ' + element.cmin + ' ' + element.units);
              if (design.model.result.objective_value < design.model.system_controls.objmin) {
                constraint_class = (element.lmin & CONSTRAINED && element.vmin > 0.0) ? 'text-low-danger align-middle text-end' : 'text-end';
              } else {
                constraint_class = (element.lmin & CONSTRAINED && element.vmin > 0.0) ? 'text-danger align-middle text-end font-weight-bold' : 'text-end';
              }
              return (
                <Row key={element.name}>
                  <Col className="align-middle text-start" xs="3">{element.name}</Col>
                  <Col className="align-middle text-start" xs="1">MIN</Col>
                  <Col className="align-middle text-end" xs="3">{(element.vmin * 100.0).toFixed(1)}%</Col>
                  <Col className={constraint_class} xs="3">{element.cmin.toFixed(4)}</Col>
                  <Col className="align-middle text-end" xs="2">{element.units}</Col>
                </Row>
              );
            } else {
//                                console.log(element.name + ' MAX ' + element.vmax * 100.0 + ' ' + element.cmax + ' ' + element.units);
              if (design.model.result.objective_value < design.model.system_controls.objmin) {
                constraint_class = (element.lmax & CONSTRAINED && element.vmax > 0.0) ? 'text-low-danger align-middle text-end' : 'text-end';
              } else {
                constraint_class = (element.lmax & CONSTRAINED && element.vmax > 0.0) ? 'text-danger align-middle text-end font-weight-bold' : 'text-end';
              }
              return (
                <Row key={element.name}>
                  <Col className="align-middle text-start" xs="3">{element.name}</Col>
                  <Col className="align-middle text-start" xs="1">MAX</Col>
                  <Col className="align-middle text-end" xs="3">{(element.vmax * 100.0).toFixed(1)}%</Col>
                  <Col className={constraint_class} xs="3">{element.cmax.toFixed(4)}</Col>
                  <Col className="align-middle text-end" xs="2">{element.units}</Col>
                </Row>
              );
            }
          })
        }
      </Container>
    );
  }

  var design;
  design = store.getState().modelSlice;

  var display_search_button;
  if (objective_value > objmin) {
    display_search_button = true;
  } else {
    display_search_button = false;
  }

  return (
    <>
      <NavDropdown.Item onClick={strategyToggle} disabled={!display_search_button}>
        Trade&hellip;
      </NavDropdown.Item>
      {/*==================================================*/}
      {/*=====================strategy=====================*/}
      {/*==================================================*/}
      {strategyShow && <Modal show={strategyShow} size="lg" onHide={onStrategyDone}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Trade : Strategy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Specify your trade strategy:<br />
          <ul>
            <li>Help - View Trade information in a new tab</li>
            <li>Proportional - relax constraints in proportion to their current violation</li>
            <li>Arbitrary - relax constraints in a specified ratio</li>
            <li>Existing - relax constraints to the point of the existing violations</li>
            <li>Done - return to main page</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={onStrategyContextHelp}>Help</Button>{' '}
          <Button variant="secondary" onClick={onStrategyDone}> &nbsp; Done &nbsp; </Button>{' '}
          <Button variant="secondary" onClick={onStrategyExisting}>Existing</Button>{' '}
          <Button variant="info" onClick={onStrategyArbitrary}>Arbitrary</Button>{' '}
          <Button variant="primary" onClick={onStrategyProportional}>Proportional</Button>
        </Modal.Footer>
      </Modal>}
      {/*==================================================*/}
      {/*=====================arbitrary====================*/}
      {/*==================================================*/}
      {arbitraryShow && <Modal show={arbitraryShow} onHide={onNoop}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Trade : Arbitrary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="text-start font-weight-bold align-middle" xs="4">Name</Col>
              <Col className="text-start font-weight-bold align-middle" xs="2"></Col>
              <Col className="text-end font-weight-bold align-middle" xs="6">Weight</Col>
            </Row>
            {
              vflag.map((j, i) => {
                var design;
                var element;
                var dname;
                design = store.getState().modelSlice;
                element = design.model.symbol_table[j];
                dname = element.name;
                return (
                  <Row key={dname}>
                    <Col className="align-middle text-start" xs="4">{dname}</Col>
                    <Col className="align-middle text-start" xs="2">{ldir[i] < 0 ? 'MIN' : 'MAX'}</Col>
                    <Col className="align-middle text-end" xs="6">
                      <FormControlTypeNumber value={Math.abs(dir[i])} onChangeValid={(event) => { onArbitraryChangeValid(i, event) }} onChangeInvalid={(event) => { onArbitraryChangeInvalid(i, event) }} />
                    </Col>
                  </Row>
                );
              })
            }
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onArbitraryCancel}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onArbitraryContinue} disabled={arbitraryContinueDisabled}>Continue</Button>
        </Modal.Footer>
      </Modal>}
      {/*==================================================*/}
      {/*=======================size=======================*/}
      {/*==================================================*/}
      {sizeShow && <Modal show={sizeShow} onHide={onNoop}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Trade : Size
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter local exploration step size (%)<br />
          Possibilities range from {(90.0 * smallest).toFixed(2)} to {(100.0 * biggest).toFixed(2)}<br />
          <InputGroup>
            <InputGroup.Text>
              Default
            </InputGroup.Text>
            <FormControlTypeNumber value={defaultEstPercent} onChangeValid={onSizeChangeValid} onChangeInvalid={onSizeChangeInvalid} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onSizeCancel}>Cancel</Button>{' '}
          <Button variant="primary" disabled={isSizeInvalid || defaultEstPercent / 100.0 < design.model.system_controls.smallnum} onClick={onSizeContinue}>Continue</Button>
        </Modal.Footer>
      </Modal>}
      {/*==================================================*/}
      {/*=====================feasible=====================*/}
      {/*==================================================*/}
      {feasibleShow && <Modal show={feasibleShow} onHide={onNoop}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Trade : Feasible
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A feasible point has been established.<br />
          <ul>
            <li>Done - To return with these constraints</li>
            <li>Resize - Enter a smaller local exploration step size</li>
          </ul>
          {list_constraints()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onFeasibleRestart}>Resize</Button>{' '}
          <Button variant="primary" onClick={onFeasibleDone}> &nbsp; Done &nbsp; </Button>
        </Modal.Footer>
      </Modal>}
      {/*==================================================*/}
      {/*=====================establish====================*/}
      {/*==================================================*/}
      {establishShow && <Modal show={establishShow} onHide={onNoop}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Trade : Establish
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you wish to establish this set of constraints?
          <ul>
            <li>Accept - establish this set of constraints</li>
            <li>Done - Return to the main page with previously established constraints</li>
          </ul>
          {list_constraints()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onEstablishDone}> &nbsp; Done &nbsp; </Button>{' '}
          <Button variant="primary" onClick={onEstablishAccept}>Accept</Button>
        </Modal.Footer>
      </Modal>}
      {/*==================================================*/}
      {/*====================notFeasible===================*/}
      {/*==================================================*/}
      {notFeasibleShow && <Modal show={notFeasibleShow} onHide={onNoop}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Trade : Not Feasible
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The result is not feasible: obj = {parseFloat(design.model.result.objective_value).toFixed(6)}<br />
          <ul>
            <li>Done &nbsp; - To return to the main page with these constraints</li>
            <li>Repeat - To repeat Trade with these constraints</li>
            <li>Restart - To restart Trade with the previously established constraints</li>
          </ul>
          {list_constraints()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onNotFeasibleRestart}>Restart</Button>{' '}
          <Button variant="secondary" onClick={onNotFeasibleRepeat}>Repeat</Button>{' '}
          <Button variant="primary" onClick={onNotFeasibleDone}> &nbsp; Done &nbsp; </Button>
        </Modal.Footer>
      </Modal>}
    </>
  );

}
