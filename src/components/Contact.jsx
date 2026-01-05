import React from "react"; // Hapus useState karena useForm sudah menghandle state
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const navigate = useNavigate();
  
  // Ganti "mqpkvonw" dengan ID yang valid dari dashboard Formspree kamu
  const [state, handleSubmit] = useForm("mvzgldzo");

  // Jika sukses terkirim
  if (state.succeeded) {
    return (
      <div className="container py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="pokedex-card bg-danger p-3 rounded-5 border-heavy shadow-lg text-center" style={{maxWidth: "500px", border: "8px solid #8b0000"}}>
          <div className="bg-white p-5 rounded-4 border-heavy">
             <h2 className="text-danger fw-black mt-3">SUCCESS!</h2>
             <p className="text-dark">Your message has been sent!</p>
             <button onClick={() => window.location.reload()} className="btn btn-dark mt-3 px-4 py-2">SEND ANOTHER [B]</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      {/* Tombol Back */}
      <button
        onClick={() => navigate(-1)}
        className="btn mb-4 text-white d-flex align-items-center gap-2 shadow-sm"
        style={{ background: "#333", borderRadius: "12px", borderBottom: "4px solid #000", fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}
      >
        <span>◀</span> ESCAPE
      </button>

      <div className="position-relative" style={{ maxWidth: "800px", width: "100%", backgroundColor: "#dc0a2d", borderRadius: "30px 30px 30px 100px", padding: "15px", boxShadow: "20px 20px 0px rgba(0,0,0,0.2)", border: "8px solid #8b0000" }}>
        
        {/* Lampu Pokedex */}
        <div className="d-flex align-items-center gap-3 mb-4 ps-3">
          <div style={{ width: "50px", height: "50px", background: "radial-gradient(circle at 30% 30%, #3498db, #2980b9)", borderRadius: "50%", border: "4px solid white" }}></div>
          <div className="d-flex gap-2">
            <div className="rounded-circle bg-danger" style={{ width: "12px", height: "12px", border: "2px solid #000" }}></div>
            <div className="rounded-circle bg-warning" style={{ width: "12px", height: "12px", border: "2px solid #000" }}></div>
            <div className="rounded-circle bg-success" style={{ width: "12px", height: "12px", border: "2px solid #000" }}></div>
          </div>
        </div>

        <div className="row g-0 bg-white shadow-inner" style={{ borderRadius: "15px 15px 15px 80px", overflow: "hidden", border: "4px solid #333" }}>
          
          <div className="col-md-5 bg-light d-flex flex-column align-items-center justify-content-center p-4">
            <div className="mb-3" style={{ width: "100%", background: "#98cb98", borderRadius: "10px", padding: "20px", border: "4px solid #333", boxShadow: "inset 4px 4px 0 #7a9e7a" }}>
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png" alt="Pikachu" className="img-fluid" />
            </div>
            <div className="text-dark text-center">
              <h6 className="fw-bold mb-0">STATUS: ONLINE</h6>
              <p className="small text-muted mb-0">Waiting for Data...</p>
            </div>
          </div>

          <div className="col-md-7 p-4 bg-dark text-white">
            <form onSubmit={handleSubmit}>
              <h4 className="mb-4 text-warning" style={{ letterSpacing: "2px", fontWeight: "900" }}> CONTACT TRAINER</h4>
              
              <div className="mb-3">
                <label htmlFor="full-name" className="form-label small opacity-75">NAME</label>
                <input id="full-name" name="name" type="text" className="form-control bg-secondary text-white border-0" required placeholder="Wira" />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-danger small" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label small opacity-75">EMAIL ADDRESS</label>
                <input id="email" name="email" type="email" className="form-control bg-secondary text-white border-0" required placeholder="wiradex031@gmail.com" />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-danger small" />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label small opacity-75">MESSAGE</label>
                <textarea id="message" name="message" className="form-control bg-secondary text-white border-0" rows="3" required placeholder="Tell us something..."></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-danger small" />
              </div>

              <button 
                type="submit" 
                disabled={state.submitting}
                className="btn btn-warning w-100 fw-bold py-3"
                style={{ borderRadius: "15px", boxShadow: "0 5px 0 #b78a02" }}
              >
                {state.submitting ? "SENDING..." : "SEND MESSAGE [A]"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}