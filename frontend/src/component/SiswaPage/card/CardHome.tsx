import { useNavigate } from "react-router-dom"
import Layout from "../../Layout/SiswaPage/Layout"

const CardHome = () => {
  const navigate = useNavigate()

  const navigatePage = () => {
    navigate("/panel_siswa/biodata")
  } 

  return (
    <Layout>
    <section>
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "GrayText" }}>
          <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO PENGUMUMAN</span>
        </div>
        <div className="card-body p-4">
          <span>Belum ada pengumuman dari Panitia PPDB Online SMP ISLAM WALISONGO</span>
        </div>
      </div>
      <div className="list-card d-flex mt-4 gap-4">
        <div className="col-sm-5 p-4 text-center" onClick={navigatePage} style={{backgroundColor: "#9ADE7B", color: "white", cursor: "pointer"}}>
          <i className="fa-solid fa-file-circle-check" style={{ fontSize: "80px" }}></i>
          <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>BIODATA</span>
        </div>
        <div className="col-sm-5 p-4 text-center" style={{backgroundColor: "#29ADB2", color: "white", cursor: "pointer"}}>
          <i className="fa-solid fa-print" style={{marginTop: "2px", fontSize: "70px" }}></i>
          <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>PRINT PENDAFTARAN</span>
        </div>
      </div>
    </section>
    </Layout>
  )
}

export default CardHome