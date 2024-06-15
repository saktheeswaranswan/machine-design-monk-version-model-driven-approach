import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, InputGroup, Form } from 'react-bootstrap';
import ReportBaseContext from './ReportBaseContext';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import SymbolValueWireDia from '../SymbolValueWireDia';
import ValueName from '../../../components/ValueName';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';

export default function Calculator() {
//  console.log('Calculator - Mounting...');
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const base = useContext(ReportBaseContext);
//  console.log('Calculator','base=',base);

  return (
    <Container>
      <Row>
        <table className="w-50 report-table">
          <tbody>
            <tr>
              <SymbolName element={symbol_table[o.Material_Type]} index={o.Material_Type} />
              {symbol_table[o.Prop_Calc_Method].value === 1 ?
                <SymbolValue element={symbol_table[o.Material_Type]} index={o.Material_Type} />
                :
                <Value id="Material_Type" value={base.matTypeValue} />
              }
              <SymbolUnits element={symbol_table[o.Material_Type]} index={o.Material_Type} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={symbol_table[o.End_Type]} index={o.End_Type} />
              <SymbolValue element={symbol_table[o.End_Type]} index={o.End_Type} />
              <SymbolUnits element={symbol_table[o.End_Type]} index={o.End_Type} className="text-start" />
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <table className="w-100 report-table">
          <thead>
            <tr>
              <th></th>
              <ValueName name={<><b>Length</b><br />{symbol_table[o.L_1].units}</>} tooltip="Length at free point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Deflection</b><br />{symbol_table[o.Deflect_1].units}</>} tooltip="Deflection at free point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Moment</b><br />{symbol_table[o.M_1].units}</>} tooltip="Moment at free point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>OD</b><br />{symbol_table[o.OD_Free].units}</>} tooltip="Outside Diameter at free point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>ID</b><br />{symbol_table[o.ID_Free].units}</>} tooltip="Inside Diameter at free point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Stress</b><br />{symbol_table[o.Stress_1].units}</>} tooltip="Stress at free point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Static FS</b><br />{symbol_table[o.FS_2].units}</>} tooltip="Static Factor of Safety at free point, point 1, point 2 and maximum safe point" className="text-center" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <ValueName name={<b>Free</b>} tooltip="Free or no torsion point" />
              <SymbolValue element={symbol_table[o.L_Body]} index={o.L_Body} />
              <Value id="Deflection_Free" value={0.0} />
              <Value id="Moment_Free" value={0.0} />
              <SymbolValue element={symbol_table[o.OD_Free]} index={o.OD_Free} />
              <SymbolValue element={symbol_table[o.ID_Free]} index={o.ID_Free} />
              <Value id="Stress_Free" value={0.0} />
              <td className="align-middle">
                <InputGroup>
                  <Form.Control type="text" disabled={true} className="text-end text-muted" value={"Infinity"} />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <ValueName name={<b>1</b>} tooltip="Point 1 (minimum operating load)" />
              <SymbolValue element={symbol_table[o.L_1]} index={o.L_1} />
              <SymbolValue element={symbol_table[o.Deflect_1]} index={o.Deflect_1} />
              <SymbolValue element={symbol_table[o.M_1]} index={o.M_1} />
              <Value id="OD_1" value={base.od_1} />
              <Value id="ID_1" value={base.id_1} />
              <SymbolValue element={symbol_table[o.Stress_1]} index={o.Stress_1} />
              <Value id="Static_FS_1" value={base.fs_1} />
            </tr>
            <tr>
              <ValueName name={<b>2</b>} tooltip="Point 2 (maximum operating load)" />
              <SymbolValue element={symbol_table[o.L_2]} index={o.L_2} />
              <SymbolValue element={symbol_table[o.Deflect_2]} index={o.Deflect_2} />
              <SymbolValue element={symbol_table[o.M_2]} index={o.M_2} />
              <Value id="OD_2" value={base.od_2} />
              <Value id="ID_2" value={base.id_2} />
              <SymbolValue element={symbol_table[o.Stress_2]} index={o.Stress_2} />
              <SymbolValue element={symbol_table[o.FS_2]} index={o.FS_2} />
            </tr>
            <tr>
              <ValueName name={<b>Max Safe</b>} tooltip="Greatest static load that can be supported without exceeding maximum allowable stress (Stress_Lim_Bnd_Stat)" />
              <Value id="Length_Max_Safe" value={base.l_max} />
              <Value id="Deflection_Max_Safe" value={base.def_max} />
              <Value id="Force_Max_Safe" value={base.safe_load} />
              <Value id="OD_Max_Safe" value={base.od_max} />
              <Value id="ID_Max_Safe" value={base.od_max - (2.0 * symbol_table[o.Wire_Dia].value)} />
              <SymbolValue element={symbol_table[o.Stress_Lim_Bnd_Stat]} index={o.Stress_Lim_Bnd_Stat} />
              <Value id="Static_FS_Max_Safe" value={1.0} />
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <table className="w-75 report-table">
          <tbody>
            <tr>
              <SymbolName element={symbol_table[o.Stroke]} index={o.Stroke} />
              <SymbolValue element={symbol_table[o.Stroke]} index={o.Stroke} />
              <SymbolUnits element={symbol_table[o.Stroke]} index={o.Stroke} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
              <SymbolValueWireDia element={symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
              <SymbolUnits element={symbol_table[o.Wire_Dia]} index={o.Wire_Dia} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={symbol_table[o.Coils_T]} index={o.Coils_T} />
              <SymbolValue element={symbol_table[o.Coils_T]} index={o.Coils_T} />
              <SymbolUnits element={symbol_table[o.Coils_T]} index={o.Coils_T} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={symbol_table[o.Spring_Index]} index={o.Spring_Index} />
              <SymbolValue element={symbol_table[o.Spring_Index]} index={o.Spring_Index} />
              <SymbolUnits element={symbol_table[o.Spring_Index]} index={o.Spring_Index} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={symbol_table[o.Coils_A]} index={o.Coils_A} />
              <SymbolValue element={symbol_table[o.Coils_A]} index={o.Coils_A} />
              <SymbolUnits element={symbol_table[o.Coils_A]} index={o.Coils_A} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={symbol_table[o.Rate]} index={o.Rate} />
              <SymbolValue element={symbol_table[o.Rate]} index={o.Rate} />
              <SymbolUnits element={symbol_table[o.Rate]} index={o.Rate} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={symbol_table[o.Coil_Spacing]} index={o.Coil_Spacing} />
              <SymbolValue element={symbol_table[o.Coil_Spacing]} index={o.Coil_Spacing} />
              <SymbolUnits element={symbol_table[o.Coil_Spacing]} index={o.Coil_Spacing} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={symbol_table[o.Weight]} index={o.Weight} />
              <SymbolValue element={symbol_table[o.Weight]} index={o.Weight} />
              <SymbolUnits element={symbol_table[o.Weight]} index={o.Weight} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={symbol_table[o.End_Angle_Free]} index={o.End_Angle_Free} />
              <SymbolValue element={symbol_table[o.End_Angle_Free]} index={o.End_Angle_Free} />
              <SymbolUnits element={symbol_table[o.End_Angle_Free]} index={o.End_Angle_Free} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <ValueName name="Pitch" tooltip="Pitch is the distance between two adjacent coils" />
              <Value id="Pitch" value={base.pitch} />
              <SymbolUnits element={symbol_table[o.L_Body]} index={o.L_Body} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={symbol_table[o.Arm_2]} index={o.Arm_2} />
              <SymbolValue element={symbol_table[o.Arm_2]} index={o.Arm_2} />
              <SymbolUnits element={symbol_table[o.Arm_2]} index={o.Arm_2} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={symbol_table[o.Force_Arm_2]} index={o.Force_Arm_2} />
              <SymbolValue element={symbol_table[o.Force_Arm_2]} index={o.Force_Arm_2} />
              <SymbolUnits element={symbol_table[o.Force_Arm_2]} index={o.Force_Arm_2} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
              <SymbolValue element={symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
              <td className="text-start">{base.cycle_life_u}</td>
            </tr>
            <tr>
              <td />
              <td className="text-start" colSpan="2">({symbol_table[o.Cycle_Life].name} applies to body coils only.)</td>
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <table className="w-75 report-table">
          <tbody>
            <tr>
              <td>
                Deflection at point 2 (maximum operating load) is
              </td>
              <SymbolValue element={symbol_table[o.PC_Safe_Deflect]} index={o.PC_Safe_Deflect} />
              <td>
                % of total safe deflection.
              </td>
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
    </Container>
  );
}
