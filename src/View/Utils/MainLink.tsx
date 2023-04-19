import React from 'react'
import {NavLink} from 'react-router-dom'
// @ts-ignore
function MainLink({name, linkClass, Icon, holderClass, to, action, iconClass}):any {
  return (
    <div className={holderClass}>
      {/* @ts-ignore */}
      <NavLink onClick={action} to={to} className={linkClass} end> <Icon className={iconClass} /> <span> {name} </span>  </NavLink>
    </div>
  )
}

export default MainLink