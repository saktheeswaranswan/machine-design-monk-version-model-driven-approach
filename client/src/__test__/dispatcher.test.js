import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED } from '../store/actionTypes';
import {
    startup,
    changeSymbolValue, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag,
    changeResultObjectiveValue,
    search, seek, 
    saveAutoSave, restoreAutoSave, deleteAutoSave } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

//=====================================================================
// STARTUP
//=====================================================================

it('middleware with startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(0);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(undefined);

    store.dispatch(startup());

    var design = store.getState(); // after
//  value=500, level=1500, sdlimit=0, status=1, stemp=1500
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(500); // updated
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(1500);
//  value=0.4, level=0, sdlimit=0, status=1, stemp=0.4
//  value=0.4, level=0.5, sdlimit=0, status=1, stemp=0.5
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.4);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(0.5);
//  value=0.04, level=0, sdlimit=0, status=1, stemp=0.04
//  value=0.04, level=0.05, sdlimit=0, status=1, stemp=0.05
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(0.04);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(0.05);
//  value=251.32741228718348, level=1000, sdlimit=0, status=1, stemp=1000
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(0);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(251.32741228718348); // updated
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(0.5026548245743669); // updated
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(0.5026548245743669); // updated
//  value=2500, level=3000, sdlimit=0, status=1, stemp=3000
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(2500); // updated
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(3000);
});

//=====================================================================
// DESIGN PARAMETERS
//=====================================================================

it('middleware change pressure design parameter value without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    store.dispatch(changeSymbolValue("PRESSURE", 5000));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(5000);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(2513.2741228718348);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.5026548245743669);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(25000);
});

it('middleware change radius design parameter value without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    store.dispatch(changeSymbolValue("RADIUS", 0.5));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(392.6990816987241);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7853981633974483);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3125);
});

it('middleware change thickness design parameter value without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    store.dispatch(changeSymbolValue("THICKNESS", 0.05));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(251.32741228718348);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.5026548245743669);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(2000);
});
//=====================================================================
// CONSTRAINTS
//=====================================================================

it('middleware change constraints to force all violations', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(0);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(undefined);

    // Set all constraints to cause violations
    store.dispatch(changeSymbolConstraint("PRESSURE", MIN,600));
    store.dispatch(changeSymbolConstraint("RADIUS", MIN, 0.5));
    store.dispatch(changeSymbolConstraint("THICKNESS", MIN, 0.05));
    store.dispatch(changeSymbolConstraint("FORCE", MIN, 10000));
    store.dispatch(changeSymbolConstraint("AREA", MIN, 0.5));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3000));

    store.dispatch(changeSymbolConstraint("PRESSURE", MAX, 400));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.3));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.03));
    store.dispatch(changeSymbolConstraint("FORCE", MAX, -10000));
    store.dispatch(changeSymbolConstraint("AREA", MAX, 0.4));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 2000));

    // Reset all flags
    store.dispatch(resetSymbolFlag("PRESSURE", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("RADIUS", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("THICKNESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("AREA", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(resetSymbolFlag("PRESSURE", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("RADIUS", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("THICKNESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("AREA", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));

    // Set all flags
    store.dispatch(setSymbolFlag("PRESSURE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("THICKNESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("AREA", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(setSymbolFlag("PRESSURE", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("RADIUS", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("THICKNESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("AREA", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
});

//=====================================================================
// SEARCH
//=====================================================================

it('middleware search1 from initial state', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(697.2108757363197);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5825642374486647);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05814850143495808);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(743.3642427191874);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0661971414805103);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3492.524417147412);
    expect(design.model.result.objective_value).toEqual(0.14664192222304165);
    expect(design.model.result.termination_condition).toEqual("DELMIN 12 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

it('middleware search2: initial state w/ single SV constraint modified', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1389.1186225065448);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4877369775989805);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.040000000000000056);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1038.1511075527435);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7473451804133828);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(8469.056480847505);
    expect(design.model.result.objective_value).toEqual(0.0);
    expect(design.model.result.termination_condition).toEqual("OBJMIN 7 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(0);
});

it('middleware search3: initial state w/ single DP FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("RADIUS", 0.444));
    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(972.4279315207291);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.444);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06000128769964651);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(602.2450480774055);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.6193210093580775);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3597.9061295858437);
    expect(design.model.result.objective_value).toEqual(0.2379406084611994);
    expect(design.model.result.termination_condition).toEqual("DELMIN 9 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(3);
});

it('middleware search4: initial state w/ single SV FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3500));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3500));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(750.4968399919907);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5744582590062994);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05745198212666806);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(778.0646709106514);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0367327741432661);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3752.0821052003944);
    expect(design.model.result.objective_value).toEqual(0.10531583651535117);
    expect(design.model.result.termination_condition).toEqual("DELMIN 15 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

it('middleware search5: initial state w/ 3 constraints modified', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 1200));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.4));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3200));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(962.044187410488);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.47955021080064064);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05993925712603883);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(695.0452267187616);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7224670506971189);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3848.4668895888885);
    expect(design.model.result.objective_value).toEqual(0.29720134447532803);
    expect(design.model.result.termination_condition).toEqual("DELMIN 8 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

it('middleware search6: initial state w/ 3 constraints modified further', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 2500));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.55));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3400));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(747.1742312566108);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.6601769508494637);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06031483281717521);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1023.0396666167936);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.3692116561571288);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4089.103647517854);
    expect(design.model.result.objective_value).toEqual(0.47279118427044764);
    expect(design.model.result.termination_condition).toEqual("DELMIN 13 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

it('middleware search7: initial state w/ 2 constraints modified, 1 SV FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 2500));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.55));
    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3800));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3800));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(766.5319070212193);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.6599935713499682);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06041228804212965);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1048.9614321530885);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.3684511010499278);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4187.112814828608);
    expect(design.model.result.objective_value).toEqual(0.44359387986703586);
    expect(design.model.result.termination_condition).toEqual("DELMIN 16 ITER.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

//=====================================================================
// SEEK
//=====================================================================

it('middleware seek1 min stress; feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(search());
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1254.3621931874964);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5025499901050051);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05031359856496264);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(995.2481203224017);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7934296216257505);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(6264.506274188985);
    expect(design.model.result.objective_value).toEqual(0.00004841950763854388);
    expect(design.model.result.termination_condition).toEqual("SEEK COMPLETED");
    expect(design.model.result.violated_constraint_count).toEqual(3);
});

