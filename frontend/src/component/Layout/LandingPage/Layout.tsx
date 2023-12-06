import { ReactNode } from "react"
import logo from "../../../assets/SMP-removebg-preview.jpg"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: "#004040" }}>
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-lg-0 d-flex align-items-center gap-2" href="/" style={{ color: "white", fontWeight: "bold" }}>
              <img
                src={logo}
                height="25"
                alt="Logo Sekolah"
                loading="lazy"
              />
              PPDB ONLINE
            </a>
          </div>

          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <a className="nav-link text-white" href="#alur">Alur</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#info">Info</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#syarat">Syarat</a>
              </li>
              <li className="nav-item ">
                <a className="nav-link text-white" href="#profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#kontak">Kontak</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main style={{overflowX: "hidden"}}>{children}</main>
      <footer className="footer mt-auto py-2" style={{ backgroundColor: "#004040" }}>
        <div className="container text-center">
          <span className="text-center text-white">&copy; 2023 SMP ISLAM WALISONGO.</span>
        </div>
      </footer>
    </>
  )
}

export default Layout