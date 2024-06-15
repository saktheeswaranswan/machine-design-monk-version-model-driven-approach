import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SymbolUnits({ className, element, index }) {
//  console.log('SymbolUnits - Mounting...','element=',element,'index=',index);
  const system_controls = useSelector((state) => state.modelSlice.model.system_controls);

  return (
    <>
      <td className={"text-nowrap align-middle " + (system_controls.show_units ? "" : "d-none") + (className !== undefined ? className : '')} id={'su_' + element.name}>
        {element.units}
      </td>
    </>
  );
}
