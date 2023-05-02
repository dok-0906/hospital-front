import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar({onLogout}) {
  return (
<nav className="navbar is-info">
<div class="navbar-brand">
    <a class="navbar-item">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
    </a>
    <div class="navbar-burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
    <div className='navbar is-info'>
        <div className='navbar-start'>
        <Link className='navbar-item' to="/NurseRootView">
                Эхлэл
            </Link>
            <Link className='navbar-item' to="/nurseView">
                Цаг захиалга харах
            </Link>
            <Link className='navbar-item' to="/nurseUpdate">
                Заг захиалга өөрчлөх
            </Link>
            <a href={() => false} className='navbar-item' onClick={onLogout}>
                 Гарах
            </a>
        </div>
    </div>
</nav>

    
  )
}
