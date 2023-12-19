import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCarSide, faTable } from '@fortawesome/free-solid-svg-icons'
import { fetchNui } from '../utils/fetchNui'
import Header from './Header'
import Button from './Button'

const Vehicle = ({ data }:any) => {
  return (
    <div className='mt-4'>
      <div className='w-full p-4 rounded-lg border border-gray-800'>
        <h1 className='text-base font-semibold text-white-100 leading-7'><FontAwesomeIcon icon={faTable}/> Información</h1>
        <p className='text-gray-400 leading-6'>Datos sobre el vehículo.</p>
        <div className='mt-2 border-t border-gray-800'>
          <dl className='divide-y divide-gray-800'>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">Matricula</dt>
              <dd className="text-sm text-gray-400">{data.plate}</dd>
            </div>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">Titular</dt>
              <dd className="text-sm text-gray-400">{data.firstName} {data.lastName}</dd>
            </div>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">Marca</dt>
              <dd className="text-sm text-gray-400">{data.brand}</dd>
            </div>
            <div className="py-3 grid grid-cols-2">
              <dt className="text-sm font-medium">Modelo</dt>
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
      <Header title='Vehículos' description='Aca puedes ver la información sobre los vehículos registrados.'/>
      <main className='w-full mt-4'>
        <label htmlFor='search_plate' className='font-semibold leading-7'><FontAwesomeIcon icon={faCarSide} /> Buscar vehículo</label>
        <p className='text-gray-400 leading-6'>Ingresa la placa del vehículo a buscar.</p>
        <div className='flex gap-2 mt-2'>
          <input type="text" id='search_plate' value={searchPlate} onChange={handleInputChange} placeholder='ej. CLE00000' className='w-4/5 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
          <Button onClick={getVehicleData} icon={faMagnifyingGlass} text='Buscar' width='w-1/5' />
        </div>
      </main>
      {vehicleData && <Vehicle data={vehicleData} />}
    </div>
  )
}

export default Vehicles
