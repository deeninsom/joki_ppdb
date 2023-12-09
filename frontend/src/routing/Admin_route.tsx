import { Route, Routes } from "react-router-dom"
import {Dashboard, Kelola, Kelulusan, Verifikasi} from "../ui/pages/PanelAdmin"

const Admin_route = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/verifikasi" element={<Verifikasi />} />
      <Route path="/kelulusan" element={<Kelulusan />} />
      <Route path="/kelola" element={<Kelola />} />
    </Routes>
  )
}

export default Admin_route