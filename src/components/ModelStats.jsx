import React from 'react'

function Donut({value, label}){
  const deg = 360 * (value/100)
  const color = value > 80 ? '#7b5a48' : value > 60 ? '#f5c18c' : '#b7a69b'
  const style = {background:`conic-gradient(${color} 0deg ${deg}deg, rgba(255,255,255,0.06) ${deg}deg 360deg)`}
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="donut" style={style} aria-hidden></div>
      <div className="mt-2 text-center small text-muted">
        <div className="fw-bold">{value}%</div>
        <div>{label}</div>
      </div>
    </div>
  )
}

export default function ModelStats(){
  return (
    
    <section className="container my-5 fade-in">
      <div className="row align-items-center gy-4">
        <div className="col-lg-6">
          <div className="card card-floating p-4 card-hover">
            <h6>Model accuracy & Confidence</h6>
            <div className="row mt-3 gx-3 gy-4">
              <div className="col-6 d-flex justify-content-center">
                <Donut value={92} label="Top-1 Accuracy" />
              </div>
              <div className="col-6 d-flex justify-content-center">
                <Donut value={78} label="F1 Score" />
              </div>
              <div className="col-6 d-flex justify-content-center">
                <Donut value={86} label="Calibration" />
              </div>
              <div className="col-6 d-flex justify-content-center">
                <Donut value={66} label="Novelty Detection" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card card-floating p-4 card-hover">
            <h6 className="mb-3">Chart insights</h6>
            <p className="small text-muted">Interactive charts are intentionally minimal — show key metrics at a glance with soft color strokes and subtle strokes to keep the tone calm.</p>
            <div style={{height:160}} className="d-flex align-items-center justify-content-between px-2">
              <div style={{width:'48%', height:120, borderRadius:12, background:'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="small text-muted">Precision vs Recall (sparkline placeholder)</div>
              </div>
              <div style={{width:'48%', height:120, borderRadius:12, background:'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="small text-muted">Confusion matrix overview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}
