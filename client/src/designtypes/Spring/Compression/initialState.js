import { CONSTRAINED, VALID_MIN, UNINITIALIZED } from '../../../store/actionTypes';
import * as o from './symbol_table_offsets';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "OD_Free",
            "value": 1.1,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Outside diameter in free (no load) condition",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": true,
            "name": "Wire_Dia",
            "value": 0.1055,
            "units": "inch",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.005,
            "cmax": 2.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Wire diameter",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": true,
            "name": "L_Free",
            "value": 3.25,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Length in free (no load) condition",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [o.L_1, o.L_2],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [o.L_1, o.L_2],
            }]
        },
        {
            "input": true,
            "name": "Coils_T",
            "value": 10.0,
            "units": "coils",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 40,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Total number of coils",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": true,
            "name": "Force_1",
            "value": 10.0,
            "units": "pounds",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 50,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Minimum operating load (Length L_1)",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [o.Deflect_1],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [o.Deflect_1],
            }]
        },
        {
            "input": true,
            "name": "Force_2",
            "value": 39.0,
            "units": "pounds",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.01,
            "cmax": 1000,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Maximum operating load (Length L_2)",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [o.Deflect_2],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [o.Deflect_2],
            }]
        },
        {
            "input": false,
            "name": "Mean_Dia",
            "value": 0.9945,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.1,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Average of inside and outside diameters",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Coils_A",
            "value": 8.0,
            "units": "coils",
            "lmin": CONSTRAINED|UNINITIALIZED,
            "lmax": CONSTRAINED|UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 50.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Number of Active coils",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Rate",
            "value": 22.6315,
            "units": "Lb/In",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring rate (spring constant); slope of force-deflection curve",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [o.Deflect_1, o.Deflect_2],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [o.Deflect_1, o.Deflect_2],
            }]
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 0.04,
            "units": "inches",
            "lmin": CONSTRAINED|UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.0,
            "cmax": 20.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "Deflection from free to load point 1",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [o.Force_1, o.Rate],
                "eqn": false, // User input
                "sets": [o.L_1],
            },{
                "refs": [o.Force_1, o.Rate],
                "eqn": true, // Compute
                "sets": [o.L_1],
            }]
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 1.7674,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 20.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Deflection from free to load point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [o.Force_2, o.Rate],
                "eqn": false, // User input
                "sets": [o.L_2],
            },{
                "refs": [o.Force_2, o.Rate],
                "eqn": true, // Compute
                "sets": [o.L_2],
            }]
        },
        {
            "input": false,
            "name": "L_1",
            "value": 3.2058,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring length at load point 1",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [o.Deflect_1, o.L_Free],
                "eqn": false, // User input
                "sets": [o.L_Stroke],
            },{
                "refs": [o.Deflect_1, o.L_Free],
                "eqn": true, // Compute
                "sets": [o.L_Stroke],
            }]
        },
        {
            "input": false,
            "name": "L_2",
            "value": 1.4826,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 50.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring length at load point 2",
            "type": "equationset",
            "hidden": false,
            "validminchoices": [ "L_Solid" ],
            "validminchoice": 0,
            "eqns": [{
                "refs": [o.Deflect_2, o.L_Free],
                "eqn": false, // User input
                "sets": [o.L_Stroke],
            },{
                "refs": [o.Deflect_2, o.L_Free],
                "eqn": true, // Compute
                "sets": [o.L_Stroke],
            }]
        },
        {
            "input": false,
            "name": "L_Stroke",
            "value": 1.7233,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.010,
            "cmax": 100.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Length of stroke from point 1 to point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [o.L_1, o.L_2],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [o.L_1, o.L_2],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "L_Solid",
            "value": 1.0550,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring length when fully compressed",
            "type": "equationset",
            "hidden": false,
            "propagate": [{ name: "L_2", minmax: VALID_MIN }],
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Slenderness",
            "value": 3.2680,
            "units": "ratio",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 4.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Ratio of free length (L_Free) to mean diameter (Mean_Dia)",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "ID_Free",
            "value": 0.8890,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Inside diameter in free (no load) condition",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Weight",
            "value": 0.0776,
            "units": "pounds",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "Weight of one spring",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Spring_Index",
            "value": 9.426,
            "units": "ratio",
            "lmin": CONSTRAINED|UNINITIALIZED,
            "lmax": CONSTRAINED|UNINITIALIZED,
            "cmin": 4.0,
            "cmax": 25.0,
            "validmin": 1.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Force_Solid",
            "value": 49.67,
            "units": "pounds",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 1000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Load required to fully compress the spring",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Stress_1",
            "value": 2489.3,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.0,
            "cmax": 100000.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "Torsion stress in wire at load point 1",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Stress_2",
            "value": 99573.98,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 100.0,
            "cmax": 200000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "Torsion stress in wire at load point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Stress_Solid",
            "value": 123661.2,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 100.0,
            "cmax": 200000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "Torsion stress in wire when spring is fully compressed",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "FS_2",
            "value": 1.3127,
            "units": "ratio",
            "lmin": CONSTRAINED|UNINITIALIZED,
            "lmax": CONSTRAINED|UNINITIALIZED,
            "cmin": 1.02,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Factor of safety at load point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "FS_Solid",
            "value": 1.057,
            "units": "ratio",
            "lmin": CONSTRAINED|UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Factor of safety when the spring is fully compressed",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "FS_CycleLife",
            "value": 1.2581,
            "units": "ratio",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.02,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Factor of safety to achieve the target cycle life category. See on-line Help.",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Cycle_Life",
            "value": 33266.8,
            "units": "cycles",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 10000,
            "cmax": 10010000,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "Rough estimate of the average number of cycles to failure when cycling between point 1 and point 2. See on-line Help.",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "%_Avail_Deflect",
            "value": 80.52,
            "units": "%",
            "lmin": UNINITIALIZED,
            "lmax": CONSTRAINED|UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 90.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10.0,
            "tooltip": "Deflection of load point 2 as a percent of total available deflection",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Energy",
            "value": 35.3268,
            "units": "in-lb",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.001,
            "cmax": 1000000,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Change in elastic potential energy between 1 and 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [{
                "refs": [],
                "eqn": false, // User input
                "sets": [],
            },{
                "refs": [],
                "eqn": true, // Compute
                "sets": [],
            }]
        },
        {
            "input": false,
            "name": "Spring_Type",
            "value": "Compression",
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Compression spring design",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Compression/prop_calc",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Tensile_Stat & %_Tensile_Endur  3-Specify allowable stresses: Stress_Lim_Stat & Stress_Lim_Endur",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_Type",
            "value": 2,
            "units": "",
            "format": "table",
            "table": "Spring/mat_us",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select wire material",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "ASTM/Fed_Spec",
            "value": "Defined in initialState",
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Wire specification",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Process",
            "value": "Cold_Coiled",
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Coil winding process temperature - Cold coiled vs. Hot wound",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_File",
            "value": "mat_us.json",
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "mat_metric.json for metric units. Anything else for US IPS units",
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Life_Category",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Compression/lifetarget",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select cycle life target. Confirm that FS_CycleLife MIN constraint is enabled to utilize the selected %_Tensile_Endur for the material.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Wire material density",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Torsion_Modulus",
            "value": 11500000.0,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Wire torsion modulus (G)",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Hot_Factor_Kh",
            "value": 1.0,
            "units": "ratio",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Reduction factor applied to modulus of hot-wound materials",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Tensile",
            "value": 261000.0,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Wire tensile strength (computed as a function of wire diameter when Prop_Calc_Method=1; See on-line Help for details)",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Tensile_Endur",
            "value": 50.0,
            "units": "%",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for selected life cycle category",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Tensile_Stat",
            "value": 50.0,
            "units": "%",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for static applications",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Endur",
            "value": 130709.6,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for selected life cycle category",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Stat",
            "value": 130709.6,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for static applications",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "End_Type",
            "value": 4,
            "units": "",
            "format": "table",
            "table": "Spring/Compression/endtypes",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select end type",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Inactive_Coils",
            "value": 2.0,
            "units": "coils",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Number of coils not contributing to deflection. Depends on End_Type.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Add_Coils@Solid",
            "value": 0.0,
            "units": "coils",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Adjusts calculation of L_Solid. Depends on End_Type. See on-line Help for details.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": false,
            "name": "Catalog_Name",
            "value": "",
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Name of the catalog from which the catalog entry was selected",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": false,
            "name": "Catalog_Number",
            "value": "",
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Catalog entry which was selected from the named catalog",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "tbase010",
            "value": 0.010,
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "tbase400",
            "value": 0.400,
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "const_term",
            "value": 1.0,
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "slope_term",
            "value": 1.0,
            "units": "",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "tensile_010",
            "value": 100000.0,
            "units": "PSI",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Compression Spring default start point - US units ..."
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
    "type": "Spring/Compression",
    "version": "12",
    "result": {
        "objective_value": 0,
        "termination_condition": "Use the File : Open menu item to select a different design type (Compression, Extension, Torsion) or units (US, metric)."
    },
    "jsontype": "ODOP",
    "units": "US"
};
