import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { debugData } from "../utils/debugData";
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useNuiEvent } from "../hooks/useNuiEvent"
import { fetchNui } from '../utils/fetchNui';
import DataContext from './DataContext';
import frame from '../images/frame.png';
import { Locale } from '../utils/locale';
import { Fine } from '../utils/fine';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

debugData([
  {
    action: 'setupMDT',
    data: {
      language: 'es',
    },
  }
])

debugData([
  {
    action: 'setData',
    data: {
      playerName: 'Gabriel Varas',
      playerImage: 'https://cdn.discordapp.com/attachments/1013593433471975434/1133224117894660137/image.png',
      jobGrade: 'Sargento 1ro',
      playersInService: 2,
      minsInService: 10,
      wantedPlayers: [
        {name: 'Gabriel Varas', reason: 'lorem ipsum', image: 'https://cdn.discordapp.com/attachments/1055670950735138866/1133178286504161390/image.png'},
        {name: 'Amaru Salgado', reason: 'lorem ipsum'}
      ]
    }
  }
])

const App: React.FC = () => {
  const [data, setData] = useState(null)

  fetchNui('uiLoaded', {});
  useNuiEvent('setData', setData)
  useNuiEvent('setupMDT', ({ locales, fines }) => {
    for (const key in locales) Locale[key] = locales[key]
    Fine.push(...fines)
  })
  
  return (
    <Router>
      <div className='flex items-center justify-center h-screen'>
        <img src={frame} className='relative w-[83rem] h-[54rem] drop-shadow-lg' />
        <div className="absolute flex w-[75rem] h-[45rem] text-gray-100 rounded-xl overflow-hidden shadow-inner-lg">
          <DataContext.Provider value={data}>
            <Sidebar />
            <MainContent />
          </DataContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
