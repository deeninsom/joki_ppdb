import { Route, Routes } from "react-router-dom"
// import SiswaPage from "../pages/SiswaPage"
import CardBiodata from "../component/SiswaPage/card/CardBiodata"
import CardHome from "../component/SiswaPage/card/CardHome"
import CardPengumuman from "../component/SiswaPage/card/CardPengumuman"

const SiswaRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<CardHome/>}/>
      <Route path="/pengumuman" element={<CardPengumuman/>}/>
      <Route path="/biodata" element={<CardBiodata/>}/>
    </Routes>
  )
}

export default SiswaRoute