import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Select from 'react-select';
import Button from './Button';
import { fetchNui } from '../utils/fetchNui';
import { useTranslation } from 'react-i18next'

const customStyles = {
  control: (provided: any, state: any) => ({
    width: '100%',
    display: 'flex',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0 0 1px rgb(55 65 81)',
    backgroundColor: '#1F2937',
    color: '#D1D5DB',
    '&:focus-within': {
      // border: '2px solid rgb(29 78 216)',
      boxShadow: 'inset 0 0 0 3px rgb(29 78 216)'
    }
  }),
  option: (provided: any) => ({
    // ...provided,
    border: 'none',
    color: '#D1D5DB',
    padding: '0.5rem',
    backgroundColor: '#1F2937',
    '&:hover': {
      backgroundColor: 'rgb(55 65 81)'
    },
  }),
  multiValue: (provided: any) => {
    return {
      // ...provided,
      margin: '2px',
      display: 'flex',
      fontWeight: '600',
      borderRadius: '0.5rem',
      backgroundColor: 'rgb(55 65 81)',
    };
  },
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#D1D5DB',
  }),
  multiValueRemove: (provided: any) => ({
    // ...provided,
    padding: '0 0.5rem 0 0.5rem',
    marginLeft: '0.5rem',
    borderRadius: '0.5rem',
    '&:hover': {
      backgroundColor: 'rgb(75 85 99)',
    }
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#1F2937',
    borderRadius: '0.5rem',
    marginTop: '0.5rem',
    boxShadow: '0 0 0 1px rgb(55 65 81)',
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#D1D5DB',
  })
};

interface FormData {
  user_id: any,
  description: string
  fine: number
  crimes: Crime[]
  jail: number
}

interface Crime {
  name: string
  price: number
  jail: number
}

const crimes: Crime[] = [
  { name: 'Uso abusivo del claxon', price: 250000, jail: 0 },
  { name: 'Cruzar ilegalmente un paso de cebra', price: 250000, jail: 0 },
  { name: 'Conducir por el lado equivocado de la carretera', price: 1000000, jail: 0 },
  { name: 'Giro ilegal en U', price: 1000000, jail: 0 },
  { name: 'Conducir ilegalmente fuera de carretera', price: 750000, jail: 0 },
  { name: 'Rechazar una orden legal', price: 4000000, jail: 0 },
  { name: 'Detener el vehículo en medio de la vía', price: 250000, jail: 0 },
  { name: 'Estacionar en lugar no apto', price: 200000, jail: 0 },
  { name: 'No detenerse en una señal de alto', price: 150000, jail: 0 },
  { name: 'No detenerse en un semáforo en rojo', price: 500000, jail: 0 },
  { name: 'Conducir un vehículo ilegal', price: 1000000, jail: 0 },
  { name: 'Chocar e irse a la fuga', price: 3000000, jail: 0 },
  { name: 'Exceder velocidades de 50 KM/H en zona residencial', price: 200000, jail: 0 },
  { name: 'Exceder velocidades de 80 KM/H en zona urbana', price: 600000, jail: 0 },
  { name: 'Exceder velocidades de 120 KM/H en carretera', price: 1250000, jail: 0 },
  { name: 'Impedir el flujo de tráfico', price: 300000, jail: 0 },
  { name: 'Beber bebidas alcohólicas en la vía pública', price: 150000, jail: 0 },
  { name: 'Conducta desordenada', price: 400000, jail: 15 },
  { name: 'Obstrucción de la justicia', price: 2000000, jail: 20 },
  { name: 'Insultos hacia civiles', price: 200000, jail: 0 },
  { name: 'Faltar el respeto a un carabinero', price: 500000, jail: 0 },
  { name: 'Amenaza verbal hacia un civil', price: 1500000, jail: 0 },
  { name: 'Amenaza verbal hacia un carabinero', price: 2500000, jail: 15 },
  { name: 'Proporcionar información falsa poniendo en riesgo vida ajena', price: 750000, jail: 20 },
  { name: 'Intento de soborno', price: 10000000, jail: 30 },
  { name: 'Posesión ilegal de arma de alto calibre', price: 25000000, jail: 50 },
  { name: 'Posesión ilegal de arma de bajo calibre', price: 4000000, jail: 35 },
  { name: 'Robo de vehículo', price: 8000000, jail: 15 },
  { name: 'Intento de vender sustancia ilegal', price: 4000000, jail: 20 },
  { name: 'Fabricación o venta de una sustancia ilegal', price: 3000000, jail: 30 },
  { name: 'Posesión de una sustancia ilegal [4 unidades o más]', price: 1500000, jail: 10 },
  { name: 'Secuestro de un civil', price: 13000000, jail: 50 },
  { name: 'Secuestro de un carabinero', price: 30000000, jail: 60 },
  { name: 'Robo a mano armada de una tienda', price: 12500000, jail: 20 },
  { name: 'Robo a mano armada de una joyería', price: 15000000, jail: 30 },
  { name: 'Robo a mano armada a sucursal bancaria', price: 40000000, jail: 50 },
  { name: 'Asalto a mano armada a un civil', price: 10000000, jail: 20 },
  { name: 'Asalto a mano armada a un carabinero', price: 23000000, jail: 30 },
  { name: 'Homicidio frustrado a un civil', price: 5000000, jail: 30 },
  { name: 'Homicidio frustrado a un carabinero', price: 15000000, jail: 50 },
  { name: 'Homicidio en primer grado a un civil', price: 10000000, jail: 60 },
  { name: 'Homicidio en primer grado a un carabinero', price: 30000000, jail: 90 },
  { name: 'Fugarse de carabineros', price: 7000000, jail: 15 },
  { name: 'Posesión de dinero negro (mas de 5 millones)', price: 10000000, jail: 5 },
  { name: 'Acumulación de multas de delitos (mas de 10 millones)', price: 1000000, jail: 5 },
  { name: 'Agresión Física a un carabiner', price: 5000000, jail: 15 },
  { name: 'Estafa inferior o igual a 40.000.000', price: 35000000, jail: 40 },
  { name: 'Estafa superior a 40.000.000', price: 50000000, jail: 40 },
];


