import React from 'react'
import { BsFillImageFill } from "react-icons/bs"
// @ts-ignore
function ImageUpload({ isMultiple = false, name,label,action,customId= "",}) {
  return (
    <div id={customId} className="each_input">
      <label htmlFor={name}> {label} </label>
          <div className="input_holder">
        <input
          type="file"
          name={name}
          onChange={action}
         multiple={isMultiple}
         accept='.png, .jpeg, .jpg, .svg'
        />
    
      </div>
    </div>
  );
}

export default ImageUpload