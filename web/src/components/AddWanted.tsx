import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faImage } from '@fortawesome/free-solid-svg-icons'
import { fetchNui } from '../utils/fetchNui'
import ImageWithFallback from './ImageWithFallback';
import { useTranslation } from 'react-i18next'

interface FormData {
  name: string,
  reason: string,
  image: string
}

const AddWanted = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    reason: '',
    image: ''
  })

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sendFormData = (e: FormEvent) => {
    e.preventDefault()
    fetchNui<FormData>('addWantedPlayer', formData)
    navigate('*')
  }

  return (
    <div>
      <Header title={t('add_wanted_register')} description={t('add_wanted_register_description')} />
      <main>
        <div className='flex gap-4 mt-4'>
          <div className='w-1/3 flex justify-stretch'>
            <ImageWithFallback src={formData.image} />
          </div>
          <form onSubmit={sendFormData} className='w-2/3'>
            <div className='flex flex-col gap-4'>
              <div>
                <label className='font-semibold leading-6'>{t('full_name')}</label>
                <input type='text' name='name' value={formData.name} onChange={handleInputChange} required placeholder={t('name_placeholder')} className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
              <div>
                <label className='font-semibold leading-6'>{t('reason')}</label>
                <input type='text' name='reason' value={formData.reason} onChange={handleInputChange} required placeholder={t('reason_placeholder')} className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
              <div>
                <label className='font-semibold leading-6'>{t('image')}</label>
                <input type='text' name='image' value={formData.image} onChange={handleInputChange} placeholder='URL' className='w-full mt-2 p-2 rounded-lg ring-1 ring-inset ring-gray-700 bg-gray-800 focus:outline-none focus:ring focus:ring-blue-700' />
              </div>
            </div>
            <div className='mt-8'>
              <Button icon={faSquarePlus} text={t('upload_wanted_register')} type='submit' />
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddWanted