import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report3 extends ReportBase {

    render() {
        super.render();
//        console.log('In Report3.render this.props=',this.props);
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Torsion Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></h4>
                <br />
                <table id="view1" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.labels[o.Contact_person].name}:</td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Contact_person].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Phone___email].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Phone___email].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Company_name].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Company_name].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Date].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Date].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Street].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Street].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Part_Number].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Part_Number].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.City__State___Zip].name}: </td>
                            <td/>
                            <td  className="text-left" width="30%">{this.props.labels[o.City__State___Zip].value}</td>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <b>{this.props.labels[o.COMMENT].name}: &nbsp; </b> {this.props.labels[o.COMMENT].value} <br/>
                <br/>
                <table id="view2" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="3">{this.matTypeValue}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.End_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.ASTM_Fed_Spec].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="3">{this.astmFedSpecValue}</td>
                        </tr>
                            <tr>
                            <td>{this.props.symbol_table[o.Wire_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Wire_Dia].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.tensileFixed0}</td>
                            <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Mean_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Mean_Dia].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Mean_Dia].units}</td>
                            <td/>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td>{this.wire_len_t.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Body].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Weight].name}</td>
                            <td>=</td>
                            <td>{this.wgt1000.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Weight].units}</td>
                            <td className="text-left">{this.wgt1000_u}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Coils_T].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_T].value.toFixed(3)}</td>
                            <td className="text-left">{"total " + this.props.symbol_table[o.Coils_T].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.End_Angle_Free].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.End_Angle_Free].value.toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.End_Angle_Free].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Coils_A].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_A].value.toFixed(3)}</td>
                            <td className="text-left">{"active " + this.props.symbol_table[o.Coils_A].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
                        </tr>
                        <tr>
                            <td>Pitch</td>
                            <td>=</td>
                            <td>{this.pitch.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Body].units}</td>
                            <td/>
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{this.hlx_ang.toFixed(2)}</td>
                            <td className="text-left">degrees</td>
                        </tr>
                        <tr>
                            <td>Safe Load</td>
                            <td>=</td>
                            <td>{this.safe_load.toFixed(3)}</td>
                            <td className="text-left">{this.safe_load_u}</td>
                            <td/>
                            <td>Safe Travel</td>
                            <td>=</td>
                            <td>{this.safe_travel.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Arm_2].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Arm_2].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Arm_2].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Cycle_Life].units}</td>
                            <td className="text-left">(est.)</td> 
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Force_Arm_2].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Force_Arm_2].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Force_Arm_2].units}</td>
                            <td/>
                            <td>({this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td className="text-left" colSpan="4">applies to body coils only.)</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table">
                    <thead>
                        <tr>
                            <th/>
                            <th className="text-right" width="15%">Free </th>
                            <th className="text-right" width="15%">1st Load</th>
                            <th className="text-right" width="15%">2nd Load</th>
                            <th className="text-right" width="15%">Max Safe</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Moment</b></td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.M_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.M_2].value.toFixed(3)}</td>
                            <td>{this.safe_load.toFixed(3)}</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.M_1].units}</td>
                        </tr>
                        <tr>
                            <td><b>Length</b></td>
                            <td>{this.props.symbol_table[o.L_Body].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.l_max.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_1].units}</td>
                        </tr>
                        <tr>
                            <td><b>Deflection</b></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(2)}</td>
                            <td>{this.def_max.toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td><b>Outside Dia.</b></td>
                            <td>{this.props.symbol_table[o.OD_Free].value.toFixed(3)}</td>
                            <td>{this.od_1.toFixed(3)}</td>
                            <td>{this.od_2.toFixed(3)}</td>
                            <td>{this.od_max.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.OD_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Inside Dia.</b></td>
                            <td>{this.props.symbol_table[o.ID_Free].value.toFixed(3)}</td>
                            <td>{this.id_1.toFixed(3)}</td>
                            <td>{this.id_2.toFixed(3)}</td>
                            <td>{(this.od_max - 2.0 * this.props.symbol_table[o.Wire_Dia].value).toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.ID_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Stress*</b></td>
                            <td></td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td><b>% Tensile*</b></td>
                            <td></td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value / this.dhat).toFixed(1)}</td>
                            <td className="text-left">{this.props.symbol_table[o.PC_Ten_Bnd_Stat].units}</td>
                        </tr>
                        <tr>
                            <td><b>Static F.S.*</b></td>
                            <td></td>
                            <td>{this.fs_1.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            <td>{1.0.toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                        <tr>
                            <td/>
                            <td className="text-left" colSpan="2"><b>*</b> kb = {this.kb.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                Deflection at load point 2 is {(100.0 * this.props.symbol_table[o.Deflect_2].value / this.def_max).toFixed(0)}% of total safe deflection.<br />
                <hr/>
                <table id="view4" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Data_Source].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Data_Source].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Mandril].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Mandril].value}</td>
                            <td className="text-left">{this.props.symbol_table[o.ID_Free].units}</td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Wind].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="2">{this.props.labels[o.Wind].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Shot_peen].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Shot_peen].value}</td>
                            <td colSpan="3" className="text-left">{"(calculations assume: " + this.peenValue + ")"}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Stress_relieve_HT].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Stress_relieve_HT].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Relative_end_pos____tol_].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Relative_end_pos____tol_].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Finish].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Finish].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.End_use].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.End_use].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Operating_temp].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Operating_temp].value}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Special_notes___tol].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Special_notes___tol].value}</td>
                        </tr>
                        <tr>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view5" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-center" colSpan="2">approved for mfg.</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td className="text-center" colSpan="2">approved for mfg.</td>
                            <td/>
                        </tr>
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                        <tr>
                            <td colSpan="2">by __________________________ &nbsp; </td>
                            <td>date _______</td>
                            <td> &nbsp; &nbsp; </td>
                            <td colSpan="2">by __________________________ &nbsp; </td>
                            <td>date _______</td>
                        </tr>
                    </tbody>
                </table>
            <br/>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
    labels: state.model.labels,
});

export default connect(mapStateToProps)(Report3);
