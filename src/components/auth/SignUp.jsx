import React from 'react';
import "../../styles/auth.css";

export default function SignUp() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fdf8f3' }}>
      <div className="row w-100 justify-content-center fade-up-auth">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          
          {/* Judul Medieval */}
          <div className="text-center mb-5">
            <h1 style={{ 
              fontFamily: 'Cinzel, serif', 
              color: '#3b2e28', 
              fontWeight: '700',
              fontSize: '2.5rem'
            }}>
              Join the Guild
            </h1>
            <p className="text-muted" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
              Create your account to unlock AetherVision.
            </p>
          </div>

          <form>
            {/* Input Nama Lengkap */}
            <div className="mb-4">
              <label className="auth-label-custom d-block mb-1">Full Name</label>
              <input 
                type="text" 
                className="form-control auth-input-custom" 
                placeholder="E.g. Sir Galahad" 
                required
              />
            </div>

            {/* Input Email */}
            <div className="mb-4">
              <label className="auth-label-custom d-block mb-1">Email Address</label>
              <input 
                type="email" 
                className="form-control auth-input-custom" 
                placeholder="knight@wiravision.com" 
                required
              />
            </div>

            {/* Input Password */}
            <div className="mb-4">
              <label className="auth-label-custom d-block mb-1">Password</label>
              <input 
                type="password" 
                className="form-control auth-input-custom" 
                placeholder="••••••••" 
                required
              />
            </div>

            {/* Syarat & Ketentuan (Checkbox Bootstrap) */}
            <div className="mb-5 form-check">
              <input type="checkbox" className="form-check-input" id="terms" required />
              <label className="form-check-label small text-muted ms-2" htmlFor="terms">
                I agree to the <span style={{ color: '#f5c18c', fontWeight: '600' }}>Terms of Magic</span>
              </label>
            </div>

            {/* Tombol Register */}
            <button type="submit" className="btn btn-wira w-100 mb-4 shadow-sm py-3">
              Create Account
            </button>
          </form>

          {/* Link ke Login */}
          <div className="text-center mt-2">
            <p style={{ color: '#6b4e3f', fontSize: '0.9rem' }}>
              Already a member?
              <a href="/login" className="ms-2 text-decoration-none" style={{ color: '#f5c18c', fontWeight: '700' }}>
                Sign In
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}