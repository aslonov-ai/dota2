import React from 'react'
import { Link } from 'react-router-dom'
function Headers() {
  return (
    <div>
        <ul className='flex'>
           <Link to={"/Users"}>Users</Link>
           <Link to={"/Main"}>Main</Link>
            <li>next</li>
            <li>next</li>
            <li>next</li>
            <li>next</li>
            <li>next</li>
            <li>next</li>
        </ul>
    </div>
  )
}

export default Headers