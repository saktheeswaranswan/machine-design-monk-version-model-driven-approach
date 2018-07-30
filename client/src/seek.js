import { FIXED, OBJMIN, IOOPT, SMALLNUM, MFN_WT } from './globals';
import { MIN, MAX } from './actionTypes';
import { changeResultsTerminationCondition } from './actionCreators';
import { search } from './equationsMiddleware';
import { despak } from './despak';

// Seek
export function seek(store, action) {
    console.log("In seek", action);
    /***************************************************************************
     * sought - indicates parameter/variable in question; + for DP, - for SV
     * sdir - indicates direction of motion; + for max, - for min
     **************************************************************************/
    var SOUGHT = 0;
    var SDIR = 0;
    var design = store.getState(); // Re-access store to get latest dp and sv values
    console.log('SEEK:    OBJ =', design.results.objective_value);
    if (design.results.objective_value > OBJMIN && design.state_variables.length === 0) {
        console.log('NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.');
    }
    if (action.payload.minmax === MAX) {
        SDIR = +1;
    } else {
        SDIR = -1;
    }
    var found = false;
    var temp;
    var dname;
    var input;
    var ncode;
    for (let i = 0; !found && i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (dp.name.startsWith(action.payload.name)) {
            temp = dp.value;
            dname = dp.name;
            input = dp.units;
            if (dp.lmin & FIXED) {
                ncode = dname+' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.';
                store.dispatch(changeResultsTerminationCondition(ncode));
                SOUGHT = 0;
                SDIR = 0;
                return;
            }
            SOUGHT = (i + 1);
            found = true;
        }
    }
    for (let i = 0; !found && i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        if (sv.name.startsWith(action.payload.name)) {
            temp = sv.value;
            dname = sv.name;
            input = sv.units;
            if (sv.lmin & FIXED) {
                ncode = dname+' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.';
                store.dispatch(changeResultsTerminationCondition(ncode));
                SOUGHT = 0;
                SDIR = 0;
                return;
            }
            SOUGHT = -(i + 1);
            found = true;
        }
    }
    M_NUM = temp + 0.1 * SDIR * temp;
    // putest
    if (SOUGHT > 0) {
        temp = design.design_parameters[SOUGHT - 1].value;
    } else {
        temp = design.state_variables[-SOUGHT - 1].value;
    }
    console.log('THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
    console.log('THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
    // End putest
    if (IOOPT > 2) {
        console.log('ESTIMATING VALUE OF OPTIMUM ...');
    }
    // estopt
    M_NUM = temp + 0.1 * SDIR * temp;
    // ftest
    M_DEN = Math.abs(M_NUM) / MFN_WT;
    if (M_DEN < SMALLNUM) {
        M_DEN = 1.0;
    }
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    // End ftest
    // update
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        dp.oldvalue = dp.value; // TODO: Set Store
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        sv.oldvalue = sv.value; // TODO: Set Store
    }
    // End update
    search(store, -1.0);
    if (SOUGHT > 0) {
        M_NUM = design.design_parameters[SOUGHT - 1].value;
    } else {
        M_NUM = design.state_variables[-SOUGHT - 1].value;
    }
    // putest
    if (SOUGHT > 0) {
        temp = design.design_parameters[SOUGHT - 1].value;
    } else {
        temp = design.state_variables[-SOUGHT - 1].value;
    }
    console.log('THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
    console.log('THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
    // End putest
    // ftest
    M_DEN = Math.abs(M_NUM) / MFN_WT;
    if (M_DEN < SMALLNUM) {
        M_DEN = 1.0;
    }
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    // End ftest
    // End estopt
    if (design.results.objective_value < OBJMIN) {
        for (let i = 0; i < design.design_parameters.length; i++) {
            var dp = design.design_parameters[i];
            dp.value = dp.oldvalue; // TODO: Set Store
        }
    } else {
        // findfeas
        if (IOOPT > 2) {
            console.log('SEARCHING FOR A FEASIBLE START POINT ...');
        }
        var j = SOUGHT;
        SOUGHT = 0;
        search(store, OBJMIN);
        SOUGHT = j;
        // putest
        if (SOUGHT > 0) {
            temp = design.design_parameters[SOUGHT - 1].value;
        } else {
            temp = design.state_variables[-SOUGHT - 1].value;
        }
        console.log('THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
        console.log('THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
        // End putest
        // End findfeas
    }
    console.log('SEEKING OPTIMUM '+dname+' USING ESTIMATE OF: '+M_NUM+' '+input);
    // ftest
    M_DEN = Math.abs(M_NUM) / MFN_WT;
    if (M_DEN < SMALLNUM) {
        M_DEN = 1.0;
    }
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    var obj = despak(p);
    // End ftest
    // update
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        dp.oldvalue = dp.value; // TODO: Set Store
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        var sv = design.state_variables[i];
        sv.oldvalue = sv.value; // TODO: Set Store
    }
    // End update
    search(store, OBJMIN);
    if (IOOPT > 0) {
        ncode = 'Termination Condtion'; // TODO: Get Termination Condition from Store
        console.log('RETURN ON: '+ncode+'     OBJ ='+design.results.objective_value);
    }
    if (SOUGHT > 0) {
        var temp1 = design.design_parameters[SOUGHT - 1].value;
    } else {
        var temp1 = design.state_variables[-SOUGHT - 1].value;
    }
    console.log('CURRENT VALUE OF '+dname+' IS '+temp1+' '+input);
    if (design.results.objective_value < 0.0) {
        console.log('SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE OF THE OPTIMUM.');
    }
    SOUGHT = 0;
    SDIR = 0;
}
