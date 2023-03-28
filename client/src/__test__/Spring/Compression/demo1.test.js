import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         search } from '../../../store/actionCreators';
import { reducers } from '../../../store/reducers';
import { dispatcher } from '../../../store/middleware/dispatcher';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';

// This is a mapping of the demo1 execute file to an equivalent test case file

it('demo1', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    design = store.getState();
    expect(design.model.result.objective_value).toEqual(0.0);

    // title: "Session Now In Progress",
    // No-op

    store.dispatch( loadInitialState("Spring/Compression","US") );
    store.dispatch( changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demo1"}]) );
    design = store.getState();
    expect(design.model.result.objective_value).toEqual(0.0);
    
     // Page 02 of 11
     // Page 03 of 11
     // Page 04 of 11
    // No-op

     // Page 05 of 11
    store.dispatch( fixSymbolValue("OD_Free",0.925) );
    store.dispatch( fixSymbolValue("L_Free",1.713) );
    store.dispatch( fixSymbolValue("Force_2",50) );
    store.dispatch( fixSymbolValue("L_2",1.278) );
    store.dispatch( setSymbolFlag("L_Solid",MAX,CONSTRAINED) );
    store.dispatch( changeSymbolConstraint("L_Solid",MAX,1.06) );
    store.dispatch( changeSymbolValue("Material_Type",3) );
    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(2.7011747,7);

     // Page 06 of 11
    store.dispatch( changeSymbolConstraint("FS_2",MIN,2) );

     // Page 07 of 11
    store.dispatch( search() );
    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000032,7);

     // Page 08 of 11
    store.dispatch(fixSymbolValue("Wire_Dia",0.125)); // Simulate Action: Select Size...
    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000408,7);

     // Page 09 of 11
    store.dispatch( search() );
    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000099,7);

     // Page 10 of 11
    // No-op

     // Page 11 of 11
    store.dispatch( fixSymbolValue("Force_2",75.1) );
    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0650272,7);

});

