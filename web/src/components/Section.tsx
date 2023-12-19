import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';

function Section(props: any) {
  return (
    <li>
      <NavLink
        to={props.link}
        className={
          ({ isActive }) => isActive ? 'block rounded p-2 bg-gray-800 text-gray-100' : 
          'block rounded p-2 hover:text-gray-100 hover:bg-gray-800 transition duration-100'}>
        <FontAwesomeIcon icon={props.icon} className="fa-fw mr-2" />
        {props.title}
      </NavLink>
    </li>
  )
}


export default Section