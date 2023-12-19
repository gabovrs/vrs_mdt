import React, { useState } from 'react'
import Header from './Header'
import Button from './Button'
import { Link } from 'react-router-dom'
import { fetchNui } from '../utils/fetchNui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faImage, faGear } from '@fortawesome/free-solid-svg-icons'
import ImageWithFallback from './ImageWithFallback'

interface CitizenData {
  identifier: string,
  image: string,
  firstname: string,
  lastname: string,
  dateofbirth: string,
  sex: string,
}

const Citizen = ({ data }: { data: CitizenData[] }) => {
  return (
    <div className='rounded-lg overflow-x-auto border border-gray-700 mt-4'>
      <table className="table-auto w-full text-left">
        <thead className='border-b border-gray-800 bg-gray-800'>
          <tr>
            <th className='px-4 py-2 w-2/12'>Foto</th>
            <th className='px-4 py-2 w-3/12'>Nombre completo</th>
            <th className='px-4 py-2 w-3/12'>Nacimiento</th>
            <th className='px-4 py-2 w-2/12'>Sexo</th>
            <th className='px-4 py-2 w-2/12'>Acción</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-800'>
          {
            data.map((citizen, index) => (
              <tr key={index}>
                <td className='px-4 py-2'>
                  <ImageWithFallback src={citizen.image} rounded='full' icon={faUser} />
                </td>
                <td className='px-4 py-2'>{citizen.firstname} {citizen.lastname}</td>
                <td className='px-4 py-2'>{citizen.dateofbirth}</td>
                <td className='px-4 py-2'>{citizen.sex === 'm' ? 'Masculino' : 'Femenino'}</td>
                <td className='px-4 py-2'>
                  <Link to={`/citizen/${citizen.identifier}`}>
                    <Button icon={faGear} />
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}


const Citizens = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [citizenData, setCitizenData] = useState<CitizenData[] | null>(null);

  const handleInputChange = (event: any) => {
    setSearchName(event.target.value);
  };

  const getCitizenData = () => {
    if (!searchName) return;
    fetchNui('getCitizenData', { name: searchName }).then(data => {
      setCitizenData(data)
    }).catch(e => {
      // setCitizenData([{
      //   identifier: 'customidentifier',
      //   image: '',
      //   firstname: 'Gabriel',
      //   lastname: 'Varas',
      //   dateofbirth: '10-10-2023',
      //   sex: 'm'
      // }])
    })
  }

  return (
    <div>
      <Header title='Ciudadanos' description='Aca puedes ver la información sobre los ciudadanos de Chile Empire.' />
      <main className='w-full mt-4'>
        <label htmlFor='search_plate' className='font-semibold leading-7'><FontAwesomeIcon icon={faUser} /> Buscar ciudadano</label>
        <p className='text-gray-400 leading-6'>Ingresa el nombre y apellido de la persona a buscar.</p>
        <div className='flex gap-2 mt-2'>
          <input type="text" id='search_plate' value={searchName} onChange={handleInputChange} placeholder='ej. Nombre Apellido' className='w-4/5 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
          <Button onClick={getCitizenData} icon={faMagnifyingGlass} text='Buscar' width='w-1/5' />
        </div>
      </main>
      {citizenData && <Citizen data={citizenData} />}
    </div>
  )
}

export default Citizens