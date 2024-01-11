import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Select from 'react-select';
import Button from './Button';
import { fetchNui } from '../utils/fetchNui';
import { Locale } from '../utils/locale';
import { Fine } from '../utils/fine';

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
  crimes: typeof Fine[]
  jail: number
}

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
    const totalFine = selectedCrimes.reduce((sum: number, crime: any) => sum + crime.price, 0);
    const totalJail = selectedCrimes.reduce((sum: number, crime: any) => sum + crime.jail, 0);
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
                  options={Fine.map((crime) => ({ value: crime, label: crime.label + ` ($${crime.price}${crime.jail > 0 ? `, ${crime.jail}m` : ``})` }))}
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