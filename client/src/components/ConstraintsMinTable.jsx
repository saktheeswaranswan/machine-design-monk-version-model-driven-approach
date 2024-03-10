import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap';
import ConstraintsMinHeaderIndependentVariable from './ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from './ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';

export default function ConstraintsMinTable() {
//  console.log("ConstraintsMinTable - Mounting...");
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);

  useEffect(() => {
//    console.log("ConstraintsMinTable - Mounted");
//    return () => console.log("ConstraintsMinTable - Unmounting ...");
    return () => {};
  }, []);

  return (
    <>
      <Table id="cmnt" className="table-light border border-secondary">
        <ConstraintsMinHeaderIndependentVariable />
        {symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={index} />)}
        <ConstraintsMinHeaderDependentVariable />
        {symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMinRowDependentVariable key={element.name} element={element} index={index} />)}
      </Table>
    </>
  );
}
