import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { changeSymbolValue } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { invokeInit } from '../store/middleware/invokeInit';

//=====================================================================
// invokeInit
//=====================================================================

it('invokeInit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state});

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));

    invokeInit(store);

    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("6");

//    expect(Object.entries(design.model.symbol_table)[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(Object.entries(design.model.symbol_table)[sto.PRESSURE].value).toEqual(500);
//    expect(Object.entries(design.model.symbol_table)[sto.RADIUS].name).toEqual("RADIUS");
    expect(Object.entries(design.model.symbol_table)[sto.RADIUS].value).toEqual(0.4);
//    expect(Object.entries(design.model.symbol_table)[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(Object.entries(design.model.symbol_table)[sto.THICKNESS].value).toEqual(0.04);
//    expect(Object.entries(design.model.symbol_table)[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(Object.entries(design.model.symbol_table)[sto.FORCE].value).toEqual(123);
//    expect(Object.entries(design.model.symbol_table)[sto.AREA].name).toEqual("AREA");
    expect(Object.entries(design.model.symbol_table)[sto.AREA].value).toEqual(456);
//    expect(Object.entries(design.model.symbol_table)[sto.STRESS].name).toEqual("STRESS");
    expect(Object.entries(design.model.symbol_table)[sto.STRESS].value).toEqual(789);

    expect(design.model.system_controls.ioopt.value).toEqual(3);
    expect(design.model.system_controls.maxit.value).toEqual(100);
    expect(design.model.system_controls.weapon.value).toEqual(1);
    expect(design.model.system_controls.nmerit.value).toEqual(1);
    expect(design.model.system_controls.fix_wt.value).toEqual(1.5);
    expect(design.model.system_controls.con_wt.value).toEqual(1.0);
    expect(design.model.system_controls.zero_wt.value).toEqual(10.0);
    expect(design.model.system_controls.viol_wt.value).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt.value).toEqual(0.01);
    expect(design.model.system_controls.objmin.value).toEqual(0.00005);
    expect(design.model.system_controls.del.value).toEqual(1.0);
    expect(design.model.system_controls.delmin.value).toEqual(0.0001);
    expect(design.model.system_controls.tol.value).toEqual(0.0001);
    expect(design.model.system_controls.smallnum.value).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units.value).toEqual(1);
    expect(design.model.system_controls.show_violations.value).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0);
    expect(design.model.result.termination_condition).toEqual("");
    expect(design.model.result.violated_constraint_count).toEqual(0);
});