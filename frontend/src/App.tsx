import { BrowserRouter, Route, Routes } from "react-router-dom"
// import AdminRoute from "./pages/AdminPanel/Route"
import LandingPageRoute from "./routing/LandingPageRoute"
import SiswaRoute from "./routing/SiswaRoute"
import AdminRoute from "./routing/AdminRoute"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LandingPageRoute />} />
          <Route path="/panel_siswa*" element={<SiswaRoute />} />
          <Route path="/panel_admin*" element={<AdminRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App