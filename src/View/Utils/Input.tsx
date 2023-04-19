import React from "react";

// @ts-ignore
function Input({ value, type, name, label, action, Icon, customClass = "" }) {
  return (
    <div className={customClass ? `each_input ${customClass}` : "each_input"}>
      <label htmlFor={name}> {label} </label>
      <div className="input_holder">
        <input
          title={label}
          placeholder={` ${label} ...`}
          type={type}
          name={name}
          onChange={action}
          value={value}
        />
        <Icon className="input_icon" />
      </div>
    </div>
  );
}

export default Input;
