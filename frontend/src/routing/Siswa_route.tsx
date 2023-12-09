import { Route, Routes } from "react-router-dom"
import {Biodata, Dashboard, Pengumuman} from "../ui/pages/PanelSiswa"

const Siswa_route = () => {
  return (
    <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/biodata" element={<Biodata/>}/>
    <Route path="/pengumuman" element={<Pengumuman/>}/>
  </Routes>
  )
}

export default Siswa_route