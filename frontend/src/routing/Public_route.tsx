import { Route, Routes } from "react-router-dom"
import LandingPage from "../ui/pages/LandingPage"
import PendaftaranSiswa from "../ui/pages/PendaftaranSiswa"

const Public_route = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/form-pendaftaran" element={<PendaftaranSiswa />} />
    </Routes>
  )
}

export default Public_route