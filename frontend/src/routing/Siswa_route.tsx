import { Route, Routes } from "react-router-dom"
import {Biodata, Dashboard, Pengumuman, Ujian, PrintSeleksi} from "../ui/pages/PanelSiswa"

const Siswa_route = () => {
  return (
    <Routes>
    <Route path="/:id" element={<Dashboard/>}/>
    <Route path="/biodata/:id" element={<Biodata/>}/>
    <Route path="/pengumuman/:id" element={<Pengumuman/>}/>
    <Route path="/pengumuman-ujian/:id" element={<Ujian/>}/>
    <Route path="/print-seleksi/:id" element={<PrintSeleksi/>}/>
  </Routes>
  )
}

export default Siswa_route