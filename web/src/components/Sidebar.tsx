import React, { useContext, useState } from 'react'
import Section from './Section'
import { faHouse, faCarSide, faPerson } from '@fortawesome/free-solid-svg-icons'
import DataContext from './DataContext'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const { t } = useTranslation();
  const data: any = useContext(DataContext)

  return (
    <div className="relative w-64 bg-gray-900 border-r border-gray-800">
      <header className='py-4 w-full'>
        <div className='flex items-center justify-center gap-2'>
          <div className='p-1 bg-green-500/50 rounded-full'>
            <div className='bg-green-500 w-2 h-2 rounded-full'></div>
          </div>
          <h1 className='text-xl text-center font-bold'>{data?.playerName }</h1>
        </div>
        <p className='text-center text-sm text-gray-400 font-medium'>{data?.jobGrade}</p>
      </header>
      <ul className='font-semibold text-gray-400 px-2 space-y-2'>
        <Section title={t('home')} icon={faHouse} link='/'/>
        <Section title={t('vehicles')} icon={faCarSide} link='/vehicles'/>
        <Section title={t('citizens')} icon={faPerson} link='/citizens'/>
      </ul>
    </div>
  )
}

export default Sidebar