import React from 'react'

const Step = ({title, desc, icon})=> (
  <div className="col-md-6 col-lg-3 fade-in">
    <div className="step-card text-center p-3 card-hover">
      <div className="mb-3 d-inline-flex align-items-center justify-content-center sm-icon" style={{background:'#fffef6'}}>{icon}</div>
      <h6 className="mb-1 fw-bold">{title}</h6>
      <div className="small text-muted">{desc}</div>
    </div>
  </div>
)

export default function HowItWorks(){
  return (
    <section className="container my-5">
      <div className="text-center fade-in">
        <h3 className="fw-bold">How Wira Works</h3>
        <p className="text-muted">A gentle 4-step process designed to be transparent, explainable and nurturing.</p>
      </div>

      <div className="row mt-4 gy-3 steps">
        <Step n={1} title="Upload" desc="Drop or choose images — our uploader accepts many formats." icon={<span>📁</span>} />
        <Step n={2} title="Analyze" desc="Model inspects subtle features and meditative textures." icon={<span>🔮</span>} />
        <Step n={3} title="Explain" desc="Receive a friendly, human-style explanation of why the model predicted what it did." icon={<span>🧭</span>} />
        <Step n={4} title="Improve" desc="Fine-tune or provide feedback to tailor predictions to your realm." icon={<span>🛡️</span>} />
      </div>
    </section>
  )
}
