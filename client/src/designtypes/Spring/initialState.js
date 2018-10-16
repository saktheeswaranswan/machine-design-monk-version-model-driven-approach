import { CONSTRAINED } from '../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "OD_Free",
            "value": 1.1,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 2.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Outside diameter in free (no load) condition",
            "equationset": true,
            "hidden": false
        },
        {
            "input": true,
            "name": "Wire_Dia",
            "value": 0.1055,
            "units": "inch",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Wire diameter",
            "equationset": true,
            "hidden": false
        },
        {
            "input": true,
            "name": "L_Free",
            "value": 3.25,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 5.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Length in free (no load) condition",
            "equationset": true,
            "hidden": false
        },
        {
            "input": true,
            "name": "Coils_T",
            "value": 10.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 20,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Total number of coils",
            "equationset": true,
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_1",
            "value": 1.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Minimum operating load (Length L_1)",
            "equationset": true,
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_2",
            "value": 40.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Maximum operating load (Length L_2)",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Mean_Dia",
            "value": 0.9945,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Average of inside and outside diameters",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Coils_A",
            "value": 8.0,
            "units": "coils",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 40.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Number of Active coils",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Rate",
            "value": 22.6315,
            "units": "Lb/In",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring rate (spring constant); slope of force-deflection curve",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 0.04,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Deflection from free to load point 1",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 1.7674,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Deflection from free to load point 2",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "L_1",
            "value": 3.2058,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 1",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "L_2",
            "value": 1.4826,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 2",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Stroke",
            "value": 1.7233,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.050,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Length of stroke from point 1 to point 2",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Solid",
            "value": 1.0550,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring length when fully compressed",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Slenderness",
            "value": 3.2680,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Ratio of free length (L_Free) to mean diameter (Mean_Dia)",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "ID_Free",
            "value": 0.8890,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Inside diameter in free (no load) condition",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Weight",
            "value": 0.0776,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Weight of one spring",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Index",
            "value": 9.426,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 4.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Force_Solid",
            "value": 49.67,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 4.0,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Load required to fully compress the spring",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_1",
            "value": 2489.3,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Torsion stress in wire at load point 1",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_2",
            "value": 99573.98,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Torsion stress in wire at load point 2",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Solid",
            "value": 123661.2,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Torsion stress in wire when spring is fully compressed",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_2",
            "value": 1.3127,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.02,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Factor of safety at load point 2",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_Solid",
            "value": 1.057,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Factor of safety when the spring is fully compressed",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_CycleLife",
            "value": 1.2581,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.02,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Factor of safety to achieve the target cycle life category",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Cycle_Life",
            "value": 33266.8,
            "units": "cycles",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.02,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Rough estimate of the average number of cycles to failure",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "%_Avail_Deflect",
            "value": 80.52,
            "units": "%",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 90.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Deflection of load point 2 as a percent of total available deflection",
            "equationset": true,
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Type",
            "value": "Compression",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Compression spring design",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "",
            "type": "table",
            "table": "prop_calc",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Tensile_Stat & %_Tensile_Endur  3-Specify allowable stresses: Stress_Lim_Stat & Stress_Lim_Endur",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Material_Type",
            "value": 2,
            "units": "",
            "type": "table",
            "table": "mat_ips",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Select wire material",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "ASTM/Fed_Spec",
            "value": "Defined in initialState",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Wire specification",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Process",
            "value": "Cold_Coiled",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Coil winding process temperature - Cold coiled vs. Hot wound",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Catalog_Number",
            "value": "Defined in initialState ... -1?",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        },
        {
            "input": false,
            "name": "Material_File",
            "value": "pass in name: mat_ips.json? ... -1?",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        },
        {
            "input": false,
            "name": "Life_Category",
            "value": 1,
            "units": "",
            "type": "table",
            "table": "lifetarget",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Select cycle life target. Selects %_Tensile_Endur from material table.",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "End_Type",
            "value": 4,
            "units": "",
            "type": "table",
            "table": "c_endtypes",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Select end type",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Inactive_Coils",
            "value": 2.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Number of coils not contributing to deflection. Depends on End_Type.",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Add_Coils@Solid",
            "value": 0.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Adjusts calculation of L_Solid. Depends on End_Type. See Help for details.",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Wire material density",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Torsion_Modulus",
            "value": 11500000.0,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Wire torsion modulus (G)",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Hot_Factor_Kh",
            "value": 1.0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Reduction factor applied to modulus of hot-wound materials",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Tensile",
            "value": 261000.0,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Wire tensile strength (computed as a function of wire diameter)",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "%_Tensile_Endur",
            "value": 50.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Allowable percent of tensile strength for selected life cycle category",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "%_Tensile_Stat",
            "value": 50.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Allowable percent of tensile strength for static applications",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Lim_Endur",
            "value": 130709.6,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Allowable stress for selected life cycle category",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Lim_Stat",
            "value": 130709.6,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Allowable stress for static applications",
            "equationset": false,
            "hidden": false
        },
        {
            "input": false,
            "name": "tbase010",
            "value": 0.010,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        },
        {
            "input": false,
            "name": "tbase400",
            "value": 0.400,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        },
        {
            "input": false,
            "name": "const_term",
            "value": 1.0,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        },
        {
            "input": false,
            "name": "slope_term",
            "value": 1.0,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        },
        {
            "input": false,
            "name": "tensile_010",
            "value": 100000.0,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 1.0,
            "equationset": false,
            "hidden": true
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Compression Spring default startup file ..."
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
            "name": "City",
            "value": ""
        },
        {
            "name": "State & Zip",
            "value": ""
        },
        {
            "name": "Phone",
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
            "name": "Finish",
            "value": ""
        }
    ],
    "name": "initialState",
    "type": "Spring",
    "version": "3",
    "result": {
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    }
};