it('middleware seek2 min stress; alt start pt, opened constraints, feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(565.157822733626);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7495610043125683);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06531967146069526);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(997.5475007697938);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7650777546433516);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3242.6699011968067);
    expect(design.model.result.objective_value).toEqual(0.00004572617379211771);
    expect(design.model.result.termination_condition).toEqual("SEEK COMPLETED");
    expect(design.model.result.violated_constraint_count).toEqual(2);
});

it('middleware seek3 min stress; infeasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(search());
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(697.2006127120937);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5825642374486647);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05814850143495808);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(743.3533003120947);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0661971414805103);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3492.473006786572);
    expect(design.model.result.objective_value).toEqual(0.14668027900694727);
    expect(design.model.result.termination_condition).toEqual("SEEK COMPLETED");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

it('middleware seek4 min pressure; alt start pt, opened constraints, feasible start; THICKNESS fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));
    store.dispatch(setSymbolFlag("THICKNESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(seek("PRESSURE", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(554.0657042936255);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7566964996102077);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.045);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(996.6773563197182);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7988432573901598);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4658.439766589454);
    expect(design.model.result.objective_value).toEqual(0.000047222529713772604);
    expect(design.model.result.termination_condition).toEqual("SEEK COMPLETED");
    expect(design.model.result.violated_constraint_count).toEqual(2);
});

it('middleware seek5 max force; alt start pt, opened constraints, feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(seek("FORCE", MAX));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1507.1078497754713);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.757090147294469);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.058360538073425804);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(2713.8722061594754);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.8007153280793988);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(9775.5824538458);
    expect(design.model.result.objective_value).toEqual(0.0004427903909232145);
    expect(design.model.result.termination_condition).toEqual("SEEK COMPLETED");
    expect(design.model.result.violated_constraint_count).toEqual(2);
});

it('middleware seek6 min stress; alt start pt, opened constraints, feasible start; force fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    var design = store.getState(); // after
    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));
    design = store.getState();
    store.dispatch(setSymbolFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("FORCE", MIN, design.model.symbol_table[sto.FORCE].value));
    store.dispatch(changeSymbolConstraint("FORCE", MAX, design.model.symbol_table[sto.FORCE].value));

//    design = store.getState();
//    store.dispatch(search());
    design = store.getState();
    store.dispatch(seek("STRESS", MIN));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(620.288526225231);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7529224268036674);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06530453483860871);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1104.699321666792);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7809443105282723);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3575.778800340361);
    expect(design.model.result.objective_value).toEqual(0.00001908478702508192);
    expect(design.model.result.termination_condition).toEqual("SEEK COMPLETED");
    expect(design.model.result.violated_constraint_count).toEqual(3);
});

//=====================================================================
// AUTO SAVE
//=====================================================================

it('middleware restore auto save', () => {
 var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
 const store = createStore(
     reducers,
     {model: state},
     applyMiddleware(dispatcher));
 store.dispatch(saveAutoSave());

 design = store.getState();
 store.dispatch(restoreAutoSave());

 var design = store.getState(); // after
//value=500, level=1500, sdlimit=0, status=1, stemp=1500
 expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
 expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
 expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
 expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(500); // updated
 expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(1500);
//value=0.4, level=0, sdlimit=0, status=1, stemp=0.4
//value=0.4, level=0.5, sdlimit=0, status=1, stemp=0.5
 expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
 expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
 expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
 expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.4);
 expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(0.5);
//value=0.04, level=0, sdlimit=0, status=1, stemp=0.04
//value=0.04, level=0.05, sdlimit=0, status=1, stemp=0.05
 expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
 expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
 expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
 expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(0.04);
 expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(0.05);
//value=251.32741228718348, level=1000, sdlimit=0, status=1, stemp=1000
 expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
 expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
 expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(0);
 expect(design.model.symbol_table[sto.FORCE].smin).toEqual(1000);
 expect(design.model.symbol_table[sto.FORCE].smax).toEqual(251.32741228718348); // updated
 expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
 expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
 expect(design.model.symbol_table[sto.AREA].cmax).toEqual(0);
 expect(design.model.symbol_table[sto.AREA].smin).toEqual(0.5026548245743669); // updated
 expect(design.model.symbol_table[sto.AREA].smax).toEqual(0.5026548245743669); // updated
//value=2500, level=3000, sdlimit=0, status=1, stemp=3000
 expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
 expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
 expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
 expect(design.model.symbol_table[sto.STRESS].smin).toEqual(2500); // updated
 expect(design.model.symbol_table[sto.STRESS].smax).toEqual(3000);

 expect(typeof(Storage)).not.toEqual("undefined");
 expect(localStorage.getItem('autosave')).not.toBeNull();
 
 store.dispatch(deleteAutoSave());
});
