import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPageRoute from "./routing/LandingPageRoute"
import SiswaRoute from "./routing/SiswaRoute"
import AdminRoute from "./routing/AdminRoute"
import Auth from "./pages/Auth"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LandingPageRoute />} />
          <Route path="/panel_siswa*" element={<SiswaRoute />} />
          <Route path="/panel_admin*" element={<AdminRoute />} />
          <Route path="/login*" element={<Auth/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App