import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Vehicles from './Vehicles';
import Citizens from './Citizens';
import AddWanted from './AddWanted';
import ManageCitizen from './ManageCitizen';
import AddCriminalRecord from './AddCriminalRecord';

function MainContent() {
  return (
    <div className="bg-gray-900 w-full h-full p-6 overflow-auto">
      <Routes>
        {/* Ruta por defecto */}
        <Route path="*" element={<Dashboard/>} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/citizens" element={<Citizens />} />
        <Route path="/add-wanted" element={<AddWanted />} />
        <Route path="/add-criminal-record/:id" element={<AddCriminalRecord />} />
        <Route path="/citizen/:id" element={<ManageCitizen />} />
      </Routes>
    </div>
  );
}

export default MainContent;