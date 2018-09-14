import React from 'react';
import * as o from './offsets';

export function report(p, x) {
//    console.log('In report p=',p,' x=',x);
    
    var sq1, sq2,
    dhat, wire_len_a, wire_len_t, safe_load, def_max,
    pitch, hlx_ang,
    od_1, od_2, od_solid, id_1, id_2,
    wgt1000, fs_1, kw2fs_1, kw2fs_2, kw2fs_s,
    kw1, kw2, kw2str1, kw2str2, kw2strs;
    
//    et=end_type_index;
//    if    et = 4 then pitch=(l_free-2.0*wire_dia)/coils_a;
//      else if et = 3 then pitch=(l_free-3.0*wire_dia)/coils_a;
//      else if et = 2 then pitch= l_free/coils_t;
//      else if et = 1 then pitch=(l_free-    wire_dia)/coils_a;
//      else if et = 5 then pitch=(l_free-1.5*wire_dia)/coils_a;
//      else if et = 6 then pitch=(l_free-2.0*wire_dia)/coils_a;
//      else pitch = zero;
    
    switch(x[o.End_Type].value) {
    case 4:
        pitch = (p[o.L_Free].value - 2.0 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 3:
        pitch = (p[o.L_Free].value - 3.0 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 2:
        pitch = p[o.L_Free].value / p[o.Coils_T].value;
        break;
    case 1:
        pitch = (p[o.L_Free].value -       p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 5:
        pitch = (p[o.L_Free].value - 1.5 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 6:
        pitch = (p[o.L_Free].value - 2.0 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    default:
        pitch = 0.0;
}     
//    sq1=l_free;
    sq1 = p[o.L_Free].value;
//    sq2=coils_t*pi*mean_dia;
    sq2 = p[o.Coils_T].value * Math.PI * x[o.Mean_Dia].value;
//    wire_len_t=sqrt(sq1*sq1+sq2*sq2);
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);
            /*
           calculate developed length of tapered ends based on
           2 ends * pi * wire diameter * 0.625
            */
//    if end_type_index = 5 then wire_len_t=wire_len_t-3.926*wire_dia;
    if (x[o.End_Type].value === 5 ) wire_len_t = wire_len_t - 3.926 * p[o.Wire_Dia].value;
                           /*  more accurate weight  */
//    wgt1000=1000.0*density*(pi*wire_dia*wire_dia/4.0)*wire_len_t;
    wgt1000 = 1000.0 * x[o.Density].value * (Math.PI * p[o.Wire_Dia].value * p[o.Wire_Dia].value / 4.0) * wire_len_t;

    /* intermed. dia. calcs. assume no wire stretch   */
//    sq1=l_free;
    sq1 = p[o.L_Free].value;
//    sq2=coils_a*pi*mean_dia;
    sq2 = x[o.Coils_A].value * Math.PI * x[o.Mean_Dia].value;
//    wire_len_a=sq1*sq1+sq2*sq2;
    wire_len_a = Math.sqrt(sq1 * sq1 + sq2 * sq2);
//
//    dhat=def_dia(l_1);
    dhat = def_dia(x[o.L_1].value);
    console.log("dhat = ", dhat);
//    OD_1=DHAT+WIRE_DIA;
    od_1 = dhat + p[o.Wire_Dia].value;
//    ID_1=DHAT-WIRE_DIA;
    id_1 = dhat - p[o.Wire_Dia].value;
//
//    dhat=def_dia(l_2);
    dhat = def_dia(x[o.L_2].value);
//    OD_2=DHAT+WIRE_DIA;
    od_2 = dhat + p[o.Wire_Dia].value;
//    ID_2=DHAT-WIRE_DIA;
    id_2 = dhat - p[o.Wire_Dia].value;
//
//    dhat=def_dia(l_solid);
    dhat = def_dia(x[o.L_Solid].value)
//    OD_solid=DHAT+WIRE_DIA;
    od_solid = dhat + p[o.Wire_Dia].value;

//    DEF_DIA: procedure(def_len) returns(float);
    function def_dia(def_len) {
               /*  calculates mean diameter of deflected spring.  */
//      declare def_len float;
        console.log("def_len = ", def_len);
        console.log("wire_len_a = ", wire_len_a);
        console.log("x[o.Coils_A].value = ", x[o.Coils_A].value)
//      return(sqrt(wire_len_a-def_len*def_len)/(coils_a*pi));
        return(Math.sqrt(wire_len_a - def_len * def_len) / (x[o.Coils_A].value * Math.PI));
//    end def_dia;
    }
    
    return (
        <React.Fragment>
            <table>
                <tbody>
                    <tr>
                        <td>{x[o.Spring_Type].name}</td>
                        <td>=</td>
                        <td>{x[o.Spring_Type].value}</td>
                        <td>{x[o.Spring_Type].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>{x[o.Material_Type].name}</td>
                        <td>=</td>
                        <td>{x[o.Material_Type].value}</td>
                        <td>{x[o.Material_Type].units}</td>
                    </tr>
                    <tr>
                        <td>{p[o.Wire_Dia].name}</td>
                        <td>=</td>
                        <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                        <td>{p[o.Wire_Dia].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>{x[o.End_Type].name}</td>
                        <td>=</td>
                        <td>{x[o.End_Type].value}</td>
                        <td>{x[o.End_Type].units}</td>
                    </tr>
                    <tr>
                        <td>{x[o.Spring_Index].name}</td>
                        <td>=</td>
                        <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                        <td>{x[o.Spring_Index].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>{p[o.Coils_T].name}</td>
                        <td>=</td>
                        <td>{p[o.Coils_T].value.toFixed(3)}</td>
                        <td>{p[o.Coils_T].units}</td>
                    </tr>
                    <tr>
                        <td>{x[o.Rate].name}</td>
                        <td>=</td>
                        <td>{x[o.Rate].value.toFixed(3)}</td>
                        <td>{x[o.Rate].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>{x[o.Coils_A].name}</td>
                        <td>=</td>
                        <td>{x[o.Coils_A].value.toFixed(3)}</td>
                        <td>{x[o.Coils_A].units}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Length</th>
                        <th>Deflect</th>
                        <th>Force</th>
                        <th>OD</th>
                        <th>ID</th>
                        <th>Stress</th>
                        <th>Static FS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Free</td>
                        <td>{p[o.L_Free].value.toFixed(3)}</td>
                        <td>{(0.0).toFixed(4)}</td>
                        <td>{(0.0).toFixed(2)}</td>
                        <td>{p[o.OD_Free].value.toFixed(4)}</td>
                        <td>0.0</td>
                        <td>{(0.0).toFixed(0)}</td>
                        <td>0.0</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>{x[o.L_1].value.toFixed(3)}</td>
                        <td>{x[o.Deflect_1].value.toFixed(4)}</td>
                        <td>{p[o.Force_1].value.toFixed(2)}</td>
                        <td>{od_1.toFixed(4)}</td>
                        <td>{id_1.toFixed(4)}</td>
                        <td>{x[o.Stress_1].value.toFixed(0)}</td>
                        <td>0.0</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{x[o.L_2].value.toFixed(3)}</td>
                        <td>{x[o.Deflect_2].value.toFixed(4)}</td>
                        <td>{p[o.Force_2].value.toFixed(2)}</td>
                        <td>{od_2.toFixed(4)}</td>
                        <td>{id_2.toFixed(4)}</td>
                        <td>{x[o.Stress_2].value.toFixed(0)}</td>
                        <td>{x[o.FS_2].value.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td>Solid</td>
                        <td>{x[o.L_Solid].value.toFixed(3)}</td>
                        <td>0.0</td>
                        <td>{x[o.Force_Solid].value.toFixed(2)}</td>
                        <td>{od_solid.toFixed(4)}</td>
                        <td>0.0</td>
                        <td>{x[o.Stress_Solid].value.toFixed(0)}</td>
                        <td>{x[o.FS_Solid].value.toFixed(3)}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Wire Length</td>
                        <td>=</td>
                        <td>{wire_len_t.toFixed(3)}</td>
                        <td>{p[o.L_Free].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>Wire Length</td>
                        <td>=</td>
                        <td>{wire_len_t.toFixed(3)}</td>
                        <td>{p[o.L_Free].units}</td>
                    </tr>
                    <tr>
                        <td>{p[o.Wire_Dia].name}</td>
                        <td>=</td>
                        <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                        <td>{p[o.Wire_Dia].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>{x[o.End_Type].name}</td>
                        <td>=</td>
                        <td>{x[o.End_Type].value}</td>
                        <td>{x[o.End_Type].units}</td>
                    </tr>
                    <tr>
                        <td>Pitch</td>
                        <td>=</td>
                        <td>{pitch.toFixed(3)}</td>
                        <td>{p[o.L_Free].units}</td>
                        <td/>
                        <td>&nbsp;</td>
                        <td>{p[o.Coils_T].name}</td>
                        <td>=</td>
                        <td>{p[o.Coils_T].value.toFixed(3)}</td>
                        <td>{p[o.Coils_T].units}</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}
