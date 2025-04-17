import React, { useState, useEffect } from "react";
import Brand from "~/SubRoutes/FuelManagement/Brand";
import Lubricant from "./Lubricant";
import LubeType from "./LubeType";

const LubesMaster = () => {
  const [view, setView] = useState("lubricants");
  const [lubricants, setLubricants] = useState([]);
  const [brands, setBrands] = useState([]);
  const [lubeTypes, setLubeTypes] = useState([]);

  const gotoLubricants = () => setView("lubricants");
  const gotoBrands = () => setView("brands");
  const gotoLubeTypes = () => setView("lubeTypes");

  return (
    <>
      {view === "lubricants" && 
      <Lubricant 
        key={`lubricants-${Date.now()}`} 
        onDataChange={setLubricants} 
        gotoBrands={gotoBrands} 
        gotoLubeTypes={gotoLubeTypes} 
      />}
      {view === "brands" && 
      <Brand 
        key={`brands-${Date.now()}`} 
        onDataChange={setBrands} 
        gotoLubricants={gotoLubricants} 
      />}
      {view === "lubeTypes" && 
      <LubeType 
        key={`lubeTypes-${Date.now()}`} 
        onDataChange={setLubeTypes} 
        gotoLubricants={gotoLubricants} 
      />}
    </>
  );
};

export default LubesMaster;
