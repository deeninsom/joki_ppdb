import { useNavigate } from "react-router-dom"
import Layout from "../Layout/AdminPage/Layout"

const Home = () => {
  const navigate = useNavigate()

  const navigatePage = () => {
    navigate("/panel_siswa/biodata")
  }

  return (
    <Layout>
      <section>
        <div className="card" style={{width: "110%"}}>
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>DASHBOARD</span>
          </div>
          <div className="card-body p-4">
            <span>Selamat Datang, SMP ISLAM WALISONGO</span>
          </div>
        </div>
        <div className="list-card d-flex mt-4 gap-4" style={{width: "104%"}}>
          <div className="col-sm-4 p-2 " onClick={navigatePage} style={{ backgroundColor: "#9ADE7B", color: "white" }}>
            <span className="" style={{ fontSize: "40px" }}>0</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>JUMLAH PENDAFTAR</span>
          </div>
          <div className="col-sm-4 p-2 " style={{ backgroundColor: "#29ADB2", color: "white" }}>
            <span className="" style={{ fontSize: "40px" }}>0</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>TOTAL LULUS PPDB</span>
          </div>
          <div className="col-sm-4 p-2 " style={{ backgroundColor: "#29ADB2", color: "white" }}>
            <span className="" style={{ fontSize: "40px" }}>0</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>TOTAL TIDAK LULUS PPDB</span>
          </div>
        </div>
        <div className="close-pendaftaran" style={{width: "110%"}}>
          <div className="card p-3 mt-5" style={{ backgroundColor: "#D2E3C8" }}>
            <div className="content d-flex align-items-center gap-3">
              <button className="btn btn-primary" style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }}><i className="fa-solid fa-laptop me-1"></i>Tutup Pendaftaran PPDB Online!</button>
              <div style={{ fontSize: "13px" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Status pendaftaran PPDB Online</span> masih dibuka. Terakhir diubah mm/dd/yyyy hh:mm:dd</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home