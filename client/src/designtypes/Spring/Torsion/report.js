import React from 'react';
import * as o from './offsets';
import * as mo from '../mat_ips_offsets';

export function getReportNames() {
    // Note: report names must match cases in switch statement below
    return [
      '1 (mini)',
      '2 (other)',
      '3 (maxi)'
    ];
}

export function report(report_name, prefs, p, x, labels) {
//    console.log('In report report_name=',report_name,' prefs=',prefs,' p=',p,' x=',x,' labels=',labels);
    
    const Deg_Per_Turn = 360.0;
    const zero = 0.0;

    var temp, s_f, len_lbl, 
    safe_load_u, wgt1000_u, cycle_life_u, 
    errmsg, hits,
    safe_travel, tensileFixed0,
    sq1, sq2,
    dhat, kb, wire_len_t, safe_load, def_max,
    pitch, hlx_ang,
    od_1, od_2, id_1, id_2,
    wgt1000, fs_1, ctp1, l_max, od_max;

    /*  Bring in material properties table  */
    var m_tab = require('../mat_ips.json');
    var et_tab = require('./endtypes.json');

    hits = 0;
    errmsg = "";
    if (x[o.ID_Free].value < 0.0) {
        hits++;
        errmsg += ": " + x[o.ID_Free].name + " < zero";
    }
    if (x[o.Coils_A].value < 1.0) {
        hits++;
        errmsg += ": " + x[o.Coils_A].name + " < 1.0";
    }
    if (p[o.Wire_Dia].value < 0.5 * x[o.tbase010].value) {
        hits++;
        errmsg += ": " + p[o.Wire_Dia].name + " < reasonable";
    }
    if (p[o.Wire_Dia].value > 5.0 * x[o.tbase400].value) {
        hits++;
        errmsg += ": " + p[o.Wire_Dia].name + " > reasonable";
    }
    if (x[o.Tensile].value <= prefs[o.smallnum]) {
        hits++;
        errmsg += ": " + x[o.Tensile].name + " < reasonable";
    }
    if (hits) errmsg = "Warning" + errmsg;
    const startpntmsg = "YOU MAY WISH TO CHOOSE A MORE REASONABLE START POINT BEFORE CONTINUING WITH SEARCH, SEEK OR TRADE.";
    const NaNmsg = 'Any "NaN" values are "Not a Number".';
    
    len_lbl = "Wire Length";
    
    switch(x[o.End_Type].value) {
    case 1:        //  Tangent   pitch=(l_body-wire_dia)/coils_t
        pitch = (x[o.L_Body].value - p[o.Wire_Dia].value) / x[o.Coils_T].value;
        break;
    case 3:        //  Future hot wound end type ?
        pitch = 0.0;
        len_lbl = "Bar cut len.";
        break;
    default:        //  User Specified
        pitch = 0.0;
    }     

    sq1 = x[o.L_Body].value;
    sq2 = p[o.Coils_T].value * Math.PI * x[o.Mean_Dia].value;
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2) + x[o.Xlen_1].value + x[o.Xlen_2].value;
                           /*  more accurate weight  */
    wgt1000 = 1000.0 * x[o.Density].value * (Math.PI * p[o.Wire_Dia].value * p[o.Wire_Dia].value / 4.0) * wire_len_t;
    wgt1000_u = "/1000"

    /* 
     *  calculates mean diameter of deflected torsion spring. 
     *  intermediate dia. calcs. assume no wire stretch
     */
    
    dhat = def_dia_t(x[o.Deflect_1].value);
    od_1 = dhat + p[o.Wire_Dia].value;
    id_1 = dhat - p[o.Wire_Dia].value;
    
    dhat = def_dia_t(x[o.Deflect_2].value);
    od_2 = dhat + p[o.Wire_Dia].value;
    id_2 = dhat - p[o.Wire_Dia].value;

    function def_dia_t(def) {
//        return((mean_dia*coils_a)/(coils_a+def/deg_per_turn));
        return((x[o.Mean_Dia].value * x[o.Coils_A].value) / (x[o.Coils_A].value + def / Deg_Per_Turn));
    }

    if(x[o.Prop_Calc_Method].value === 1 || x[o.Prop_Calc_Method].value === 2) tensileFixed0 = x[o.Tensile].value.toFixed(0);
     else tensileFixed0 = "unused";

    dhat = x[o.Tensile].value / 100.0;

    if (x[o.Heat_Treat].value === 2){     //  Stress Relieve
        kb = (4.0 * x[o.Spring_Index].value - 1.0) / (4.0 * x[o.Spring_Index].value - 4.0);
    }
    else {                          //  No Stress Relieve
        kb = 1.0;
    }
