import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import CardPendaftaran from "../component/LandingPage/_ui/CardPendaftaran"

const LandingPageRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/form-pendaftaran" element={<CardPendaftaran />} />
    </Routes>
  )
}

export default LandingPageRoute