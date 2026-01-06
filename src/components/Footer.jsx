import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer mt-auto fade-in">
      <div className="container">
        <div className="row py-3 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="fw-bold">WiraDex — gentle AI for the curious</div>
            <div className="small footer-legal">© {new Date().getFullYear()} Wira Labs. Crafted with soft gradients and ancient runes 🪄</div>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a className="text-decoration-none text-muted" href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
