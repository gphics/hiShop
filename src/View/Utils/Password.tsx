import React,{useState} from 'react'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// @ts-ignore
function Password({ value, name, label, action, customClass = "" }) {
    const [inputType, setInputType] = useState("password")
    function changeType() {
        setInputType(prev => prev === 'text' ? "password": "text")
    }
  return (
    <div className={customClass ? `each_input ${customClass}` : "each_input"}>
      <label htmlFor={name}> {label} </label>
      <div className="input_holder">
        <input
title={label}          placeholder={`your ${label} ...`}
          type={inputType}
          name={name}
          onChange={action}
          value={value}
          
        />
        {inputType === "text" ? (
          <MdVisibilityOff className='input_icon' onClick={changeType} />
        ) : (
          <MdVisibility className='input_icon' onClick={changeType} />
        )}
      </div>
    </div>
  );
}

export default Password