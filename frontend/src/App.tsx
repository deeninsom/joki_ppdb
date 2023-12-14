import { BrowserRouter, Route, Routes } from "react-router-dom"
import Siswa_route from "./routing/Siswa_route"
import Admin_route from "./routing/Admin_route"
import Login from "./ui/pages/Login"
import Public_route from "./routing/Public_route"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Public_route />} />
          <Route path="/siswa-panel/*" element={<Siswa_route />} />
          <Route path="/admin-panel/*" element={<Admin_route />} />
          <Route path="/login/*" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App