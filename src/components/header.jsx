
import Logo from '../img/logo.svg'

import React from 'react'


function Header(props) {
    const logoClass = props.logoClass
    return (
        <div>
            <div className={logoClass}>
            <img src={Logo} alt="logo" />
            </div>
        </div>
    )
}


export default Header
