import React, { useState, useEffect, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import { fetchNui } from '../utils/fetchNui'
import ImageWithFallback from './ImageWithFallback'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faSquarePlus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Button from './Button'
import { Locale } from '../utils/locale';

interface CriminalRecord {
  description: string
  fine: number
  crimes: string[]
  jail: number
  date: string
}

interface CitizenData {
  identifier: any
  mdt_image: string
  firstname: string
  lastname: string
  dateofbirth: string
  sex: string
  criminalRecord: CriminalRecord[]
}

const ManageCitizen = () => {
  const { id } = useParams();
  const [citizenData, setCitizenData] = useState<CitizenData | null>(null);

  const updateProfileImage = () => {
    fetchNui('updateProfileImage', { identifier: id, image: citizenData?.mdt_image  })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!citizenData) return
    setCitizenData({
      ...citizenData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    fetchNui('getCitizenDetails', { identifier: id }).then(data => {
      setCitizenData(data);
    }).catch(e => {
      // setCitizenData({
      //   identifier: id,
      //   mdt_image: '',
      //   firstname: 'Gabriel',
      //   lastname: 'Varas',
      //   dateofbirth: '11-11-2023',
      //   sex: 'm',
      //   criminalRecord: [
      //     {
      //       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      //       fine: 200,
      //       crimes: ['["Crimen name"]'],
      //       jail: 10,
      //       date: 'string',
      //     },
      //     {
      //       description: 'Lorem ipsum dolor sit amet, consectetur.',
      //       fine: 200,
      //       crimes: ['["Crimen name"]'],
      //       jail: 10,
      //       date: 'string',
      //     }
      //   ]
      // })
    });
  }, [id]);

  return (
    citizenData ? (
      <div>
        <Header title={Locale.ui_manage_citizen} description={Locale.ui_manage_citizen_description + citizenData?.firstname + ' ' + citizenData?.lastname} />
        <main className='flex gap-4 mt-2'>
          <div className='w-1/3'>
            <ImageWithFallback src={citizenData.mdt_image} />
            <div className='flex mt-2 gap-2'>
              <input type='text' name='mdt_image' placeholder={Locale.ui_image_url_placeholder} value={citizenData.mdt_image} onChange={handleInputChange} className='w-4/5 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              <Button width='w-1/5' icon={faFloppyDisk} onClick={updateProfileImage} />
            </div>
          </div>
          <div className='w-full'>
            <div className='p-4 rounded-lg border border-gray-800'>
              <h1 className='text-base font-semibold text-white-100 leading-7'><FontAwesomeIcon icon={faTable} /> {Locale.ui_citizen_data}</h1>
              <p className='text-gray-400 leading-6'>{Locale.ui_citizen_data_description}</p>
              <div className='mt-2 border-t border-gray-800'>
                <dl className='divide-y divide-gray-800'>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>{Locale.ui_identifier}</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.identifier}</dd>
                  </div>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>{Locale.ui_firstname}</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.firstname}</dd>
                  </div>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>{Locale.ui_lastname}</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.lastname}</dd>
                  </div>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>{Locale.ui_birthday}</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.dateofbirth}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
        <div className='flex justify-between items-center mt-4'>
          <div>
            <h1 className='font-semibold leading-7'><FontAwesomeIcon icon={faTable} /> {Locale.ui_criminal_record}</h1>
            <p className='text-gray-400 leading-6'>{Locale.ui_criminal_record_description + citizenData?.firstname + ' ' + citizenData?.lastname}</p>
          </div>
          <Link to={`/add-criminal-record/${citizenData.identifier}`}>
            <Button icon={faSquarePlus} text={Locale.ui_add_criminal_record} />
          </Link>
        </div>
        {citizenData.criminalRecord.length > 0 ? (
          <div className='mt-4 rounded-lg overflow-hidden border border-gray-700'>
            <table className='table-auto border-collapse w-full text-left'>
              <thead className='bg-gray-800'>
                <tr>
                  <th className='px-4 py-2'>{Locale.ui_description}</th>
                  <th className='px-4 py-2'>{Locale.ui_fine}</th>
                  <th className='px-4 py-2'>{Locale.ui_crimes}</th>
                  <th className='px-4 py-2'>{Locale.ui_sentence}</th>
                  <th className='px-4 py-2'>{Locale.ui_date}</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-800'>
                {citizenData.criminalRecord.map((data: any, index: number) => (
                  <tr key={index} >
                    <td className='px-4 py-2 text-gray-400'>{data.description}</td>
                    <td className='px-4 py-2 text-gray-400'>${data.fine}</td>
                    <td className='px-4 py-2 text-gray-400'>
                      <ul className='list-disc list-inside'>
                        {JSON.parse(data.crimes).map((crime: string, index: number) => (
                          <li key={index}>{crime}</li>
                        ))}
                      </ul>
                    </td>
                    <td className='px-4 py-2 text-gray-400'>{data.jail > 0 ? `${data.jail}m` : Locale.ui_no_sentence}</td>
                    <td className='px-4 py-2 text-gray-400'>{new Date(data.created_at).toLocaleDateString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex items-center mt-4 justify-center bg-gray-800 h-24 rounded-lg border border-gray-700'>
            <p className='text-gray-400 font-semibold'>{Locale.ui_no_criminal_record}</p>
          </div>
        )
        }
      </div>
    )
      : (
        <div>
          {Locale.ui_loading}
        </div>
      )
  )
}

export default ManageCitizen