//  console.log("x[o.Heat_Treat].value =", x[o.Heat_Treat].value);
//  console.log("kb = ", kb);

    s_f = 32.0 * kb / (Math.PI * p[o.Wire_Dia].value * p[o.Wire_Dia].value * p[o.Wire_Dia].value);

//    if stress_1 ^= zero then fs_1=abs(str_lim_bnd_stat/stress_1);
//    else fs_1=zero;
//    safe_load=str_lim_bnd_stat/s_f;

    if (x[o.Stress_1].value !== zero) {
        fs_1 = Math.abs(x[o.Stress_Lim_Bnd_Stat].value / x[o.Stress_1].value);
    }
    else {
        fs_1 = zero;
    }
    safe_load = x[o.Stress_Lim_Bnd_Stat].value / s_f;
    safe_load_u = p[o.M_2].units ;
    

//    def_max=safe_load/rate;
//       ctp1=coils_t+1.0;
//    l_max = max(l_body, wire_dia*(ctp1+def_max/deg_per_turn) );
//       temp=def_dia_t(def_max);
//    od_max=temp+wire_dia;
//    id_max=temp-wire_dia;
    
    def_max = safe_load / x[o.Rate].value;
    ctp1 = p[o.Coils_T].value + 1.0;
    l_max = Math.max(x[o.L_Body].value, p[o.Wire_Dia].value * (ctp1 + def_max / Deg_Per_Turn));
    temp = def_dia_t(def_max);
    od_max = temp + p[o.Wire_Dia].value;
    
    /*
     * Angle across coil cross section
     * hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
     */
    if (pitch > 0.0) hlx_ang = Math.atan(pitch / (Math.PI * x[o.Mean_Dia].value)) * (180.0 / Math.PI);
    else hlx_ang = 0.0;

    cycle_life_u = x[o.Cycle_Life].units + " (est)";

    safe_travel = def_max;

    switch(report_name) {
    case "1 (mini)":
    default:

    return (
        <React.Fragment>
            <h4>ODOP:Spring &nbsp; Torsion Spring Report</h4><br />
            <b>
            {hits > 0 && errmsg}{hits > 0 && <br />}
            {hits > 0 && startpntmsg}{hits > 0 && <br />}
            </b>
            {hits > 0 && NaNmsg}{hits > 0 && <br />}
            {hits > 0 && <br />}
            <table>
                <tbody>
                    <tr>
                        <td>{x[o.Spring_Type].name}</td>
                        <td>=</td>
                        <td className="" colSpan="2">{x[o.Spring_Type].value}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Material_Type].name}</td>
                        <td>=</td>
                        <td className="text-left" colSpan="2">{m_tab[x[o.Material_Type].value][mo.matnam]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{p[o.Wire_Dia].name}</td>
                        <td>=</td>
                        <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                        <td>{p[o.Wire_Dia].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.End_Type].name}</td>
                        <td>=</td>
                        <td className="text-left" colSpan="2">{et_tab[x[o.End_Type].value][0]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{x[o.Spring_Index].name}</td>
                        <td>=</td>
                        <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                        <td>{x[o.Spring_Index].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{p[o.Coils_T].name}</td>
                        <td>=</td>
                        <td>{p[o.Coils_T].value.toFixed(3)}</td>
                        <td>{"total " + p[o.Coils_T].units}</td>
                    </tr>
                    <tr>
                        <td>{x[o.Rate].name}</td>
                        <td>=</td>
                        <td>{x[o.Rate].value.toFixed(3)}</td>
                        <td>{x[o.Rate].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Coils_A].name}</td>
                        <td>=</td>
                        <td>{x[o.Coils_A].value.toFixed(3)}</td>
                        <td>{"active " + x[o.Coils_A].units}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Length</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Deflect</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Moment</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>&nbsp; OD &nbsp;</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>&nbsp; ID &nbsp; </th>
                        <td> &nbsp; &nbsp; </td>
                        <th>&nbsp;Stress</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Static FS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Free</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.L_Body].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(0.0).toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(0.0).toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{p[o.OD_Free].value.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.ID_Free].value.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(0.0).toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>infinite</td>
                    </tr>
                    <tr>
                        <td><b>1</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.L_1].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Deflect_1].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{p[o.M_1].value.toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{od_1.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{id_1.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Stress_1].value.toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{fs_1.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td><b>2</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.L_2].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Deflect_2].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{p[o.M_2].value.toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{od_2.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{id_2.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Stress_2].value.toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.FS_2].value.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td><b>Max Safe</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{l_max.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{def_max.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{safe_load.toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{od_max.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(od_max - 2.0 * p[o.Wire_Dia].value).toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{1.0.toFixed(3)}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Safe Load</td>
                        <td>=</td>
                        <td>{safe_load.toFixed(3)}</td>
                        <td>{safe_load_u}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{len_lbl}</td>
                        <td>=</td>
                        <td>{wire_len_t.toFixed(3)}</td>
                        <td>{x[o.L_Body].units}</td>
                    </tr>
                    <tr>
                        <td>{x[o.Stroke].name}</td>
                        <td>=</td>
                        <td>{x[o.Stroke].value.toFixed(3)}</td>
                        <td>{x[o.Stroke].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Weight].name}</td>
                        <td>=</td>
                        <td>{wgt1000.toFixed(3)}</td>
                        <td>{x[o.Weight].units}</td>
                        <td>{wgt1000_u}</td>
                    </tr>
                    <tr>
                        <td>Pitch</td>
                        <td>=</td>
                        <td>{pitch.toFixed(3)}</td>
                        <td>{x[o.L_Body].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.End_Angle_Free].name}</td>
                        <td>=</td>
                        <td>{x[o.End_Angle_Free].value.toFixed(2)}</td>
                        <td>{x[o.End_Angle_Free].units}</td>
                        </tr>
                        <tr>
                        <td>{x[o.Arm_2].name}</td>
                        <td>=</td>
                        <td>{x[o.Arm_2].value.toFixed(3)}</td>
                        <td>{x[o.Arm_2].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Cycle_Life].name}</td>
                        <td>=</td>
                        <td>{x[o.Cycle_Life].value.toFixed(0)}</td>
                        <td>{x[o.Cycle_Life].units}</td>
                        <td> (est.)</td>
                    </tr>
                    <tr>
                        <td>{x[o.Force_Arm_2].name}</td>
                        <td>=</td>
                        <td>{x[o.Force_Arm_2].value.toFixed(3)}</td>
                        <td>{x[o.Force_Arm_2].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>({x[o.Cycle_Life].name}</td>
                        <td>&nbsp;</td>
                        <td className="text-left" colSpan="3">applies to body coils only.)</td>
                    </tr>
                </tbody>
            </table>
            <br />
            Deflection at load point 2 is {(100.0 * x[o.Deflect_2].value / def_max).toFixed(0)}% of total safe deflection.<br />
        </React.Fragment>
    );
    case "2 (other)":
        return (
                <React.Fragment>
                <h4>ODOP:Spring &nbsp; Torsion Spring Report</h4>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td>{x[o.Spring_Type].name}</td>
                                <td>=</td>
                                <td>{x[o.Spring_Type].value}</td>
                                <td/>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>{x[o.Material_Type].name}</td>
                                <td>=</td>
                                <td className="text-left" colSpan="2">{m_tab[x[o.Material_Type].value][mo.matnam]}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{p[o.Wire_Dia].name}</td>
                                <td>=</td>
                                <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                                <td>{p[o.Wire_Dia].units}</td>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>{x[o.Tensile].name}</td>
                                <td>=</td>
                                <td>{tensileFixed0}</td>
                                <td>{x[o.Tensile].units}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{x[o.Spring_Index].name}</td>
                                <td>=</td>
                                <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                                <td>{x[o.Spring_Index].units}</td>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>Stress Ratio</td>
                                <td>=</td>
                                <td>{(x[o.Stress_1].value / x[o.Stress_2].value).toFixed(3)}</td>
                                <td>{x[o.Spring_Index].units}</td>
                            </tr>
                            <tr>
                            <td> &nbsp; &nbsp; </td>
                            </tr>
                            <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td>kb </td>
                            <td>=</td>
                            <td>{kb.toFixed(3)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; ----- kb -----
                    <table>
                    <thead>
                        <tr>
                            <th></th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Length </th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Deflect</th>
                            <th>Moment</th>
                            <td> &nbsp; &nbsp; </td>
                            <th> &nbsp; &nbsp; </th>
                            <th> &nbsp; &nbsp; </th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Stress</th>
                            <td> &nbsp;</td>
                            <th> %TS</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.L_Body].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>infinite</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.L_1].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Deflect_1].value.toFixed(3)}</td>
                            <td>{p[o.M_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Stress_1].value.toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(x[o.Stress_1].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.L_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Deflect_2].value.toFixed(3)}</td>
                            <td>{p[o.M_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Stress_2].value.toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(x[o.Stress_2].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Max Safe</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{l_max.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{def_max.toFixed(3)}</td>
                            <td>{safe_load.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(x[o.Stress_Lim_Bnd_Stat].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{1.0.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td>{x[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{x[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td>{x[o.FS_CycleLife].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{x[o.Cycle_Life].value.toFixed(0)}</td>
                            <td>{cycle_life_u}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{hlx_ang.toFixed(2)}</td>
                            <td>degrees</td>
                        </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
    case "3 (maxi)":
    return (
        <React.Fragment>
            <h4>ODOP:Spring &nbsp; Torsion Spring Report</h4>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>{labels[o.Contact_person].name}:</td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Contact_person].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Phone].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Phone].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.Company_name].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Company_name].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Date].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Date].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.Street].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Street].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Part_Number].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Part_Number].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.City].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.City].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Finish].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Finish].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.State___Zip].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.State___Zip].value}</td>
                    </tr>
                </tbody>
            </table>
            <b>Comment: &nbsp; </b> {labels[o.COMMENT].value} <br/>
            <br/>
            <table>
                <tbody>
                    <tr>
                    <td>{x[o.Spring_Type].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{x[o.Spring_Type].value}</td>
                    <td/>
                    <td> &nbsp; &nbsp; </td>
                    <td>{x[o.Material_Type].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{m_tab[x[o.Material_Type].value][mo.matnam]}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>{x[o.End_Type].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{et_tab[x[o.End_Type].value][0]}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.ASTM_Fed_Spec].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{x[o.ASTM_Fed_Spec].value}</td>
                    <td></td>
                </tr>
                    <tr>
                    <td>{p[o.Wire_Dia].name}</td>
                    <td>=</td>
                    <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                    <td>{p[o.Wire_Dia].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Tensile].name}</td>
                    <td>=</td>
                    <td>{tensileFixed0}</td>
                    <td>{x[o.Tensile].units}</td>
                </tr>
                <tr>
                    <td>{x[o.Mean_Dia].name}</td>
                    <td>=</td>
                    <td>{x[o.Mean_Dia].value.toFixed(3)}</td>
                    <td>{x[o.Mean_Dia].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{len_lbl}</td>
                    <td>=</td>
                    <td>{wire_len_t.toFixed(3)}</td>
                    <td>{x[o.L_Body].units}</td>
                </tr>
                <tr>
                    <td>{x[o.Spring_Index].name}</td>
                    <td>=</td>
                    <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                    <td>{x[o.Spring_Index].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Weight].name}</td>
                    <td>=</td>
                    <td>{wgt1000.toFixed(3)}</td>
                    <td>{x[o.Weight].units}</td>
                    <td>{wgt1000_u}</td>
                </tr>
                <tr>
                    <td>{p[o.Coils_T].name}</td>
                    <td>=</td>
                    <td>{p[o.Coils_T].value.toFixed(3)}</td>
                    <td>{"total " + p[o.Coils_T].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.End_Angle_Free].name}</td>
                    <td>=</td>
                    <td>{x[o.End_Angle_Free].value.toFixed(2)}</td>
                    <td>{x[o.End_Angle_Free].units}</td>
                </tr>
                <tr>
                    <td>{x[o.Coils_A].name}</td>
                    <td>=</td>
                    <td>{x[o.Coils_A].value.toFixed(3)}</td>
                    <td>{"active " + x[o.Coils_A].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Rate].name}</td>
                    <td>=</td>
                    <td>{x[o.Rate].value.toFixed(3)}</td>
                    <td>{x[o.Rate].units}</td>
                </tr>
                <tr>
                    <td>Pitch</td>
                    <td>=</td>
                    <td>{pitch.toFixed(3)}</td>
                    <td>{x[o.L_Body].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>Helix Angle</td>
                    <td>=</td>
                    <td>{hlx_ang.toFixed(2)}</td>
                    <td>degrees</td>
                </tr>
                <tr>
                    <td>Safe Load</td>
                    <td>=</td>
                    <td>{safe_load.toFixed(3)}</td>
                    <td>{safe_load_u}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>Safe Travel</td>
                    <td>=</td>
                    <td>{safe_travel.toFixed(3)}</td>
                    <td>{x[o.Deflect_2].units}</td>
                </tr>
                <tr>
                    <td>{x[o.Arm_2].name}</td>
                    <td>=</td>
                    <td>{x[o.Arm_2].value.toFixed(3)}</td>
                    <td>{x[o.Arm_2].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Cycle_Life].name}</td>
                    <td>=</td>
                    <td>{x[o.Cycle_Life].value.toFixed(0)}</td>
                    <td className="text-left" colSpan="2">{cycle_life_u}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{x[o.Force_Arm_2].name}</td>
                    <td>=</td>
                    <td>{x[o.Force_Arm_2].value.toFixed(3)}</td>
                    <td>{x[o.Force_Arm_2].units}</td>
                    <td/>
                    <td> &nbsp; &nbsp; </td>
                    <td>({x[o.Cycle_Life].name}</td>
                    <td>&nbsp;</td>
                    <td className="text-left" colSpan="3">applies to body coils only.)</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table>
            <thead>
                <tr>
                    <th/>
                    <th/>
                    <th>Free </th>
                    <th>1st Load</th>
                    <th>&nbsp; 2nd Load</th>
                    <td></td>
                    <th> &nbsp; Max Safe</th>
                    <th></th>
                    <th> &nbsp; &nbsp; </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Moment</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(0.0).toFixed(3)}</td>
                    <td>{p[o.M_1].value.toFixed(3)}</td>
                    <td>{p[o.M_2].value.toFixed(3)}</td>
                    <td> &nbsp; </td>
                    <td>{safe_load.toFixed(3)}</td>
                    <td className="text-left" colSpan="2">{p[o.M_1].units}</td>
                    <td/>
                </tr>
                <tr>
                    <td><b>Length</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{x[o.L_Body].value.toFixed(3)}</td>
                    <td>{x[o.L_1].value.toFixed(3)}</td>
                    <td>{x[o.L_2].value.toFixed(3)}</td>
                    <td> &nbsp; </td>
                    <td>{l_max.toFixed(3)}</td>
                    <td>{x[o.L_1].units}</td>
                </tr>
                <tr>
                    <td><b>Deflection</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(0.0).toFixed(3)}</td>
                    <td>{x[o.Deflect_1].value.toFixed(3)}</td>
                    <td>{x[o.Deflect_2].value.toFixed(3)}</td>
                    <td> &nbsp; </td>
                    <td>{def_max.toFixed(3)}</td>
                    <td>{x[o.Deflect_2].units}</td>
                </tr>
                <tr>
                    <td><b>Outside Dia.</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{p[o.OD_Free].value.toFixed(3)}</td>
                    <td>{od_1.toFixed(3)}</td>
                    <td>{od_2.toFixed(3)}</td>
                    <td> &nbsp; </td>
                    <td>{od_max.toFixed(3)}</td>
                    <td>{p[o.OD_Free].units}</td>
                </tr>
                <tr>
                    <td><b>Inside Dia.</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{x[o.ID_Free].value.toFixed(3)}</td>
                    <td>{id_1.toFixed(3)}</td>
                    <td>{id_2.toFixed(3)}</td>
                    <td> &nbsp; </td>
                    <td>{(od_max - 2.0 * p[o.Wire_Dia].value).toFixed(3)}</td>
                    <td>{x[o.ID_Free].units}</td>
                </tr>
                <tr>
                    <td> &nbsp; kb = </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{kb.toFixed(3)}</td>
                    <td></td>
                    <td></td>
                    <td> &nbsp; &nbsp; </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td> ... <b>Stress</b></td>
                    <td></td>
                    <td></td>
                    <td>{x[o.Stress_1].value.toFixed(0)}</td>
                    <td>{x[o.Stress_2].value.toFixed(0)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{x[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                    <td>{x[o.Stress_1].units}</td>
                </tr>
                <tr>
                    <td> ... <b>% Tensile</b></td>
                    <td></td>
                    <td></td>
                    <td>{(x[o.Stress_1].value / dhat).toFixed(1)}</td>
                    <td>{(x[o.Stress_2].value / dhat).toFixed(1)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(x[o.Stress_Lim_Bnd_Stat].value / dhat).toFixed(1)}</td>
                    <td>% &nbsp; &nbsp; </td>
                </tr>
                <tr>
                    <td> ... <b>Static F.S.</b></td>
                    <td></td>
                    <td></td>
                    <td>{fs_1.toFixed(2)}</td>
                    <td>{x[o.FS_2].value.toFixed(2)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{1.0.toFixed(2)}</td>
                    <td>{x[o.FS_2].units}</td>
                </tr>
            </tbody>
        </table>
        <hr/>
        <table>
            <tbody>
                <tr>
                    <td>Wind: </td>
                    <td> &nbsp; </td>
                    <td>rh</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>lh</td>
                    <td> &nbsp; </td>
                    <td>opt</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Data source: </td>
                    <td> &nbsp; </td>
                    <td>print </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>sample </td>
                    <td> &nbsp; </td>
                    <td>verbal</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Mandrel: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>Fits in: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>Works over:</td>
                </tr>
                <tr>
                    <td>Stress relieve</td>
                    <td>/ HT: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>Squareness</td>
                    <td className="text-left">(deg): </td>
                </tr>
                <tr>
                    <td>Shot peen: </td>
                    <td> &nbsp; </td>
                    <td> yes </td>
                    <td> &nbsp; </td>
                    <td> no </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> Operating temp: </td>
                </tr>
                <tr>
                    <td>Special notes</td>
                    <td className="text-left" colSpan="2">& tolerances: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> End use: </td>
                    <td> &nbsp; </td>
                </tr>
            </tbody>
        </table>
        <hr/>
        Deflection at load point 2 is {(100.0 * x[o.Deflect_2].value / def_max).toFixed(0)}% of total safe deflection.<br />
        <hr/>
        <table>
            <tbody>
                <tr>
                <td> &nbsp; approved for mfg.&nbsp; </td>
                <td> &nbsp; </td>
                <td> &nbsp; </td>
                <td> &nbsp; approved for mfg.&nbsp; </td>
                </tr>
                <tr>
                <td> &nbsp; </td>
                </tr>
                <tr>
                <td> by _______________________ &nbsp; </td>
                <td> &nbsp; date _______ &nbsp; </td>
                <td> &nbsp; </td>
                <td> by _______________________ &nbsp; </td>
                <td> &nbsp; date _______ &nbsp; </td>
                </tr>
            </tbody>
        </table>
        </React.Fragment>
    );
    }
}
