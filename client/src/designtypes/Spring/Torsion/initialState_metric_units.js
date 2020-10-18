import { CONSTRAINED, FIXED } from '../../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "OD_Free",
            "value": 24.4475,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 2.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Outside diameter in free (no load) condition",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Wire_Dia",
            "value": 1.6002,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0.5,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Wire diameter",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Coils_T",
            "value": 7.04,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 40,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Total number of coils",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "M_1",
            "value": 5.65,
            "units": "N-mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Minimum operating load (Length L_1)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "M_2",
            "value": 451.93,
            "units": "N-mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Maximum operating load (Length L_2)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Coil_Spacing",
            "value": 0.00,
            "units": "mm",
            "lmin": FIXED,
            "lmax": FIXED,
            "cmin": 0,
            "cmax": 1.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Empty space between each turn (not the same as pitch)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Mean_Dia",
            "value": 22.84,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Average of coil inside and outside diameters",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "ID_Free",
            "value": 21.24,
            "units": "mm",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Inside diameter in free (no load) condition",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Coils_A",
            "value": 7.04,
            "units": "coils",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 50.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Number of Active coils",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Rate",
            "value": 2.17,
            "units": "N-mm/deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.001,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Spring rate (spring constant); slope of force-deflection curve",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 2.60,
            "units": "deg",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Deflection from free to load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 208.2,
            "units": "deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 300.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Deflection from free to load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Body",
            "value": 12.86,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 50.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Length of spring body in free condition",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_1",
            "value": 12.87,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 50.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Spring length at load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_2",
            "value": 13.79,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 50.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Spring length at load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "End_Angle_Free",
            "value": 0.0,
            "units": "deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 300.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Relative angle between arms in free condition",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stroke",
            "value": 205.6,
            "units": "deg",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 300.0,
            "ioclass": 0,
            "sdlim": 0.1,
            "tooltip": "Angular displacement from point 1 to point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Weight",
            "value": 8.4,
            "units": "grams",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Weight of one spring",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Index",
            "value": 14.27,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 4.0,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "End_Deflect_All",
            "value": 0.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "End deflection allowance",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_1",
            "value": 14.04,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1000.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Bending stress in body wire at load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_2",
            "value": 1123.4,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10.0,
            "cmax": 2000.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Bending stress in body wire at load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_End",
            "value": 1.0,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Placeholder for future calculation of bending stress in end arms",
            "type": "equationset",
            "hidden": true
        },
        {
            "input": false,
            "name": "FS_2",
            "value": 1.3,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.05,
            "cmax": 1.6,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Factor of safety at load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_CycleLife",
            "value": 1.3,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Factor of safety to achieve the target cycle life category. See on-line Help.",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Cycle_Life",
            "value": 10681.6,
            "units": "cycles",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10000,
            "cmax": 1000000,
            "ioclass": 0,
            "sdlim": 10000.0,
            "tooltip": "Rough estimate of the average number of cycles to failure. See on-line Help.",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Force_Arm_2",
            "value": 1.0,
            "units": "newtons",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 1.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Force produced at distance of Arm_2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Energy",
            "value": 1,
            "units": "N-mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1,
            "cmax": 1000000,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Change in elastic potential energy between 1 and 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Type",
            "value": "Torsion",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Torsion spring design",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/prop_calc",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Ten_Bnd_Stat & %_Ten_Bnd_Endur  3-Specify allowable stresses: Stress_Lim_Bnd_Stat & Stress_Lim_Bnd_Endur",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_Type",
            "value": 2,
            "units": "",
            "format": "table",
            "table": "Spring/mat_SI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
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
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
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
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Coil winding process temperature - Cold coiled vs. Hot wound",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Heat_Treat",
            "value": "1",
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/heattreat",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Selects heat treatment process",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Catalog_Number",
            "value": "Defined in initialState ... -1?",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Material_File",
            "value": "mat_SI.json",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Life_Category",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/lifetarget",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Select cycle life target. Selects %_Ten_Bnd_Endur from material table.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Inactive_Coils",
            "value": 0.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Number of coils not contributing to deflection. Depends on End_Type.",
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Density",
            "value": 0.00786,
            "units": "g/mm**3",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Wire material density",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Elastic_Modulus",
            "value": 207000.0,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Wire elastic modulus (E)",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Hot_Factor_Kh",
            "value": 1.0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Reduction factor applied to modulus of hot-wound materials",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Tensile",
            "value": 1966.2,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Wire tensile strength (computed as a function of wire diameter when Prop_Calc_Method=1; See Help for details)",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Ten_Bnd_Endur",
            "value": 50.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for selected life cycle category",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Ten_Bnd_Stat",
            "value": 75.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for static applications",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Bnd_Endur",
            "value": 1474.7,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for selected life cycle category",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Bnd_Stat",
            "value": 1474.7,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for static applications",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "End_Type",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/endtypes",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Select end type",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Arm_1",
            "value": 0.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Moment arm at end 1",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Arm_2",
            "value": 0.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Moment arm at end 2",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Xlen_1",
            "value": 0.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Extra length at end 1 added to wire length calculation",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Xlen_2",
            "value": 0.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Extra length at end 2 added to wire length calculation",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_End_1",
            "value": 0.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Length at end 1 used to calculate end deflection allowance",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_End_2",
            "value": 0.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "tooltip": "Length at end 2 used to calculate end deflection allowance",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "tbase010",
            "value": 0.254,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "tbase400",
            "value": 10.160,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "const_term",
            "value": 1.0,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "slope_term",
            "value": 1.0,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "tensile_010",
            "value": 1000.0,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Torsion Spring default start point ... metric units"
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
    "type": "Spring/Torsion",
    "version": "4",
    "result": {
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    }
};
