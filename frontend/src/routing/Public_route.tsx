import { Route, Routes } from "react-router-dom"
import LandingPage from "../ui/pages/LandingPage"
import FormPendaftaran from "../ui/component/FormPendaftaran"

const Public_route = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/form-pendaftaran" element={<FormPendaftaran />} />
    </Routes>
  )
}

export default Public_route