const AddCriminalRecord = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [expectedFine, setExpectedFine] = useState<number>(0);
  const [expectedJail, setExpectedJail] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    user_id: id,
    description: '',
    fine: 0,
    crimes: [],
    jail: 0
  })

  const navigate = useNavigate();

  const handleSelectChange = (selectedOptions: any) => {
    const selectedCrimes = selectedOptions.map((option: any) => option.value);
    const totalFine = selectedCrimes.reduce((sum: number, crime: Crime) => sum + crime.price, 0);
    const totalJail = selectedCrimes.reduce((sum: number, crime: Crime) => sum + crime.jail, 0);
    setExpectedFine(totalFine);
    setExpectedJail(totalJail)
    setFormData({
      ...formData,
      crimes: selectedCrimes,
    });
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sendFormData = (e: FormEvent) => {
    e.preventDefault()
    fetchNui<FormData>('addCriminalRecord', formData)
    navigate(`/citizen/${id}`)
  }

  return (
    <div>
      <Header title={t('add_criminal_record')} description={t('add_criminal_record_description')} />
      <main>
        <form onSubmit={sendFormData}>
          <div className='flex flex-col gap-4 mt-4'>
            <div>
              <label className='font-semibold leading-6'>{t('crimes_committed')}</label>
              <div className='mt-2'>
                <Select
                  isMulti
                  isSearchable
                  styles={customStyles}
                  classNamePrefix='select'
                  isClearable
                  name='crime'
                  noOptionsMessage={() => 'No options'}
                  placeholder={t('select_crimes')}
                  options={crimes.map((crime) => ({ value: crime, label: crime.name + ` ($${crime.price}${crime.jail > 0 ? `, ${crime.jail}m` : ``})` }))}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
            <div>
              <label className='font-semibold leading-6'>{t('event_description')}</label>
              {/* <input type='text' name='description' value={formData.description} onChange={handleInputChange} placeholder='Descripción' required className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' /> */}
              <textarea name='description' value={formData.description} onChange={handleDescriptionChange} placeholder={t('event_description_placeholder')} className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700'></textarea>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='font-semibold leading-6'>{t('fine')} {expectedFine > 0 && <span className='font-normal text-gray-400'>{t('expected_prison_time', {expectedFine: expectedFine})}</span>}</label>
                <input type='number' name='fine' value={formData.fine} onChange={handleInputChange} required className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
              <div>
                <label className='font-semibold leading-6'>{t('prison_time')} {expectedJail > 0 && <span className='font-normal text-gray-400'>{t('expected_prison_time', {expectedTime: expectedJail})}</span>}</label>
                <input type='number' name='jail' value={formData.jail} onChange={handleInputChange} required className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <Button text={t('upload_criminal_record')} type='submit' icon={faShareFromSquare} />
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddCriminalRecord