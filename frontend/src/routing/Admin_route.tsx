import { Route, Routes } from "react-router-dom"
import {Dashboard, KelolaPengumuman, KelolaUjian, Kelulusan, Verifikasi} from "../ui/pages/PanelAdmin"

const Admin_route = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/verifikasi" element={<Verifikasi />} />
      <Route path="/kelulusan" element={<Kelulusan />} />
      <Route path="/kelola/pengumuman" element={<KelolaPengumuman />} />
      <Route path="/kelola/ujian" element={<KelolaUjian />} />
    </Routes>
  )
}

export default Admin_route