import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/* ================= THEME ================= */
const regionTheme = {
  kanto: "#2ecc71",
  johto: "#e67e22",
  hoenn: "#3498db",
  sinnoh: "#9b59b6",
  unova: "#95a5a6",
  kalos: "#e74c3c",
  alola: "#1abc9c",
  galar: "#34495e",
  hisui: "#947f5c",
  paldea: "#f39c12",
}

const regionAssets = {
  kanto: "/img/region_map/kanto.png",
  johto: "/img/region_map/JohtoMap.png",
  hoenn: "/img/region_map/Hoen.png",
  sinnoh: "/img/region_map/Sinnoh.png",
  unova: "/img/region_map/Unova.png",
  kalos: "/img/region_map/Kalos.png",
  alola: "/img/region_map/Alola.png",
  galar: "/img/region_map/Galar.png",
  hisui: "/img/region_map/Hisui.png",
  paldea: "/img/region_map/Paldea.png",
}

export default function DetailRegion() {
  const { name } = useParams()

  const [region, setRegion] = useState(null)
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        setError(false)

        /* ============ REGION ============ */
        const regionRes = await fetch(
          `https://pokeapi.co/api/v2/region/${name}`
        )
        if (!regionRes.ok) throw new Error("Region not found")
        const regionData = await regionRes.json()
        setRegion(regionData)

        /* ============ POKEDEX ============ */
        const pokedexUrl = regionData.pokedexes[0]?.url
        if (!pokedexUrl) return

        const pokedexRes = await fetch(pokedexUrl)
        const pokedexData = await pokedexRes.json()

        /* ============ POKEMON + IMAGE ============ */
        const pokemonResults = await Promise.all(
          pokedexData.pokemon_entries.map(async (entry) => {
            const speciesRes = await fetch(entry.pokemon_species.url)
            const species = await speciesRes.json()

            const pokemonRes = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${species.id}`
            )
            const pokemon = await pokemonRes.json()

            return {
              id: species.id,
              name: species.name,
              image:
                pokemon.sprites.other["official-artwork"].front_default,
            }
          })
        )

        setPokemons(pokemonResults)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [name])

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <DotLottieReact
          src="/animations/Pokeball_Loading.lottie" 
          loop
          autoplay
          style={{ width: "200px" }}
        />
        <h5 className="loading-text mt-3" style={{ color: '#fff', fontFamily: 'Cinzel' }}>
          Loading REGION...
        </h5>
      </div>
    )
  }

  /* ================= ERROR ================= */
  if (error || !region) {
    return (
      <div className="py-5 text-center text-danger fw-bold">
        Region not found
      </div>
    )
  }

  return (
    <>
      {/* ================= HERO ================= */}

       <button
            onClick={() => navigate(-1)}
            style={{
                background: `${regionTheme[name]}`,
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
            }}
            >
            Back to home
        </button>

      <div
        style={{
          position: "relative",
          height: "70vh",
          borderRadius: "0 0 50px 50px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.3),
                rgba(0,0,0,0.9)
              ),
              url(${regionAssets[name]})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container h-100 d-flex flex-column justify-content-end pb-5" style={{ position: "relative", zIndex: 2, color: "white" }}
        >
          <span className="badge mb-2 font-monospace"style={{ background: regionTheme[name] }}> 
            {region.main_generation.name.toUpperCase()}
          </span>

          <h1 className="fw-black text-capitalize "style={{fontSize: "4rem",textShadow: "0 6px 20px rgba(0,0,0,.6)",}}>
            {region.name}
          </h1>

          <p className="opacity-75 m-0">
            Region ID #{region.id} • Pokémon & Locations
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container py-5">
        {/* LOCATIONS */}
        <h3 className="fw-bold mb-3">Locations</h3>
        <div className="d-flex flex-wrap gap-2 mb-5">
          {region.locations.map((loc) => (
            <span
              key={loc.name}
              className="badge rounded-pill bg-light text-dark px-3 py-2"
            >
              {loc.name.replaceAll("-", " ")}
            </span>
          ))}
        </div>

        {/* POKEMON */}
        <h3 className="fw-bold mb-3">Pokémon</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
          }}
        >
          {pokemons.map((p) => (
            <Link
              key={p.id}
              to={`/pokemon/${p.name}`}
              style={{ textDecoration: "none" }}
            >
            <div
              key={p.id}
              style={{
                background: "#111",
                borderRadius: "18px",
                padding: "15px",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "contain",
                }}
              />
              <p
                className="m-0 mt-2 text-capitalize fw-semibold text-white"
              >
                {p.name}
              </p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
