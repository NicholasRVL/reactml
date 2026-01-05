import React from 'react'

export default function PredictionPanel({ result }) {
  if (!result || !result.predictions?.length) return null

  const predictions = result.predictions
    .map(p => ({
      name: p.name,
      confidence:
        p.confidence <= 1
          ? Math.round(p.confidence * 100)
          : Math.round(p.confidence)
    }))
    .sort((a, b) => b.confidence - a.confidence)

  const main = predictions[0]


  const forms = result.forms || []

  const gmaxForms = forms.filter(f => f.is_gmax === true && f.is_shiny === false)
  

  const megaForms = forms.filter(f => f.is_mega === true && f.is_shiny === false)

  const shinyForms = forms.filter(f =>
    f.is_shiny === true 
  )

  const statColors = {
    hp: "#7c0000ff",
    attack: "#dda964ff",
    defense: "#d6ca98ff",
    "special-attack": "#9db7f5",
    "special-defense": "#a7db8d",
    speed: "#fa92b2",
  }

  const maxStat = 200 

  const stats = result.stats || {}


  return (
    <section className="container my-5 p-4"  >

      <div className="row g-4 align-items-stretch " >

        <div className="col-lg-6 transparent1" style={{ borderRadius:"20px" }}>
          <div className="p-4 h-100 shadow-sm border-0 " >

            <div className="d-flex justify-content-between mb-3">
              <h5 className="fw-bold text-light">WiraDex Scan</h5>

              <div className="d-column justify-content-between mb-3">

              <span className="badge px-3 shadow-sm text-light transparent1 mx-1" style={{ fontSize: '0.9rem'}}>
                {result.generation || 'Unknown Gen'}
              </span>
               
              <span className="badge px-3 shadow-sm text-light transparent1 mx-1" style={{ fontSize: '0.9rem'}}>
                {result.region || 'Unknown region'}
              </span>
              
              </div>

              
            </div>

            <div className="text-center mb-4">
              {result.image && (
                <img
                  src={result.image}
                  alt={main.name}
                  className="img-fluid"
                  style={{
                    maxHeight: 220,
                    filter: 'drop-shadow(0 14px 20px rgba(0,0,0,.25))'
                  }}
                />
              )}
            </div>

            <h4 className="text-capitalize text-center fw-bold mb-1 text-light">
              {main.name}
            </h4>
            <div className="text-center text-muted small mb-3 ">
              Primary Match Detected
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between small mb-1 text-light">
                <span>Confidence</span>
                <span>{main.confidence}%</span>
              </div>
              <div className="progress" style={{ height: 10, borderRadius: 10 }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${main.confidence}%` }}
                />
              </div>
            </div>

  
            <div className="small p-3 rounded " style={{ backgroundColor: "" }}>
              {result.types?.length > 0 && (
                <div className="mb-1 text-light"><b>Type:</b> {result.types.join(', ')}</div>
              )}
              {result.counter?.weak_against?.length > 0 && (
                <div className="mb-1 text-danger"><b>Weak:</b> {result.counter.weak_against.join(', ')}</div>
              )}
              {result.counter?.strong_against?.length > 0 && (
                <div className="text-success"><b>Strong:</b> {result.counter.strong_against.join(', ')}</div>
              )}

              
            </div>

            <div className="small  p-3 rounded">
              <p className="text-center fst-italic text-light small border-top border-bottom py-2">
                "{result.description}"
              </p>
            </div>

             {Object.keys(stats).length > 0 && (
              <div style={{ background: "#c2c2c263", borderRadius: "20px", padding: "20px", color: "black", marginTop: "20px",}}>
                <h5 className="mb-3">📊 Base Stats</h5>

                {Object.entries(stats).map(([key, value]) => {
                  if (key === "total") return null

                  return (
                    <div key={key} style={{ marginBottom: "12px" }}>
                      <div style={{display: "flex",justifyContent: "space-between",fontSize: "0.85rem",marginBottom: "4px",textTransform: "capitalize",}}>
                        <span>{key.replace("-", " ")}</span>
                        <strong>{value}</strong>
                      </div>

                      <div
                        style={{
                          background: "#333",
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min((value / maxStat) * 100, 100)}%`,
                            height: "100%",
                            background: statColors[key] || "#aaa",
                            transition: "width 0.8s ease",
                          }}
                        />
                      </div>
                    </div>
                  )
                })}

                {stats.total && (
                  <div
                    style={{
                      marginTop: "12px",
                      textAlign: "right",
                      fontWeight: "bold",
                      opacity: 0.85,
                    }}
                  >
                    Total: {stats.total}
                  </div>
                )}
              </div>
            )}

            

            <hr />

            <div className="d-flex gap-2 flex-wrap">
              {predictions.map((p, i) => (
                <span
                  key={i}
                  className={`badge ${i === 0? 'bg-success shadow-sm': 'bg-white text-dark border'}`}
                >
                  {p.name} · {p.confidence}%
                </span>
              ))}
            </div>

          </div>
        </div>

        <div className="col-lg-6 transparent1" style={{ borderRadius:"20px" }}>
          <div className=" p-4 h-100 shadow-sm border-0">

            <h5 className="fw-bold mb-4 text-light">Evolutionary Chain</h5>

            {result.evolution_chain?.length ? (
              <div className="d-flex justify-content-center gap-4 flex-wrap ">
                {result.evolution_chain.map((p, i) => (
                  <div key={i} className="text-center text-light">
                    →
                    <img
                      src={p.image}
                      alt={p.name}
                      width={85}
                      style={{
                        filter: 'drop-shadow(0 10px 14px rgba(0,0,0,.15))'
                      }}
                    />
                    
                    <div className="fw-bold text-capitalize mt-2 small text-light" >
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 italic text-light">
                No evolution data available
              </div>
            )}

            {megaForms.length > 0 && (
              <>
                <hr className="my-4" />
                <h6 className="text-danger fw-bold mb-3">Mega Evolution</h6>
                <div className="d-flex gap-4 overflow-auto pb-2">
                  {megaForms.map((m, i) => (
                    <div key={i} className="text-center text-light" style={{ minWidth: 90 }}>
                      <img
                        src={m.image}
                        alt={m.name}
                        width={80}
                        style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.2))' }}
                      />
                      <div className="small text-capitalize mt-1">{m.name}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {gmaxForms.length > 0 && (
              <>
                <hr className="my-4" />
                <h6 className="fw-bold mb-3" style={{ color: 'purple' }}>Gigantamax Form</h6>
                <div className="d-flex gap-4 overflow-auto pb-2">
                  {gmaxForms.map((g, i) => (
                    <div key={i} className="text-center text-light" style={{ minWidth: 90 }}>
                      <img src={g.image} alt={g.name} width={85} style={{ filter: 'drop-shadow(0 0 15px rgba(89, 0, 255, 0.21))' }} />
                      <div className="small text-capitalize mt-1">{g.name}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {shinyForms.length > 0 && (
              <>
                <hr className="my-4" />
                <h6 className="text-warning fw-bold mb-3">Shiny Forms ✨</h6>
                <div className="d-flex gap-4 overflow-auto pb-2">
                  {shinyForms.map((s, i) => (
                    <div key={i} className="text-center text-light" style={{ minWidth: 90 }}>
                      <img
                        src={s.image}
                        alt={s.name}
                        width={80}
                        style={{
                          filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.4))'
                        }}
                      />
                      <div className="small text-capitalize mt-1">{s.name}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            

          </div>
        </div>

      </div>
    </section>
  )
}