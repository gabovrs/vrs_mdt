import React, { useState, useEffect, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import { fetchNui } from '../utils/fetchNui'
import ImageWithFallback from './ImageWithFallback'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faSquarePlus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Button from './Button'

interface CriminalRecord {
  description: string
  fine: number
  crimes: string[]
  jail: number
  date: string
}

interface CitizenData {
  identifier: any
  image: string
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
    fetchNui('updateProfileImage', { identifier: id, image: citizenData?.image  })
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
      //   image: '',
      //   firstname: 'Gabriel',
      //   lastname: 'Varas',
      //   dateofbirth: '11-11-2023',
      //   sex: 'm',
      //   criminalRecord: [
      //     {
      //       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      //       fine: 200,
      //       crimes: ['Conducir ilegalmente fuera de carretera', 'Estacionar en lugar no apto', 'Conducir por el lado equivocado de la carretera'],
      //       jail: 10,
      //       date: 'string',
      //     },
      //     {
      //       description: 'Lorem ipsum dolor sit amet, consectetur.',
      //       fine: 200,
      //       crimes: ['Conducir ilegalmente fuera de carretera', 'Estacionar en lugar no apto', 'Conducir por el laaaaaaaaaado equivocado de la carretera', 'Conducir por el lado equivocado de la carretera'],
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
        <Header title='Administrar' description={`Datos y registro criminal de ${citizenData?.firstname} ${citizenData?.lastname}.`} />
        <main className='flex gap-4 mt-2'>
          <div className='w-1/3'>
            <ImageWithFallback src={citizenData.image} />
            <div className='flex mt-2 gap-2'>
              <input type='text' name='image' placeholder='Ingresa un URL valido' value={citizenData.image} onChange={handleInputChange} className='w-4/5 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              <Button width='w-1/5' icon={faFloppyDisk} onClick={updateProfileImage} />
            </div>
          </div>
          <div className='w-full'>
            <div className='p-4 rounded-lg border border-gray-800'>
              <h1 className='text-base font-semibold text-white-100 leading-7'><FontAwesomeIcon icon={faTable} /> Información</h1>
              <p className='text-gray-400 leading-6'>Datos personales del ciudadano.</p>
              <div className='mt-2 border-t border-gray-800'>
                <dl className='divide-y divide-gray-800'>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>Identificador</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.identifier}</dd>
                  </div>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>Nombre</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.firstname}</dd>
                  </div>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>Apellido</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.lastname}</dd>
                  </div>
                  <div className='py-3 grid grid-cols-2'>
                    <dt className='text-sm font-medium'>Fecha de nacimiento</dt>
                    <dd className='text-sm text-gray-400'>{citizenData.dateofbirth}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
        <div className='flex justify-between items-center mt-4'>
          <div>
            <h1 className='font-semibold leading-7'><FontAwesomeIcon icon={faTable} /> Registro criminal</h1>
            <p className='text-gray-400 leading-6'>Registro criminal de {citizenData.firstname} {citizenData.lastname}.</p>
          </div>
          <Link to={`/add-criminal-record/${citizenData.identifier}`}>
            <Button icon={faSquarePlus} text='Agregar registro criminal' />
          </Link>
        </div>
        {citizenData.criminalRecord.length > 0 ? (
          <div className='mt-4 rounded-lg overflow-hidden border border-gray-700'>
            <table className='table-auto border-collapse w-full text-left'>
              <thead className='bg-gray-800'>
                <tr>
                  <th className='px-4 py-2'>Descripción</th>
                  <th className='px-4 py-2'>Multa</th>
                  <th className='px-4 py-2'>Crímenes</th>
                  <th className='px-4 py-2'>Sentencia</th>
                  <th className='px-4 py-2'>Fecha</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-800'>
                {citizenData.criminalRecord.map((data: any, index: number) => (
                  <tr key={index} >
                    <td className='px-4 py-2 text-gray-400'>{data.description}</td>
                    <td className='px-4 py-2 text-gray-400'>{data.fine}</td>
                    <td className='px-4 py-2 text-gray-400'>
                      <ul className='list-disc list-inside'>
                        {JSON.parse(data.crimes).map((crime: string, index: number) => (
                          <li key={index}>{crime}</li>
                        ))}
                      </ul>
                    </td>
                    <td className='px-4 py-2 text-gray-400'>{data.jail > 0 ? `${data.jail}m` : `Sin sentencia`}</td>
                    <td className='px-4 py-2 text-gray-400'>{new Date(data.created_at).toLocaleDateString('es-ES')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='flex items-center mt-4 justify-center bg-gray-800 h-24 rounded-lg border border-gray-700'>
            <p className='text-gray-400 font-semibold'>{citizenData.firstname} {citizenData.lastname} no tiene registro criminal.</p>
          </div>
        )
        }
      </div>
    )
      : (
        <div>
          Cargando...
        </div>
      )
  )
}

export default ManageCitizen
