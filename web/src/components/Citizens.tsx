import React, { useState } from 'react'
import Header from './Header'
import Button from './Button'
import { Link } from 'react-router-dom'
import { fetchNui } from '../utils/fetchNui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faImage, faGear } from '@fortawesome/free-solid-svg-icons'
import ImageWithFallback from './ImageWithFallback'
import { Locale } from '../utils/locale';

interface CitizenData {
  identifier: string,
  mdt_image: string,
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
            <th className='px-4 py-2 w-2/12'>{Locale.ui_photo}</th>
            <th className='px-4 py-2 w-3/12'>{Locale.ui_full_name}</th>
            <th className='px-4 py-2 w-3/12'>{Locale.ui_birthday}</th>
            <th className='px-4 py-2 w-2/12'>{Locale.ui_sex}</th>
            <th className='px-4 py-2 w-2/12'>{Locale.ui_action}</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-800'>
          {
            data.map((citizen, index) => (
              <tr key={index}>
                <td className='px-4 py-2'>
                  <ImageWithFallback src={citizen.mdt_image} rounded='full' icon={faUser} />
                </td>
                <td className='px-4 py-2'>{citizen.firstname} {citizen.lastname}</td>
                <td className='px-4 py-2'>{citizen.dateofbirth}</td>
                <td className='px-4 py-2'>
                  {citizen.sex === 'm' ? Locale.ui_male :
                    citizen.sex === 'f' ? Locale.ui_female : Locale.ui_other}
                </td>
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
      //   mdt_image: '',
      //   firstname: 'Gabriel',
      //   lastname: 'Varas',
      //   dateofbirth: '10-10-2023',
      //   sex: 'm'
      // }])
    })
  }

  return (
    <div>
      <Header title={Locale.ui_citizens} description={Locale.ui_citizens_description} />
      <main className='w-full mt-4'>
        <label htmlFor='search_plate' className='font-semibold leading-7'><FontAwesomeIcon icon={faUser} /> {Locale.ui_search_citizen}</label>
        <p className='text-gray-400 leading-6'>{Locale.ui_search_citizen_description}</p>
        <div className='flex gap-2 mt-2'>
          <input type="text" id='search_plate' value={searchName} onChange={handleInputChange} placeholder={Locale.ui_name_placeholder} className='w-4/5 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
          <Button onClick={getCitizenData} icon={faMagnifyingGlass} text={Locale.ui_search} width='w-1/5' />
        </div>
      </main>
      {citizenData && <Citizen data={citizenData} />}
    </div>
  )
}

export default Citizens