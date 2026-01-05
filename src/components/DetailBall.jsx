import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

const ballTheme = {
  "poke-ball": "#E74C3C",     
  "great-ball": "#3498DB",     
  "ultra-ball": "#F1C40F",    
  "master-ball": "#8E44AD",   
  "premier-ball": "#BDC3C7",   

  "quick-ball": "#2980B9",    
  "dusk-ball": "#2C3E50",     
  "heal-ball": "#FF69B4",      
  "luxury-ball": "#34495E",    
  "net-ball": "#1ABC9C",       
  "nest-ball": "#27AE60",      
  "repeat-ball": "#F39C12",    
  "timer-ball": "#ECF0F1",     
  "dive-ball": "#3498DB",     
  "park-ball": "#2ECC71",      
  
  "fast-ball": "#E67E22",      
  "level-ball": "#D35400",     
  "lure-ball": "#2980B9",    
  "heavy-ball": "#7F8C8D",    
  "love-ball": "#E91E63",      
  "friend-ball": "#27AE60",   
  "moon-ball": "#34495E",      
  
  "sport-ball": "#E67E22",    
  "safari-ball": "#2ECC71",   
  "beast-ball": "#2980B9",     
  "dream-ball": "#D81B60",     
  "cherish-ball": "#C0392B",   

  "lapoke-ball": "#C0392B",    
  "lagreat-ball": "#2980B9",   
  "laultra-ball": "#F1C40F",   
  "lafeather-ball": "#95A5A6", 
  "lawing-ball": "#3498DB",    
  "lajet-ball": "#2C3E50",     
  "laheavy-ball": "#7F8C8D",   
  "laleaden-ball": "#34495E",  
  "lagigaton-ball": "#2C3E50", 
  "laorigin-ball": "#E74C3C",  
  "lastrange-ball": "#16A085", 
}

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

export default function DetailBall() {
  const { name } = useParams()
  const navigate = useNavigate()

  const [ball, setBall] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBall = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/item/${name}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setBall(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchBall()
  }, [name])

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <DotLottieReact src="/animations/Pokeball_Loading.lottie" loop autoplay style={{ width: 180 }} />
        <h5 className="loading-text mt-3" style={{ color: '#fff', fontFamily: 'Cinzel' }}>
            Loading Poké Ball…
        </h5>
      </div>
    )
  }

  if (error || !ball) {
    return <div className="text-center text-danger py-5">Ball not found</div>
  }

  const theme = ballTheme[name] || "#e74c3c"
  const effect = ball.effect_entries.find(e => e.language.name === "en")
  const flavor = ball.flavor_text_entries.find(f => f.language.name === "en")

  return (
    <div className="container py-5 text-white">
      <button
        onClick={() => navigate(-1)}
        style={{
            background: `linear-gradient(135deg, ${theme}, #000)`,
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            backdropFilter: "blur(6px)",
            transition: "0.3s",
            fontFamily: "'Press Start 2P', cursive", 
        }}
      >
        Back to items
      </button>

      <div
        style={{
          background: `linear-gradient(135deg, ${theme}, #000)`,
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 30px 80px rgba(0,0,0,.6)",
        }}
        className="mb-5"
      >
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={pokeballImages[name] || '/img/ball/pokeball.png'}
              alt={ball.name}
              style={{
                width: "70%",
                filter: "drop-shadow(0 25px 40px rgba(0,0,0,.7))",
              }}
            />
          </div>

          <div className="col-md-7">
            <span 
               className="badge mb-2 text-dark text-capitalize" 
               style={{ background: "#fff", padding: "6px 16px", borderRadius: "999px", fontWeight: 600 }}
            >
              {ball.category.name.replace("-", " ")}
            </span>
            
            <h1 className="fw-black display-4 text-capitalize">
              {ball.name.replaceAll("-", " ")}
            </h1>
            
            <p className="opacity-75 fst-italic">
               {flavor ? flavor.text : "No description available."}
            </p>

            <div className="mt-4">
                <p className="m-0">ID #{ball.id}</p>
                <p className="m-0">Cost: {ball.cost ? `${ball.cost} Pokédollars` : "Not for sale"}</p>
                <p className="m-0">Fling Power: {ball.fling_power || "—"}</p>
                <p className="m-0">Fling Effect: {ball.fling_effect?.name || "None"}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#111",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 20px 50px rgba(0,0,0,.5)",
        }}
      >
        <h3 className="fw-bold mb-3">Item Effect</h3>
        <p className="opacity-75" style={{ lineHeight: "1.8" }}>
            {effect?.effect || "No detailed effect info available for this item."}
        </p>


        <h3 className="fw-bold mt-5 mb-3">Attributes</h3>
        <div className="d-flex flex-wrap gap-2">
          {ball.attributes.length > 0 ? (
            ball.attributes.map(a => (
                <span
                  key={a.name}
                  style={{
                    background: "#222",
                    padding: "8px 18px",
                    borderRadius: "14px",
                    border: `1px solid ${theme}44`
                  }}
                  className="text-capitalize"
                >
                  {a.name.replaceAll("-", " ")}
                </span>
              ))
          ) : (
            <span className="opacity-50">No attributes found.</span>
          )}
        </div>

        <h3 className="fw-bold mt-5 mb-3">Gen Availability</h3>
        <div className="d-flex flex-wrap gap-2">
          {ball.game_indices.map(g => (
            <span 
                key={g.generation.name} 
                className="badge rounded-pill text-capitalize" 
                style={{ background: theme, padding: "8px 15px" }}
            >
              {g.generation.name.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}