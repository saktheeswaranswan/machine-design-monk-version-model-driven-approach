import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report1 extends ReportBase {

    constructor(props) {
        super(props);
//        console.log('In Report1.constructor this=',this,'props=',props);
    }

    render() {
        super.render();
//        console.log('In Report1.render this.props=',this.props);

        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Extension Spring Report</h4><br />
                <b>
                {this.hits > 0 && this.errmsg}{this.hits > 0 && <br />}
                {this.hits > 0 && this.startpntmsg}{this.hits > 0 && <br />}
                </b>
                {this.hits > 0 && this.NaNmsg}{this.hits > 0 && <br />}
                {this.hits > 0 && <br />}
                <table>
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Wire_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.End_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Coils_T].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_T].value.toFixed(3)}</td>
                            <td>{"total " + this.props.symbol_table[o.Coils_T].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Rate].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Coils_A].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_A].value.toFixed(3)}</td>
                            <td>{"active " + this.props.symbol_table[o.Coils_A].units}</td>
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
                            <th>Force</th>
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
                            <td><b>Initial</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Initial_Tension].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.OD_Free].value.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.ID_Free].value.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Initial].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_Initial].value).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.od_1.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.id_1.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.fs_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.od_2.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.id_2.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>MaxSafe</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(this.props.symbol_table[o.L_Free].value + this.safe_travel).toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.safe_travel.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.safe_load.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.od_maxsafe.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.id_maxsafe.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(1.0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td>Safe Load</td>
                            <td>=</td>
                            <td>{this.safe_load.toFixed(3)}</td>
                            <td>{this.safe_load_u}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td>{this.wire_len_t.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_Free].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.L_Stroke].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.L_Stroke].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_Stroke].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Weight].name}</td>
                            <td>=</td>
                            <td>{this.wgt1000.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Weight].units}</td>
                            <td>{this.wgt1000_u}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td>{this.cycle_life_u}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>({this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>&nbsp;</td>
                            <td className="text-left" colSpan="3">applies to body coils only.)</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                Deflection at load point 2 is {this.pc_avail_deflect.toFixed(0)}% of total safe deflection.<br />
                <br />
                <pre>
                |&lt;--------------------------- {this.props.symbol_table[o.L_Free].name} (w/ends) = {this.props.symbol_table[o.L_Free].value.toFixed(3)} ---------------------------&gt;|<br />
                |&lt;--- {this.props.symbol_table[o.L_End].name} ---&gt;|&lt;--- {this.props.symbol_table[o.L_Body].name} ---&gt;|&lt;--- {this.props.symbol_table[o.End_Extension].name} ---&gt;|&lt;--- {this.props.symbol_table[o.L_Extended_End].name} ---&gt;|<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_End].value.toFixed(3)}      
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_Body].value.toFixed(3)}      
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.End_Extension].value.toFixed(3)}     
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_Extended_End].value.toFixed(3)} 
                </pre>
                <br /> 
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report1);
