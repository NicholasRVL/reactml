import React, { useState } from 'react';
import "../../styles/auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fdf8f3' }}>
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 style={{ 
              fontFamily: 'Cinzel, serif', 
              color: '#3b2e28', 
              fontWeight: '700',
              fontSize: '2.8rem'
            }}>
              {isLogin ? 'WiraVision' : 'The Guild'}
            </h1>
            <p className="text-muted" style={{ fontFamily: 'Inter, sans-serif' }}>
              {isLogin ? 'Authenticating your vision...' : 'Join our league of visionaries.'}
            </p>
          </div>

          {/* Form Section */}
          <form className="mt-4">
            {!isLogin && (
              <div className="mb-4">
                <label className="auth-label-custom d-block mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="form-control auth-input-custom" 
                  placeholder="Sir Lancelot" 
                />
              </div>
            )}

            <div className="mb-4">
              <label className="auth-label-custom d-block mb-1">Email Address</label>
              <input 
                type="email" 
                className="form-control auth-input-custom" 
                placeholder="visionary@aether.com" 
              />
            </div>

            <div className="mb-5">
              <label className="auth-label-custom d-block mb-1">Password</label>
              <input 
                type="password" 
                className="form-control auth-input-custom" 
                placeholder="••••••••" 
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-wira w-100 mb-4 shadow-sm">
              {isLogin ? 'Sign In' : 'Begin Journey'}
            </button>
          </form>

          {/* Footer Form Section */}
          <div className="text-center mt-2">
            <p style={{ color: '#6b4e3f', fontSize: '0.9rem' }}>
              {isLogin ? "New to the Vision?" : "Already recognized?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="btn btn-link p-0 ms-2"
                style={{ 
                  color: '#f5c18c', 
                  fontWeight: '700', 
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
            
            <a href="/" className="d-block mt-4 text-decoration-none" style={{ opacity: 0.5, color: '#3b2e28', fontSize: '0.8rem' }}>
              ← Back to Sanctuary
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}