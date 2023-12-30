import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = (props: any) => {
  return (
    <button type={props.type ? props.type : 'button'} onClick={props.onClick} className={`${props.width ? props.width : 'w-full'} bg-blue-700 font-semibold rounded-lg px-4 py-2 hover:bg-blue-800 active:bg-blue-900 hover:-translate-y-1 transition duration-200`}><FontAwesomeIcon icon={props.icon}/> {props.text}</button>
  )
}

export default Button