import { Route, Routes } from "react-router-dom"
import Home from "../component/AdminPage/Home"
import Verifikasi from "../component/AdminPage/Verifikasi"
import Kelulusan from "../component/AdminPage/Kelulusan"
import Kelola from "../component/AdminPage/Kelola"

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/verifikasi" element={<Verifikasi />} />
      <Route path="/kelulusan" element={<Kelulusan />} />
      <Route path="/kelola" element={<Kelola />} />
    </Routes>
  )
}

export default AdminRoute