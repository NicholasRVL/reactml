import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/* ===== TYPE COLOR ===== */
const typeColor = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
}

export default function DetailPokemon() {
  const { name } = useParams()

  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)

        // ===== POKEMON =====
        const pokeRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
        const pokeData = await pokeRes.json()
        setPokemon(pokeData)

        // ===== SPECIES =====
        const speciesRes = await fetch(pokeData.species.url)
        const speciesData = await speciesRes.json()
        setSpecies(speciesData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [name])

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center my-4">
              <DotLottieReact
                src="/animations/Pokeball_Loading.lottie"
                loop
                autoplay
                style={{ width: "180px" }}
              />
              <h5 className="loading-text mt-3" style={{ color: '#fff', fontFamily: 'Cinzel' }}>
                Loading Pokemon...
              </h5>
            </div>
    )
  }

  const description =
    species.flavor_text_entries.find(
      f => f.language.name === "en"
    )?.flavor_text.replace(/\f/g, " ")

  const mainType = pokemon.types[0].type.name

  return (
    <div className="container py-5 text-white">

        <button
            onClick={() => navigate(-1)}
            style={{
                background: `linear-gradient(135deg, ${typeColor[mainType]}, #000)`,
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
            Back to region
        </button>


      {/* ===== HERO CARD ===== */}
      <div
        style={{
          background: `linear-gradient(135deg, ${typeColor[mainType]}, #000)`,
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 30px 80px rgba(0,0,0,.6)",
        }}
        className="mb-5"
      >
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              style={{
                width: "100%",
                filter: "drop-shadow(0 25px 40px rgba(0,0,0,.7))",
              }}
            />
            <img
              src={pokemon.sprites.other["official-artwork"].front_shiny}
              alt="shiny"
              style={{
                width: "60%",
                marginTop: "10px",
                opacity: 0.8,
              }}
            />
          </div>

          <div className="col-md-7">
            <h1 className="fw-black display-4 text-capitalize">
              {pokemon.name}
            </h1>
            <p className="opacity-75 fst-italic">{description}</p>

            <div className="mb-3">
              {pokemon.types.map(t => (
                <span
                  key={t.type.name}
                  style={{
                    background: typeColor[t.type.name],
                    padding: "6px 16px",
                    borderRadius: "999px",
                    marginRight: "8px",
                    fontWeight: 600,
                  }}
                  className="text-dark text-capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <p className="m-0">ID #{pokemon.id}</p>
            <p className="m-0">
              Height: {pokemon.height / 10} m
            </p>
            <p className="m-0">
              Weight: {pokemon.weight / 10} kg
            </p>
            <p className="m-0">
              Base EXP: {pokemon.base_experience}
            </p>
            <p className="m-0">
              Legendary: {species.is_legendary ? "Yes" : "No"} | Mythical:{" "}
              {species.is_mythical ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* ===== BASE STATS ===== */}

      <div className="d-col py-4 px-4" style={{ background: "#111", borderRadius: "25px", padding: "30px", boxShadow: "0 20px 50px rgba(0,0,0,.5)",}}>

      <h3 className="fw-bold mb-3 text-light">Base Stats</h3>
      
      {pokemon.stats.map(s => (
        <div key={s.stat.name} className="mb-3 text-light ">
          <div className="d-flex justify-content-between">
            <span className="text-capitalize text-light">
              {s.stat.name}
            </span>
            <span className="text-light">{s.base_stat}</span>
          </div>
          <div
            style={{
              background: "#222",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(s.base_stat / 200) * 100}%`,
                height: "10px",
                background: typeColor[mainType],
              }}
            />
          </div>
        </div>
      ))}
      </div>

      {/* ===== ABILITIES & MOVES ===== */}
      <div
        style={{
          background: "#111",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 20px 50px rgba(0,0,0,.5)",
        }}
        className="mt-5"
      >
        <h3 className="fw-bold mb-3">Abilities</h3>
        <ul>
          {pokemon.abilities.map(a => (
            <li key={a.ability.name} className="text-capitalize" style={{ listStyle:"none" }}>
              {a.ability.name}
              {a.is_hidden && "(Hidden)"}
            </li>
          ))}
        </ul>

        <h3 className="fw-bold mt-4 mb-3">Moves</h3>
        <div className="d-flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 40).map(m => (
            <span
              key={m.move.name}
              style={{
                background: "#222",
                padding: "8px 14px",
                borderRadius: "14px",
              }}
              className="text-capitalize"
            >
              {m.move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
