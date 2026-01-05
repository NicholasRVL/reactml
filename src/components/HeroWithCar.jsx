import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/carou.css";

export default function HeroWithCar() {
  const heroRef = useRef(null)
  const [carState, setCarState] = useState({ opacity: 1, scale: 1, translateY: 0 })

  const carouselItems = [
    {
      id: 1,
      image: "public/img/gen1-removebg-preview.png",
      title: "WiraDex",
      subtitle: "Intelligent Image Recognition, Elegantly Crafted"
    },
    {
      id: 2,
      image: "public/img/masterball.png",
      title: "Master Ball",
      subtitle: "A legendary Poké Ball with a 100% catch rate. Use only at the most crucial moments to catch the strongest Pokémon without risking failure."
    },
    {
      id: 3,
      image: "public/img/shiny-rayquaza.png",
      title: "Shiny Pokemon",
      subtitle: "Shiny Pokémon are ultra-rare versions of Pokémon that feature a different color scheme than their normal counterparts. This phenomenon is purely cosmetic and does not affect the Pokémon's stats or abilities in battle, but their extreme rarity makes them highly prized by trainers and collectors worldwide."
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const progress = Math.min(1, Math.max(0, (scrollY - 50) / 400))
      setCarState({
        opacity: 1 - progress,
        scale: 1 - progress * 0.05,
        translateY: progress * -30,
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className="position-relative glass-effect2" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderRadius:"30px", backgroundColor : "#0000005d"}} >
      
      <div className="container-fluid" style={{ 
        opacity: carState.opacity, 
        transform: `translateY(${carState.translateY}px)`,
        zIndex: 10 
      }}>
        
        <div id="heroCarousel" className="carousel slide " data-bs-ride="carousel">
          
          <div className="carousel-indicators">
            {carouselItems.map((_, index) => (
              <button 
                key={index}
                type="button" 
                data-bs-target="#heroCarousel" 
                data-bs-slide-to={index} 
                className={index === 0 ? 'active' : ''}
                style={{ backgroundColor: '#3b2e28' }}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {carouselItems.map((item, index) => (
              <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="row justify-content-center text-center py-5">
                  <div className="col-lg-8">
                    <h1 style={{ fontFamily: 'Cinzel, serif', color: '#ffffffff', fontSize: '3.5rem', fontWeight: 'bold' }}>
                      {item.title}
                    </h1>
                    <p style={{ color: '#ffffffff', fontSize: '1.2rem', marginBottom: '2rem' }}>
                      {item.subtitle}
                    </p>
                    <img src={item.image} className="img-fluid" alt="Car" style={{ maxHeight: '400px', objectFit: 'contain' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon custom-nav" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon custom-nav" aria-hidden="true"></span>
          </button>
        </div>

        <div className="text-center mt-4">
          <a href="#container-form" className="btn-wira-lg">
            Upload & Identify
          </a>
        </div>
      </div>

      <style>{`
        .custom-nav {
          filter: invert(15%) sepia(20%) saturate(1000%) hue-rotate(350deg); /* Bikin panah jadi coklat tua */
        }
        .btn-wira-lg {
          display: inline-block;
          padding: 15px 40px;
          background-color: #00000070;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          transition: 0.3s;
        }
        .btn-wira-lg:hover {
          background-color: #000000ff;
          transform: translateY(-3px);
          color: white;
        }
      `}</style>
    </section>
  )
}