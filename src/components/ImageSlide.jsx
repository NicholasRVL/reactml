import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/region.css'

export default function RegionSlider() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const regionConfig = {
    kanto: { color: "#2ecc71", img: "/img/region_map/kanto.png" },
    johto: { color: "#e67e22", img: "/img/region_map/JohtoMap.png" },
    hoenn: { color: "#3498db", img: "/img/region_map/Hoen.png" },
    sinnoh: { color: "#9b59b6", img: "/img/region_map/Sinnoh.png" },
    unova: { color: "#95a5a6", img: "/img/region_map/Unova.png" },
    kalos: { color: "#e74c3c", img: "/img/region_map/Kalos.png" },
    alola: { color: "#1abc9c", img: "/img/region_map/Alola.png" },
    galar: { color: "#34495e", img: "/img/region_map/Galar.png" },
    hisui: { color: "#947f5c", img: "/img/region_map/Hisui.png" },
    paldea: { color: "#f39c12", img: "/img/region_map/Paldea.png" },
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/region/')
      .then(res => res.json())
      .then(data => {
        const formattedRegions = data.results.map((r, index) => {
          const config = regionConfig[r.name] || { color: "#333", img: "" };
          return {
            id: index + 1,
            name: r.name,
            color: config.color,
            img: config.img
          };
        });
        setRegions(formattedRegions);
        setLoading(false);
      });
  }, []);

  const scrollRight = () => {
    document.getElementById('region-container').scrollBy({ left: 350, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    document.getElementById('region-container').scrollBy({ left: -350, behavior: 'smooth' });
  };

  if (loading) return <div className="text-center py-5">Loading Regions...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-0 text-uppercase text-light" style={{ letterSpacing: '2px' }}>Explore Regions</h2>
          <div style={{ height: '4px', width: '60px', backgroundColor:"#17e979ff"}}></div>
        </div>
        <div className="d-flex gap-2">
          <button onClick={scrollLeft} className="btn btn-outline-light rounded-circle shadow-sm" style={{ width: '45px', height: '45px', backgroundColor:"#000000ff" }}>L</button>
          <button onClick={scrollRight} className="btn btn-outline-light rounded-circle shadow-sm" style={{ width: '45px', height: '45px', backgroundColor:"#000000ff"}}>R</button>
        </div>
      </div>

      <div id="region-container"className="d-flex overflow-hidden gap-4 py-4 px-8" style={{ scrollSnapType: 'x mandatory', overflowX: 'auto' }}>
        {regions.map((reg) => (
          <div 
            key={reg.id}
            onClick={() => navigate(`/region/${reg.name}`)}
            className="region-card border-0 text-white"
            style={{ 
              minWidth: '300px', height: '400px', borderRadius: '25px',
              position: 'relative', flexShrink: 0, scrollSnapAlign: 'center',
              cursor: 'pointer', overflow: 'hidden', transition: 'all 0.4s ease'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${reg.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
                zIndex: 1
              }}
              className="bg-image-layer"
            />

            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)`,
                zIndex: 2
              }}
            />


            <div className="p-4 d-flex flex-column justify-content-end h-100" style={{ position: 'relative', zIndex: 3 }}>
              <div className="mb-2">
                <span className="badge bg-danger mb-2 font-monospace">GEN {reg.id}</span>
                <h2 className="fw-black text-capitalize m-0" style={{ fontSize: '2.2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  {reg.name}
                </h2>
              </div>
              <p className="small opacity-75 m-0">Click to explore area details & species</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .region-card:hover .bg-image-layer {
          transform: scale(1.15);
        }
        .region-card:hover {
          transform: translateY(-10px);
          filter: drop-shadow(8px 8px 10px gray); !important;
        }
        #region-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}