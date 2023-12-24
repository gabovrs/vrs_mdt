import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Select from 'react-select';
import Button from './Button';
import { fetchNui } from '../utils/fetchNui';
import { Locale } from '../utils/locale';

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
  { name: 'abusive_horn_use', price: 250000, jail: 0 },
  { name: 'illegal_crosswalk_crossing', price: 250000, jail: 0 },
  { name: 'wrong_way_driving', price: 1000000, jail: 0 },
  { name: 'illegal_u_turn', price: 1000000, jail: 0 },
  { name: 'offroad_driving', price: 750000, jail: 0 },
  { name: 'refusing_legal_order', price: 4000000, jail: 0 },
  { name: 'vehicle_blocking_way', price: 250000, jail: 0 },
  { name: 'illegal_parking', price: 200000, jail: 0 },
  { name: 'running_stop_sign', price: 150000, jail: 0 },
  { name: 'running_red_light', price: 500000, jail: 0 },
  { name: 'driving_illegal_vehicle', price: 1000000, jail: 0 },
  { name: 'hit_and_run', price: 3000000, jail: 0 },
  { name: 'speeding_50_residential', price: 200000, jail: 0 },
  { name: 'speeding_80_urban', price: 600000, jail: 0 },
  { name: 'speeding_120_highway', price: 1250000, jail: 0 },
  { name: 'traffic_flow_obstruction', price: 300000, jail: 0 },
  { name: 'public_alcohol_consumption', price: 150000, jail: 0 },
  { name: 'disorderly_conduct', price: 400000, jail: 15 },
  { name: 'obstruction_of_justice', price: 2000000, jail: 20 },
  { name: 'insulting_civilians', price: 200000, jail: 0 },
  { name: 'disrespecting_officer', price: 500000, jail: 0 },
  { name: 'verbal_threat_to_civilian', price: 1500000, jail: 0 },
  { name: 'verbal_threat_to_officer', price: 2500000, jail: 15 },
  { name: 'false_information_endangering', price: 750000, jail: 20 },
  { name: 'bribery_attempt', price: 10000000, jail: 30 },
  { name: 'illegal_high_caliber_weapon', price: 25000000, jail: 50 },
  { name: 'illegal_low_caliber_weapon', price: 4000000, jail: 35 },
  { name: 'vehicle_theft', price: 8000000, jail: 15 },
  { name: 'illegal_substance_sale_attempt', price: 4000000, jail: 20 },
  { name: 'substance_manufacturing_or_sale', price: 3000000, jail: 30 },
  { name: 'illegal_substance_possession', price: 1500000, jail: 10 },
  { name: 'civilian_kidnapping', price: 13000000, jail: 50 },
  { name: 'officer_kidnapping', price: 30000000, jail: 60 },
  { name: 'armed_robbery_store', price: 12500000, jail: 20 },
  { name: 'armed_robbery_jewelry', price: 15000000, jail: 30 },
  { name: 'armed_robbery_bank', price: 40000000, jail: 50 },
  { name: 'armed_assault_civilian', price: 10000000, jail: 20 },
  { name: 'armed_assault_officer', price: 23000000, jail: 30 },
  { name: 'attempted_homicide_civilian', price: 5000000, jail: 30 },
  { name: 'attempted_homicide_officer', price: 15000000, jail: 50 },
  { name: 'first_degree_murder_civilian', price: 10000000, jail: 60 },
  { name: 'first_degree_murder_officer', price: 30000000, jail: 90 },
  { name: 'fleeing_officers', price: 7000000, jail: 15 },
  { name: 'black_money_possession', price: 10000000, jail: 5 },
  { name: 'crime_fine_accumulation', price: 1000000, jail: 5 },
  { name: 'physical_assault_officer', price: 5000000, jail: 15 },
  { name: 'fraud_under_40_million', price: 35000000, jail: 40 },
  { name: 'fraud_over_40_million', price: 50000000, jail: 40 }
];


const AddCriminalRecord = () => {
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
      <Header title={Locale.ui_add_criminal_record} description={Locale.ui_add_criminal_record_description} />
      <main>
        <form onSubmit={sendFormData}>
          <div className='flex flex-col gap-4 mt-4'>
            <div>
              <label className='font-semibold leading-6'>{Locale.ui_crimes_committed}</label>
              <div className='mt-2'>
                <Select
                  isMulti
                  isSearchable
                  styles={customStyles}
                  classNamePrefix='select'
                  isClearable
                  name='crime'
                  noOptionsMessage={() => 'No options'}
                  placeholder={Locale.ui_select_crimes}
                  options={crimes.map((crime) => ({ value: crime, label: Locale[`ui_${crime.name}`] || `ui_${crime.name}` + ` ($${crime.price}${crime.jail > 0 ? `, ${crime.jail}m` : ``})` }))}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
            <div>
              <label className='font-semibold leading-6'>{Locale.ui_event_description}</label>
              {/* <input type='text' name='description' value={formData.description} onChange={handleInputChange} placeholder='Descripción' required className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' /> */}
              <textarea name='description' value={formData.description} onChange={handleDescriptionChange} placeholder={Locale.ui_event_description_placeholder} className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700'></textarea>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='font-semibold leading-6'>{Locale.ui_fine} {expectedFine > 0 && <span className='font-normal text-gray-400'>{Locale.ui_expected_fine + expectedFine}</span>}</label>
                <input type='number' name='fine' value={formData.fine} onChange={handleInputChange} required className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
              <div>
                <label className='font-semibold leading-6'>{Locale.ui_prison_time} {expectedJail > 0 && <span className='font-normal text-gray-400'>{Locale.ui_expected_prison_time + expectedJail + ' ' + Locale.ui_minutes}</span>}</label>
                <input type='number' name='jail' value={formData.jail} onChange={handleInputChange} required className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <Button text={Locale.ui_upload_criminal_record} type='submit' icon={faShareFromSquare} />
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddCriminalRecord