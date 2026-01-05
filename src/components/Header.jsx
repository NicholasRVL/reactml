import React from 'react'
import { NavLink } from 'react-router-dom'

function Logo(){
  return (
    <div className="d-flex align-items-center gap-2 site-logo">
        <img src="public/img/siluet/mew_siluet.png" alt="mew" style={{ width: '80px', height: 'auto' }}/>

      <div style={{lineHeight:1}}>
        <div style={{fontFamily:'Cinzel, serif'}} className="fw-bold">WiraDex</div>
        <div className="small text-muted" style={{fontSize:10, marginTop:-2}}>gentle image AI</div>
      </div>
    </div>
  )
}

export default function Header(){
  return (
    <header className="py-3">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Logo />
            <nav className="d-none d-md-flex gap-3 align-items-center nav-links">
              <NavLink to="/" end className={({isActive})=>`text-decoration-none small ${isActive ? 'text-dark' : 'text-muted'}`}>Home</NavLink>
            </nav>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="btn-group btn-group-sm me-2" role="group" aria-label="Mode toggle">
              <NavLink to="/" end className={({isActive})=>`btn btn-sm ${isActive ? 'btn-dark text-white' : 'btn-outline-secondary'}`}>Wira</NavLink>
            </div>

            <div className="d-none d-sm-flex align-items-center border shadow-sm py-2 px-4 glass-effect" style={{ borderRadius:"20px", backgroundColor : "#0000005d"}}>
              <img src="public/img/siluet/revisi_siluet.png" alt="siluet" style={{ width: '100px', height: 'auto' }}/>
            </div>

            <NavLink to ='/contact' className="btn btn-sm cta-shimmer text-light" style={{ backgroundColor:"#000000ff", borderRadius:"10px"}}>Contact</NavLink>

          </div>
        </div>
      </div>
    </header>
  )
}
