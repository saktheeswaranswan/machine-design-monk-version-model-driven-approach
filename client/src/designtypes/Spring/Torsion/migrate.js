import { displayMessage } from '../../../components/MessageModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { CONSTRAINED, FIXED } from '../../../store/actionTypes';

export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set its version to the new one.
     * Also update load.sql and set its version to the new one.
     */
//    console.log('In migrate design=',design);

    var previous_version = design.version;
    var migrated_design = design; // Assume no-op as default 

    /* eslint-disable no-fallthrough */
//    console.log('In migrate design.version=',design.version);
    switch(design.version) {
    case '1':
        // console.log('Convert from 1 to 2');
        design.system_controls.show_units = 1; // Add show_units to system_controls
        design.system_controls.show_violations = 1; // Add show_violations to system_controls
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (!element.equationset) { // That is a Calculation Input
                if (element.name === "Spring_Type") { // And it is Spring_Type
                    element.input = false; // Force it to be output
                } else {
                    element.input = !element.input; // Flip the input boolean value
                }
            }
            if (element.type !== undefined && element.type === "table") {
                element.format = "table";
                delete element.type;
            }
            if (element.equationset) {
                element.type = "equationset";
                delete element.equationset;
            } else {
                element.type = "calcinput";
                delete element.equationset;
            }
        });
        // Re-order elements for improved consistency, grouping
        // Note that index values come from symbol_table_offsets.js not offsets.js
        design.symbol_table.splice(46,0,design.symbol_table[36]);
        design.symbol_table.splice(36,1);
        migrated_design.version = '2'; // last thing... set the migrated model version
    case '2':
        // console.log('Convert from 2 to 3');
        design.symbol_table[24].tooltip = "Factor of safety to achieve the target cycle life category. See on-line Help.";
        design.symbol_table[25].tooltip = "Rough estimate of the average number of cycles to failure. See on-line Help.";
        migrated_design.version = '3'; // last thing... set the migrated model version
    case '3':
        // console.log('Convert from 3 to 4');
        design.symbol_table[25].sdlim = 10000; 
        // Add Energy calculation
        design.symbol_table.splice(27,0,Object.assign({},design.symbol_table[25]));  //  Duplicate Cycle_Life in target position
        design.symbol_table[27].name = 'Energy'; // Rename it to Energy
        design.symbol_table[27].value = 0.0; 
        if (design.symbol_table[0].units === 'mm') { // Check for metric units - is there a better approach?
            design.symbol_table[27].value = 0.0; 
            design.symbol_table[27].units = 'N-mm';
            design.symbol_table[27].lmin = 0; 
            design.symbol_table[27].lmax = 0; 
            design.symbol_table[27].cmin = 1.0; 
            design.symbol_table[27].cmax = 1000000; 
        } else {
            design.symbol_table[27].value = 0.0; 
            design.symbol_table[27].units = 'in-lb';
            design.symbol_table[27].lmin = 0; 
            design.symbol_table[27].lmax = 0; 
            design.symbol_table[27].cmin = 1.0; 
            design.symbol_table[27].cmax = 1000000; 
        }
        design.symbol_table[27].sdlim = 0.0; 
        design.symbol_table[27].tooltip = "Change in elastic potential energy between 1 and 2";
        migrated_design.version = '4'; // last thing... set the migrated model version
    case '4':
//        console.log('Convert from 4 to 5');
        design['jsontype'] = "ODOP"; // Add in model type
        if (design.symbol_table[0].units === "inches") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
