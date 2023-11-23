/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"
import logo from "../../../assets/SMP-removebg-preview.jpg"
import { useNavigate } from "react-router-dom"

const Layout = ({ children }: { children: ReactNode }) => {

  const navigate = useNavigate()

  const handlePage = (route: string) => {
    navigate(route)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: "#004040" }}>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-lg-0 d-flex align-items-center" href="/panel_siswa/home" style={{ color: "white", fontWeight: "bold", marginLeft: "3%" }}>
            <img
              src={logo}
              height="25"
              alt="Logo Sekolah"
              loading="lazy"
              className="me-2"
            />
            PPDB ONLINE
          </a>
        </div>
      </nav>
      <section style={{ overflow: "hidden" }}>
        <div className="row ms-2 mt-4">
          <div className="col-sm-3">
            <div className="card p-4">
              <div className="tittle" style={{ fontWeight: "bold", fontSize: "17px" }}>MENU DASHBOARD</div>
              <div className="content-header d-flex gap-4 mt-4 align-items-center" style={{ marginLeft: "20px" }}>
                <img src={logo} style={{ width: "50px" }} alt="" />
                <div className="content-text">
                  <div className="text-tittle d-flex align-items-center gap-1" style={{ color: "GrayText", fontSize: "10px", fontWeight: "bold" }}>
                    <i className="fa-solid fa-user"></i>
                    <span>calon siswa</span>
                  </div>
                  <span style={{ fontSize: "15px" }}>Syihabuddin</span>
                </div>
              </div>
              <div className="content-menu mt-4">
                <span style={{ fontSize: "13px", fontWeight: "bolder", color: "GrayText" }}>UTAMA</span>
                <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage("/panel_siswa/home")} style={{ cursor: "pointer" }}>
                    <i className="fa fa-solid fa-house"></i>
                    <span>HOME</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage("/panel_siswa/pengumuman")} style={{ cursor: "pointer" }}>
                    <i className="fa fa-solid fa-volume-high"></i>
                    <span style={{ marginLeft: "-2px" }}>PENGUMUMAN</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage("/panel_siswa/biodata")} style={{ cursor: "pointer" }}>
                    <i className="ms-1 fa fa-solid fa-file"></i>
                    <span style={{ marginLeft: "2px" }}>BIODATA</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" style={{ cursor: "pointer" }}>
                    <i className="fa fa-solid fa-print" style={{ marginLeft: "2px" }} ></i>
                    <span style={{ marginLeft: "1px" }}>PRINT PENDAFTARAN</span>
                  </li>
                </ul>
                <span style={{ fontSize: "13px", fontWeight: "bolder", color: "GrayText" }}>LAINYA</span>
                <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage("/")} style={{ cursor: "pointer" }}>
                    <i style={{ marginLeft: "4px" }} className="fa fa-solid fa-right-from-bracket"></i>
                    <span>KELUAR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8 ms-3">
            <main>{children}</main>
          </div>
        </div>
      </section>
      {/* <footer className="footer mt-auto fixed-bottom  py-2" style={{ backgroundColor: "#004040" }}>
        <div className="container text-center">
          <span className="text-center text-white">&copy; 2023 SMP ISLAM WALISONGO.</span>
        </div>
      </footer> */}
    </>
  )
}

export default Layout