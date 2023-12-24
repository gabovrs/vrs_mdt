import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCarSide, faTable } from '@fortawesome/free-solid-svg-icons'
import { fetchNui } from '../utils/fetchNui'
import Header from './Header'
import Button from './Button'
import { Locale } from '../utils/locale';

const Vehicle = ({ data }: any) => {
  return (
    <div className='mt-4'>
      <div className='w-full p-4 rounded-lg border border-gray-800'>
        <h1 className='text-base font-semibold text-white-100 leading-7'><FontAwesomeIcon icon={faTable} /> {Locale.ui_vehicle_data}</h1>
        <p className='text-gray-400 leading-6'>{Locale.ui_vehicle_data_description}</p>
        <div className='mt-2 border-t border-gray-800'>
          <dl className='divide-y divide-gray-800'>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">{Locale.ui_plate}</dt>
              <dd className="text-sm text-gray-400">{data.plate}</dd>
            </div>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">{Locale.ui_owner}</dt>
              <dd className="text-sm text-gray-400">{data.firstName} {data.lastName}</dd>
            </div>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">{Locale.ui_brand}</dt>
              <dd className="text-sm text-gray-400">{data.brand}</dd>
            </div>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">{Locale.ui_model}</dt>
              <dd className="text-sm text-gray-400">{data.model}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

interface VehicleData {
  firstName: string;
  lastName: string;
  plate: string;
  brand: string;
  model: string;
}

const Vehicles = () => {
  const [searchPlate, setSearchPlate] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const handleInputChange = (event: any) => {
    setSearchPlate(event.target.value);
  };

  const getVehicleData = () => {
    if (!searchPlate) return;
    fetchNui('getVehicleData', { plate: searchPlate }).then(data => {
      setVehicleData(data)
    }).catch(e => {
      // setVehicleData({ firstName: 'Gabriel', lastName: 'Varas', plate: searchPlate, brand: 'Ford', model: 'Fiesta'})
    })
  }

  return (
    <div>
      <Header title={Locale.ui_vehicles} description={Locale.ui_vehicles_description} />
      <main className='w-full mt-4'>
        <label htmlFor='search_plate' className='font-semibold leading-7'><FontAwesomeIcon icon={faCarSide} /> {Locale.ui_search_vehicle}</label>
        <p className='text-gray-400 leading-6'>{Locale.ui_search_vehicle_description}</p>
        <div className='flex gap-2 mt-2'>
          <input type="text" id='search_plate' value={searchPlate} onChange={handleInputChange} placeholder='ej. CLE00000' className='w-4/5 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
          <Button onClick={getVehicleData} icon={faMagnifyingGlass} text={Locale.ui_search} width='w-1/5' />
        </div>
      </main>
      {vehicleData && <Vehicle data={vehicleData} />}
    </div>
  )
}

export default Vehicles
