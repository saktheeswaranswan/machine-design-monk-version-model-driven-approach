import { CONSTRAINED } from '../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "L_Free",
            "value": 80.00,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.5,
            "cmax": 400.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Length in free (no load) condition",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_1",
            "value": 50.0,
            "units": "newtons",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Minimum operating load (Length L_1)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_2",
            "value": 190.00,
            "units": "newtons",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.05,
            "cmax": 4000,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Maximum operating load (Length L_2)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Rate",
            "value": 4.758667,
            "units": "N/mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Spring rate (spring constant); slope of force-deflection curve",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 0.945643,
            "units": "mm",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 200.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Deflection from free to load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 37.825710,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 400.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Deflection from free to load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_1",
            "value": 79.05436,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_2",
            "value": 42.17428,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 500.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 2",
            "type": "equationset",
            "hidden": false,
            "validminchoices": ["L_Solid"],
            "validminchoice": 0
        },
        {
            "input": false,
            "name": "L_Stroke",
            "value": 36.88007,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.2,
            "cmax": 400.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Length of stroke from point 1 to point 2",
            "type": "equationset",
            "hidden": false
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Hooke's Law default start point - Metric units ..."
        },
        {
            "name": "Contact person",
            "value": ""
        },
        {
            "name": "Company name",
            "value": ""
        },
        {
            "name": "Street",
            "value": ""
        },
        {
            "name": "City, State & Zip",
            "value": ""
        },
        {
            "name": "Phone & email",
            "value": ""
        },
        {
            "name": "Date",
            "value": ""
        },
        {
            "name": "Part Number",
            "value": ""
        },
        {
            "name": "Data Source",
            "value": "print     sample      verbal"
        },
        {
            "name": "Mandril",
            "value": ""
        },
        {
            "name": "Wind",
            "value": "rh lh opt"
        },
        {
            "name": "Shot peen",
            "value": "yes no; details"
        },
        {
            "name": "Stress relieve/HT",
            "value": ""
        },
        {
            "name": "Pre-set",
            "value": "no"
        },
        {
            "name": "Finish",
            "value": ""
        },
        {
            "name": "Squareness",
            "value": ""
        },
        {
            "name": "End use",
            "value": ""
        },
        {
            "name": "Fits in / Works over",
            "value": ""
        },
        {
            "name": "Operating temp",
            "value": ""
        },
        {
            "name": "Special notes & tol",
            "value": ""
        },
        {
            "name": "Customer approval",
            "value": "__________________________ "
        },
        {
            "name": "Customer date",
            "value": " _______ "
        },
        {
            "name": "Vendor approval",
            "value": "__________________________ "
        },
        {
            "name": "Vendor date",
            "value": " _______ "
        }
    ],
    "type": "Hookes-Law",
    "version": "1",
    "result": {
        "objective_value": 0,
        "termination_condition": "Use the File : Open menu item to select a different design type or units (US, metric)."
    },
    "jsontype": "ODOP",
    "units": "Metric"
};
