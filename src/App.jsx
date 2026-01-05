import React, { Suspense } from "react"
import "./styles/theme.css"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import useFadeOnScroll from "./hooks/useFadeOnScroll"

const Header = React.lazy(() => import("./components/Header.jsx"))
const Home = React.lazy(() => import("./components/Home.jsx"))
const PredictionPanel = React.lazy(() => import("./components/PredictionPanel.jsx"))
const Footer = React.lazy(() => import("./components/Footer.jsx"))
const SignIn = React.lazy(() => import("./components/auth/SignIn.jsx"))
const SignUp = React.lazy(() => import("./components/auth/SignUp.jsx"))
const DetailRegion = React.lazy(() => import("./components/DetailRegion.jsx"))
const DetailPokemon = React.lazy(() => import("./components/DetailPokemon.jsx"))
const BallSlider = React.lazy(() => import("./components/BallSlider.jsx"))
const DetailBall = React.lazy(() => import("./components/DetailBall.jsx"))
const Contact = React.lazy(() => import("./components/Contact.jsx"))

function App() {
  
  useFadeOnScroll()

  return (
    <Router>
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>

        <Header />

        <Routes>

          <Route path="/" element={<Home/>} />

          <Route path="/signin" element={<SignIn/>} />

          <Route path="/signup" element={<SignUp/>} />

          <Route path="*" element={<Navigate to="/" replace />} />
          
          <Route path="/region/:name" element={<DetailRegion />} />

          <Route path="/pokemon/:name" element={<DetailPokemon />} />

          <Route path="/ball" element={<BallSlider/>} />

          <Route path="/ball/:name" element={<DetailBall/>} />

          <Route path="/contact" element={<Contact/>} />


        </Routes>

        <Footer />

      </Suspense>
    </Router>
  )
}

export default App
