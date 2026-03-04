import React from 'react'
<<<<<<< HEAD

export default function Headers() {
  return (
    <div>Headers</div>
  )
}
=======
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
>>>>>>> 3841a379701c9d20b30beb3f1780e410bdcb2ab7
