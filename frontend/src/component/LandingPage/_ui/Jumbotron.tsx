import { useNavigate } from "react-router-dom"
import logo from "../../../assets/SMP-removebg-preview.jpg"
import backgroundImage from "../../../assets/image_bg.jpg"


const Jumbotron = () => {
  const navigate = useNavigate()

  const handlePendaftaran = () => {
    navigate("/form/pendaftaran")
  }

  return (
    <section className="content-jumbotron" style={{ height: "500px", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>
      <div className="inline-content d-flex justify-content-center align-items-center">
        <div className="content text-white">
          <div className="header-logo d-flex justify-content-center" style={{marginTop: "50px", marginBottom: "50px"}}>
            <img src={logo} height={140} alt="" />
          </div>
          <div style={{ fontSize: "40px", textAlign: "center", fontWeight: "bold", fontFamily: "monospace" }}>
            SELAMAT DATANG DI PPDB ONLINE<br />
            <span>SMP ISLAM WALISONGO</span>
          </div>
          <div className="button-flex d-flex gap-2 justify-content-center" style={{marginTop: "20px"}}>
            <button onClick={handlePendaftaran} className="btn btn-primary"><i className="fa fa-solid fa-clipboard-list me-2"></i>DAFTAR</button>
            <button className="btn btn-primary"><i className="fa fa-solid fa-arrow-right-to-bracket me-2"></i>MASUK</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Jumbotron