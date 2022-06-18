import { CONSTRAINED, FIXED } from '../actionTypes';

// Update Violations and Objective Value
export function pxUpdateObjectiveValue(p, x, store, merit, returnInvalid = true) {
    
    // Update Constraint Violations

//    console.log('<li>','@@@@@ Start pxUpdateObjectiveValue','</li><ul>');

    /*
     * The following section of code constructs the objective function from the
     * constraint violations, merit function, and state variable fix violations.
     * It is not problem dependent.
     */
    var element;
    var vmin;
    var vmax;
    var m_funct;
    var obj;
    var viol_sum;
    var ip;
    var pp;
    var ix;
    var xx;

    var design = store.getState(); // Re-access store to get latest element values
//    console.log('In pxUpdateObjectiveValue design=',design);

    // Determine if all numbers are valid (AKA no validtiy violations)
    obj = 0.0;
    ip = 0;
    ix = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            pp = p[ip++];
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                if (pp <= element.validmin || pp >= element.validmax) {
                    obj = Number.POSITIVE_INFINITY;
                    break;
                }
            }
        } else {
            xx = x[ix++];
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                if (xx <= element.validmin || xx >= element.validmax) {
                    obj = Number.POSITIVE_INFINITY;
                    break;
                }
            }
        }
    }

    // Determine all constraint violations
    viol_sum = 0.0;
    ip = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            vmin = 0.0;
            vmax = 0.0;
            pp = p[ip++];
            if (element.lmin & CONSTRAINED ) {
                vmin = (-pp + element.cmin) / element.smin;
//                console.log('<li>','p name=',element.name,' vmin=',vmin,' value=',pp,' cmin=',element.cmin,' smin=',element.smin,'</li>');
            }
            if (element.lmax & CONSTRAINED ) {
                vmax = ( pp - element.cmax) / element.smax;
//                console.log('<li>','p name=',element.name,' vmax=',vmax,' value=',pp,' cmax=',element.cmax,' smax=',element.smax,'</li>');
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
            }
        }
    }
    ix = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && !element.input) {
            vmin = 0.0;
            vmax = 0.0;
            xx = x[ix++];
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             * 
             * This version reduces penalty of large fix violations.
             */
            if (element.lmin & FIXED) {
                vmin = (-xx + element.cmin) / element.smin;
                vmax = -vmin;
                if (vmin > 1.0) {
                    viol_sum = viol_sum + vmin;
                } else if (vmin < -1.0) {
                    viol_sum = viol_sum - vmin;
                } else {
                    viol_sum = viol_sum + vmin * vmin;
                }
            } else {
                if (element.lmin & CONSTRAINED ) {
                    vmin = (-xx + element.cmin) / element.smin;
//                    console.log('<li>','x name=',element.name,' vmin=',vmin,' value=',xx,' cmin=',element.cmin,' smin=',element.smin,'</li>');
                }
                if (element.lmax & CONSTRAINED ) {
                    vmax = ( xx - element.cmax) / element.smax;
//                    console.log('<li>','x name=',element.name,' vmax=',vmax,' value=',xx,' cmax=',element.cmax,' smax=',element.smax,'</li>');
                }
                if (vmin > 0.0) {
                    viol_sum = viol_sum + vmin * vmin;
                }
                if (vmax > 0.0) {
                    viol_sum = viol_sum + vmax * vmax;
                }
            }
        }
    }

    if (obj === 0.0) { // No validity violation found, return constraint based objective value
        /* Merit Function */
        if (merit && typeof merit === 'function') {
            m_funct = merit(p, x, design);
        } else {
            m_funct = 0.0;
        }

        // Update objective value
        obj = design.model.system_controls.viol_wt * viol_sum + m_funct;
//        console.log('Returning valid obj=',obj);
    } else { // Validity violation found
        if (returnInvalid) {
//            console.warn('@@@ Returning invalid obj=',obj);
        } else {
            /* Merit Function */
            if (merit && typeof merit === 'function') {
                m_funct = merit(p, x, design);
            } else {
                m_funct = 0.0;
            }

            // Update objective value
            obj = design.model.system_controls.viol_wt * viol_sum + m_funct;
//            console.warn('Returning invalid obj=',obj);
        }
    }

//    console.log('</ul><li>','@@@@@ End pxUpdateObjectiveValue obj=',obj,'</li>');

    return obj;
}