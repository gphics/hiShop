import React from 'react'
import Register from '../../Components/Register'
function RegisterPage() {
  return (
    <div className='register_page'>
      {Register.map((Item, i)=> <Item key={i*788} />)}
    </div>
  )
}

export default RegisterPage