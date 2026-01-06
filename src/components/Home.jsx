import React, { useState } from 'react'
import HeroWithCar from './HeroWithCar'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/home.css'
import PredictionPanel from './PredictionPanel'
import ImgSlide from './ImageSlide'
import BallSlider from './BallSlider'
import Footer from './Footer'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  const revealRef = useScrollReveal()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Upload gambar dulu')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const laravelUpload = await fetch('http://127.0.0.1:8000/api/inputs', {
        method: 'POST',
        body: formData
      })

      if (!laravelUpload.ok) throw new Error('Gagal upload ke Laravel')

      const uploadData = await laravelUpload.json()
      const inputId = uploadData.id

      const flaskForm = new FormData()
      flaskForm.append('file', file)
      flaskForm.append('input_id', inputId) 

      const flaskRes = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: flaskForm
      })

      if (!flaskRes.ok) {
        const errData = await flaskRes.json().catch(() => ({}))
        throw new Error(errData.error || 'Prediksi gagal di Flask')
      }

      const predictData = await flaskRes.json()
      console.log('PREDICTION RESULT:', predictData)
      setResult(predictData)

      await fetch('http://127.0.0.1:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input_id: inputId,
          prediction: predictData.prediction,
          predictions: predictData.predictions,
          types: predictData.types,
          stats: predictData.stats,
          image: predictData.image
        })
      })

    } catch (err) {
      console.error(err)
      setError(err.message || 'Server bermasalah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeroWithCar />
      <BallSlider />
      <ImgSlide />

      <div id='container-form' className='prediction-panel'>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold mb-0 text-uppercase text-light" style={{ letterSpacing: '2px' }}>Predict Your Pokemon</h2>
            <div style={{ height: '4px', width: '60px', backgroundColor:"#e91717ff"}}></div>
          </div>
        </div>

        <main ref={revealRef} className="container mt-5 glass-effect2 reveal-smooth" style={{ borderRadius :"20px", backgroundColor : "#0000005d" }} >
          <div className="row justify-content-center align-items-center min-vh-50 py-5">

            <div className="col-md-5 text-center text-md-start mb-5 mb-md-0">
              <h2 style={{ fontFamily: 'Cinzel, serif', color: '#ffffffff', fontSize: '2.5rem' }}>
                WiraDex
              </h2>
              <p style={{ color: '#ffffffff', fontSize: '1.1rem' }}>
                Unggah gambar Pokémon…
              </p>
            </div>

            <div className="col-md-6">
              <div className="upload-drop-clean d-flex flex-column align-items-center">
                <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange}/>

                <label htmlFor="file-upload" style={{background: '#00000083',color: '#fff',padding: '12px 32px',borderRadius: '12px',cursor: 'pointer',marginBottom: '16px'}}>
                  Pilih Gambar
                </label>

                {file && (
                  <>
                    <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '8px', borderRadius: '12px', objectFit: 'cover' }} />
                    <p className="text-light">
                      <i className='bi bi-image'/> {file.name}
                    </p>
                  </>
                )}

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
              </div>


              <button onClick={handleSubmit} disabled={loading} style={{marginTop: '10px',background: loading ? '#310000ff' : '#680000ff',color: '#fff',padding: '10px 28px',borderRadius: '10px', border: 'none',transition: 'all 0.3s'}}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Scanning...
                    </>
                  ) : (
                    'Predict Now'
                  )}
                </button>
            </div>

          </div>

          {loading && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <DotLottieReact
                src="/animations/Pokeball_Loading.lottie" 
                loop
                autoplay
                style={{ width: "200px" }}
              />
              <h5 className="loading-text mt-3" style={{ color: '#fff', fontFamily: 'Cinzel' }}>
                SCANNING...
              </h5>
            </div>
          )}

          {!loading && result && <PredictionPanel result={result} />}
        </main>
      </div>
    </>
  )
}
