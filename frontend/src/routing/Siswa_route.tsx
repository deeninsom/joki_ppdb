import { Route, Routes } from "react-router-dom"
import {Biodata, Dashboard, Pengumuman, PengumumanUjian, PrintSeleksi} from "../ui/pages/PanelSiswa"
import PdfTamplate from "../ui/pages/PdfTamplate"

const Siswa_route = () => {
  return (
    <Routes>
    <Route path="/:id" element={<Dashboard/>}/>
    <Route path="/biodata/:id" element={<Biodata/>}/>
    <Route path="/pengumuman/:id" element={<Pengumuman/>}/>
    <Route path="/pengumuman-ujian/:id" element={<PengumumanUjian/>}/>
    <Route path="/print-seleksi/:id" element={<PrintSeleksi/>}/>
    <Route path="/print-seleksi/onprint" element={<PdfTamplate/>}/>
  </Routes>
  )
}

export default Siswa_route