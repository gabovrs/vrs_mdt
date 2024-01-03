import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faImage, faTrash, faSkullCrossbones, faUserTie } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'
import DataContext from './DataContext'
import Button from './Button'
import { Link } from 'react-router-dom';
import { fetchNui } from '../utils/fetchNui'
import ImageWithFallback from './ImageWithFallback'
import { Locale } from '../utils/locale'

const Dashboard = () => {
  const data: any = useContext(DataContext)

  const deleteWantedPlayer = (index: number, id: number) => {
    fetchNui('removeWantedPlayer', {index, id})
  }

  return (
    <div>
      <Header title={Locale.ui_home || 'ui_home'} description={Locale.ui_home_description || 'ui_home_description'} />
      <main>
        <div className='mt-2'>
          <div className='flex gap-2'>
            <div className='w-1/4 flex items-center justify-center'>
              <div className='w-1/2'>
                <ImageWithFallback src={data?.playerImage} rounded='full' outline icon={faUserTie} />
              </div>
            </div>
            <div className='w-3/4 flex items-center justify-center py-6'>
              <div className='grid grid-cols-3 divide-x divide-gray-700 bg-gray-800 border border-gray-700 w-full h-full rounded-lg p-4'>
                <div className='px-4 py-2'>
                  <p className='text-gray-400 font-medium'>{Locale.ui_officers_on_duty || 'ui_officers_on_duty'}</p>
                  <h1 className='text-3xl font-bold'>{data?.playersInService || '0'}</h1>
                </div>
                <div className='px-4 py-2'>
                  <p className='text-gray-400 font-medium'>{Locale.ui_time_in_service || 'ui_time_in_service'}</p>
                  <h1 className='text-3xl font-bold'>{data?.minsInService || '0'} <span className='text-sm text-gray-400 font-medium'>min</span></h1>
                </div>
                <div className='px-4 py-2'>
                  <p className='text-gray-400 font-medium'>{Locale.ui_wanted_people || 'ui_wanted_people'}</p>
                  <h1 className='text-3xl font-bold'>{data?.wantedPlayers.length || '0'}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='font-semibold leading-7'><FontAwesomeIcon icon={faSkullCrossbones} /> {Locale.ui_wanted_people || 'ui_wanted_people'}</h1>
              <p className='text-gray-400 leading-6'>{Locale.ui_wanted_people_description || 'ui_wanted_people_description'}</p>
            </div>
            <Link to='/add-wanted'>
              <Button icon={faSquarePlus} text={Locale.ui_add_record || 'ui_add_record'} />
            </Link>
          </div>
          {data?.wantedPlayers && data?.wantedPlayers.length > 0 ?
            <div className='rounded-lg overflow-x-auto mt-4'>
              <table className="table-auto w-full text-left">
                <thead className='bg-gray-700 text-gray-400'>
                  <tr>
                    <th className='px-4 py-2'>{Locale.ui_individual || 'ui_individual'}</th>
                    <th className='px-4 py-2'>{Locale.ui_reason || 'ui_reason'}</th>
                    <th className='px-4 py-2 w-40'>{Locale.ui_image || 'ui_image'}</th>
                    <th className='px-4 py-2 w-0'>{Locale.ui_action || 'ui_action'}</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-700 bg-gray-800'>
                  {data.wantedPlayers.map((data: any, index: number) => (
                    <tr key={index} >
                      <td className='px-4 py-2 font-bold'>{data.name}</td>
                      <td className='px-4 py-2 text-gray-400'>{data.reason}</td>
                      <td className='px-4 py-2'>
                        <ImageWithFallback src={data.image} />
                      </td>
                      <td className='px-4 py-2'>
                        <Button icon={faTrash} onClick={() => deleteWantedPlayer(index, data.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            :
            <div className='flex items-center mt-4 justify-center bg-gray-800 h-24 rounded-lg border border-gray-700'>
              <p className='text-gray-400 font-semibold'>{Locale.ui_no_wanted_people}</p>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default Dashboard