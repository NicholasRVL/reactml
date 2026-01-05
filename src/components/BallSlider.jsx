import { useState, useEffect } from 'react'
import '../styles/region.css'
import { useNavigate } from 'react-router-dom'; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function PokeballSlider() {
  const [balls, setBalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const pokeballImages = {

    'poke-ball': '/img/ball/pokeball.png',
    'great-ball': '/img/ball/greatball.png',
    'ultra-ball': '/img/ball/ultraball.png',
    'master-ball': '/img/ball/masterball2.png',
    'premier-ball': '/img/ball/premierball.png',

    'quick-ball': '/img/ball/quickball.png',
    'dusk-ball': '/img/ball/duskball.png',
    'heal-ball': '/img/ball/healball.png',
    'luxury-ball': '/img/ball/luxuryball.png',
    'net-ball': '/img/ball/netball.png',
    'nest-ball': '/img/ball/nestball.png',
    'repeat-ball': '/img/ball/repeatball.png',
    'timer-ball': '/img/ball/timerball.png',
    'dive-ball': '/img/ball/diveball.png',
    'park-ball': '/img/ball/parkball.png',
    
    'fast-ball': '/img/ball/fastball.png',
    'level-ball': '/img/ball/levelball.png',
    'lure-ball': '/img/ball/lureball.png',
    'heavy-ball': '/img/ball/heavyball.png',
    'love-ball': '/img/ball/loveball.png',
    'friend-ball': '/img/ball/friendball.png',
    'moon-ball': '/img/ball/moonball.png',

    'sport-ball': '/img/ball/sportball.png',
    'safari-ball': '/img/ball/safariball.png',
    'beast-ball': '/img/ball/beastball.png',
    'dream-ball': '/img/ball/dreamball.png',
    'cherish-ball': '/img/ball/cherisball.png',
    
    'lapoke-ball': '/img/ball/lapokeball.png',
    'lafeather-ball': '/img/ball/lafeatherball.png',
    'laorigin-ball': '/img/ball/laoriginball.png',
    'laleaden-ball': '/img/ball/laleadenball.png',
    'lajet-ball': '/img/ball/lajetball.png',
    'laultra-ball': '/img/ball/laultraball.png',
    'lawing-ball': '/img/ball/lawingball.png',
    'laheavy-ball': '/img/ball/laheavyball.png',
    'lagreat-ball': '/img/ball/lagreatball.png',
    'lagigaton-ball': '/img/ball/lagigatonball.png',
    'lastrange-ball': '/img/ball/strangeball.png',
  }
  useEffect(() => {
    const fetchBalls = async () => {
      try {
        const pocketRes = await fetch('https://pokeapi.co/api/v2/item-pocket/3/')
        const pocketData = await pocketRes.json()

        const categoryRequests = pocketData.categories.map(cat =>
          fetch(cat.url).then(res => res.json())
        )

        const categories = await Promise.all(categoryRequests)
        const allItems = categories.flatMap(cat => cat.items)

        const formatted = allItems.map((item, index) => ({
          id: index + 1,
          name: item.name,
          img: pokeballImages[item.name] || '/img/ball/pokeball.png'
        }))

        setBalls(formatted)
      } catch (err) {
        console.error(err)
        setError('Failed to load Poké Balls 😢')
      } finally {
        setLoading(false)
      }
    }

    fetchBalls()
  }, [])

  const scrollRight = () => {
    document
      .getElementById('ball-container')
      .scrollBy({ left: 350, behavior: 'smooth' })
  }

  const scrollLeft = () => {
    document
      .getElementById('ball-container')
      .scrollBy({ left: -350, behavior: 'smooth' })
  }

  if (loading) return <div className="text-center py-5 text-light">Loading Poké Balls...</div>
  if (error) return <div className="text-center py-5 text-danger">{error}</div>

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-0 text-uppercase text-light" style={{ letterSpacing: '2px' }}>
            Poké Balls
          </h2>
          <div style={{ height: '4px', width: '60px', backgroundColor: '#e74c3c' }}></div>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={scrollLeft}
            className="btn btn-outline-light rounded-circle shadow-sm"
            style={{ width: '45px', height: '45px', backgroundColor: '#000' }}
          >
            L
          </button>
          <button
            onClick={scrollRight}
            className="btn btn-outline-light rounded-circle shadow-sm"
            style={{ width: '45px', height: '45px', backgroundColor: '#000' }}
          >
            R
          </button>
        </div>
      </div>

      <div
        id="ball-container"
        className="d-flex gap-4 py-4"
        style={{ overflowX: 'auto', scrollSnapType: 'x mandatory' }}
      >
        {balls.map(ball => (
          <div
            key={ball.id}
            onClick={() => navigate(`/ball/${ball.name}`)}
            className="ball-card text-white"
            style={{
              minWidth: '300px',
              height: '400px',
              borderRadius: '25px',
              position: 'relative',
              flexShrink: 0,
              scrollSnapAlign: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.4s ease'
            }}
          >
            <div
              className="bg-image-layer"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${ball.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '65%',
                transition: 'transform 0.6s ease',
                zIndex: 1
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85))',
                zIndex: 2
              }}
            />

            <div
              className="p-4 d-flex flex-column justify-content-end h-100"
              style={{ position: 'relative', zIndex: 3 }}
            >
              <span className="badge bg-danger mb-2 font-monospace">BALL</span>
              <h2
                className="fw-black text-capitalize m-0"
                style={{ fontSize: '2.2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
              >
                {ball.name.replace('-', ' ')}
              </h2>
              <p className="small opacity-75 m-0">
                A special ball used to catch Pokémon
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ball-card:hover .bg-image-layer {
          transform: scale(1.15);
        }
        .ball-card:hover {
          transform: translateY(-10px);
          filter: drop-shadow(8px 8px 10px rgba(0,0,0,0.6));
        }
        #ball-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}