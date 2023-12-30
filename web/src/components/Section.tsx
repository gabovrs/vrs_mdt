import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';

interface SectionProps {
  link: string;
  icon: any;
  title: string;
}

function Section({ link, icon, title }: SectionProps) {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) => isActive ? 'block rounded p-2 bg-gray-800 text-gray-100' : 'block rounded p-2 hover:text-gray-100 hover:bg-gray-800 transition duration-100'}>
        <FontAwesomeIcon icon={icon} className="fa-fw mr-2" />
        {title}
      </NavLink>
    </li>
  )
}


export default Section