//            console.log('In migrate.propgate element=',element);
            // ***************************************************************
            // Note no need to migrate FDCL because there has never been any
            // FDCL definition in initialState for TORSION. The user cannot create 
            // FDCL if it is not already configured in initialState.
            // ***************************************************************
            if (element.lmin & FIXED || element.lmax & FIXED) { // If one is FIXED
                element.lmin |= FIXED; // Set them both fixed because they are paired
                element.lmax |= FIXED;
                if (element.oldlmin === undefined) {
//                    console.log('In migrate create oldlmin element=',element);
                    element.oldlmin = element.lmin & ~FIXED; // with FIXED turned off
                }
                if (element.oldcmin === undefined) {
//                    console.log('In migrate create oldcmin element=',element);
                    element.oldcmin = element.cmin;
                }
                if (element.oldlmax === undefined) {
//                    console.log('In migrate create oldlmax element=',element);
                    element.oldlmax = element.lmax & ~FIXED; // with FIXED turned off
                }
                if (element.oldcmax === undefined) {
//                    console.log('In migrate create oldcmax element=',element);
                    element.oldcmax = element.cmax;
                }
            } else { // Get rid of remnants of non-FIXED elements
                if (element.oldlmin !== undefined) {
//                    console.log('In migrate delete oldlmin element=',element);
                    delete element.oldlmin;
                }
                if (element.oldcmin !== undefined) {
//                    console.log('In migrate delete oldcmin element=',element);
                    delete element.oldcmin;
                }
                if (element.oldlmax !== undefined) {
//                    console.log('In migrate delete oldlmax element=',element);
                    delete element.oldlmax;
                }
                if (element.oldcmax !== undefined) {
//                    console.log('In migrate delete oldcmax element=',element);
                    delete element.oldcmax;
                }
            }
            if (element.oldvalue !== undefined) {
//                console.log('In migrate delete oldvalue element=',element);
                delete element.oldvalue
            }
        });
        // Add %_Safe_Deflect calculation; make it constrained to a max of 95%
        design.symbol_table.splice(26,0,Object.assign({},design.symbol_table[26]));  //  Duplicate Force_Arm_2 in target position
        design.symbol_table[26].name = '%_Safe_Deflect'; // Rename it to %_Safe_Deflect
        design.symbol_table[26].value = 0.0; 
        if (design.symbol_table[0].units === 'mm') { // Check for metric units - is there a better approach?
            design.symbol_table[26].units = '%';
            design.symbol_table[26].lmin = 0; 
            design.symbol_table[26].lmax = CONSTRAINED; 
            design.symbol_table[26].cmin = 1.0; 
            design.symbol_table[26].cmax = 95; 
        } else {
            design.symbol_table[26].units = '%';
            design.symbol_table[26].lmin = 0; 
            design.symbol_table[26].lmax = CONSTRAINED; 
            design.symbol_table[26].cmin = 1.0; 
            design.symbol_table[26].cmax = 95; 
        }
        delete design.symbol_table[26].oldlmin;
        delete design.symbol_table[26].oldlmax;
        delete design.symbol_table[26].oldcmin;
        delete design.symbol_table[26].oldcmax;
        design.symbol_table[26].sdlim = 0.0; 
        design.symbol_table[26].tooltip = "Deflection of load point 2 as a percent of total safe deflection";
        migrated_design.version = '5'; // last thing... set the migrated model version
    case '5':
        // console.log('Convert from 5 to 6');
        design.system_controls.enable_auto_fix = 1;

        design.labels[4].name = 'City, State & Zip';
        if (design.labels[4].value !== '' && design.labels[5].value !== '') {
            design.labels[4].value = design.labels[4].value + ', ' + design.labels[5].value;
        // } else if (design.labels[4].value !== '' && design.labels[5].value === '') {
        //    design.labels[4].value = design.labels[5].value; // Unknown State & Zip
        } else if (design.labels[4].value === '' && design.labels[5].value !== '') {
            design.labels[4].value = design.labels[5].value; // Unknown City
        } else if (design.labels[4].value === '' && design.labels[5].value === '') {
            design.labels[4].value = ''; // Unknown City, Unknown State & Zip
        }
        design.labels[5].name = 'Phone & email';
        design.labels[5].value = design.labels[6].value;
        design.labels[6].name = 'Date';
        design.labels[6].value = design.labels[7].value;
        design.labels[7].name = 'Part Number';
        design.labels[7].value = design.labels[8].value;
        design.labels[8].name = 'Data Source';
        design.labels[8].value = 'print     sample      verbal';
        design.labels[9].name = 'Mandril';
        for (let i = 10; i <= 21; i++) {
            design.labels.push(Object.assign({},design.labels[1]));
            design.labels[i].value = '';
        }
        design.labels[10].name = 'Wind';
        design.labels[10].value = 'rh lh opt';
        design.labels[11].name = 'Relative end pos. & tol.';
        design.labels[12].name = 'Shot peen';
        design.labels[12].value = 'yes no; details';
        design.labels[13].name = 'Stress relieve/HT';
        design.labels[14].name = 'Finish';
        design.labels[14].value = design.labels[9].value;
        design.labels[9].value = '';
        design.labels[15].name = 'End use';
        design.labels[16].name = 'Operating temp';
        design.labels[17].name = 'Special notes & tol';
        design.labels[18].name = 'Customer approval';
        design.labels[18].value = '__________________________ ';
        design.labels[19].name = 'Customer date';
        design.labels[19].value = ' _______ ';
        design.labels[20].name = 'Vendor approval';
        design.labels[20].value = '__________________________ ';
        design.labels[21].name = 'Vendor date';
        design.labels[21].value = ' _______ ';
        
        migrated_design.version = '6'; // last thing... set the migrated model version
    case '6':
        // Current model version
        // console.log('Convert from 6 to 7');
        // #625 Repair design library problems created by unwanted v4.1 migrate in v4.2 Migrate
//        console.log('Before: design=',design);
        var contactPersonFound = false; // Start by marking that we haven't found the first "Contact person"
        design.labels.find((label, index) => {
//            console.log('label=',label);
            if (label.name === "Contact person") {
                if (!contactPersonFound) {
                    contactPersonFound = true; // Mark we found the first "Contact person"
                    return false; // So far we haven't found the second "Contact person"
                } else {
                    design.labels.splice(index); // Delete from this "Contact person" to the end
                    return true; // All done, we found the second "Contact person"
                }
            } else {
                return false; // This is not a "Contact person"
            }
        });
        // #589 Changes in initialState: remove ioclass; sdlimit mods to support #452
        // Remove ioclass from all Symbol Table entries
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
                delete element.ioclass;
        });
        // #609 Add standard size table for metric Outside Diameters
        // Update Material_Type = 31 table and Material_File = 36 value
        console.log('Material_File.value=',design.symbol_table[36].value,'Material_Type.table=',design.symbol_table[31].table)
        if (design.symbol_table[31].table === 'Spring/mat_SI') {
          design.symbol_table[31].table = 'Spring/mat_metric';
        } else {
          design.symbol_table[31].table = 'Spring/mat_us';
        }
        if (design.symbol_table[36].value === 'mat_SI.json') {
          design.symbol_table[36].value = 'mat_metric.json';
        } else {
          design.symbol_table[36].value = 'mat_us.json';
        }
//        console.log('After: design=',design);
        migrated_design.version = '7'; // last thing... set the migrated model version
    case '7':
        // Current model version
        // console.log('Convert from 7 to 8');
        // To be defined - presently do nothing
        // migrated_design.version = '8'; // last thing... set the migrated model version

        break; // Do not copy this break
    default: // Unknown
        displayMessage('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
        return migrated_design;
    }
    if (previous_version !== migrated_design.version) {
        displayMessage("Migrated design from version " + previous_version + " to version " + migrated_design.version,'info');
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
