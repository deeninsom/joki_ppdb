/* eslint-disable @typescript-eslint/no-explicit-any */
import LayoutPengunjung from "../component/LayoutPengunjung"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/SMP-removebg-preview.jpg"
import backgroundImage from "../../assets/image_bg.jpg"
import shape1 from '../../assets/telah-dibuka.png'
import alur from "../../assets/ALUR.png"
import { useEffect, useState } from "react"
import axiosInstance from "../../service/_api"




const LandingPage = () => {
  const navigate = useNavigate()

  const handlePendaftaran = (route: string) => {
    navigate(route)
  }

  const [website, setWebsite]: any = useState({})

  useEffect(() => {
    axiosInstance.get(`/websites/1`)
      .then((response) => {
        setWebsite(response.data.data)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [])

  return (
    <LayoutPengunjung>
      <section className="content-jumbotron" style={{ height: "500px", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>
        <div className="inline-content d-flex justify-content-center align-items-center">
          <div className="content text-white">
            <div className="header-logo d-flex justify-content-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
              <img src={logo} height={140} alt="" />
            </div>
            <div style={{ fontSize: "40px", textAlign: "center", fontWeight: "bold", fontFamily: "monospace" }}>
              SELAMAT DATANG DI PPDB ONLINE<br />
              <span>SMP ISLAM WALISONGO</span>
            </div>
            <div className="button-flex d-flex gap-2 justify-content-center" style={{ marginTop: "20px" }}>
              {
                website.status_pendaftaran == 0 ?
                  (
                    <button onClick={() => handlePendaftaran('/form-pendaftaran')} disabled className="btn btn-danger" style={{ backgroundColor: 'red' }}><i className="fa fa-solid fa-clipboard-list me-2"></i>PENDAFTARAN DITUTUP</button>
                  ) :
                  (
                    <button onClick={() => handlePendaftaran('/form-pendaftaran')} className="btn btn-primary"><i className="fa fa-solid fa-clipboard-list me-2"></i>DAFTAR</button>
                  )

              }
              <button onClick={() => handlePendaftaran('/login')} className="btn btn-primary"><i className="fa fa-solid fa-arrow-right-to-bracket me-2"></i>MASUK</button>
            </div>
          </div>
        </div>
      </section>

      <section className="content-1" id="alur" style={{ height: "620px", backgroundColor: "#004b49", color: "white" }}>
        <div className="inline-content d-flex justify-content-center align-items-center">
          <div className="content-text text-center">
            <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>ALUR PPDB ONLINE</p>
            <hr className="mt-2" style={{ width: "60%", color: "white", marginLeft: "80px" }} />
          </div>
        </div>
        <div className="content-body d-flex justify-content-center mt-4">
          <img src={alur} height={400} alt="" />
        </div>
      </section>

      <section className="content-2 pb-4" id="info" style={{ backgroundColor: "#EEEEEE", color: "black" }}>
        <div className="d-flex justify-content-center">
          <div className="content-text  mb-3">
            <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>INFORMASI PPDB ONLINE</p>
            <hr className="mt-4" style={{ width: "60%", color: "black", marginLeft: "108px" }} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card" style={{ height: "350px", width: "50%", padding: "20px", backgroundColor: "#527853", color: "white" }}>
            <span className="text-center my-3" style={{ fontSize: "30px", fontWeight: "bold" }}>PENERIMAAN PESERTA DIDIK BARU</span>
            {
              website.status_pendaftaran != 0 ?
                (
                  <>
                    <span className="text-center my-3" style={{ backgroundImage: `url(${shape1})`, width: "100%" }}>
                      Telah Dibuka !</span>
                    <div className="card p-4">
                      <span>
                        {website.pengumuman_umum}
                      </span></div>
                  </>
                ) :
                (
                  <>
                    <span className="text-center my-3" style={{ backgroundImage: `url(${shape1})`, width: "100%" }}>
                      Masih Ditutup !</span>
                    <div className="card p-4">
                      <span>
                        Belum ada pemberitahuan lebih lanjut !
                      </span>
                      </div>
                  </>
                )
            }
          </div>
        </div>
      </section>

      <section className="content-2" id="profile" style={{ height: "450px", backgroundColor: "#EEEEEE", color: "black" }}>
        <div className="inline-content d-flex justify-content-center align-items-center">
          <div className="body">
            <div className="content-text text-center">
              <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>PROFILE SEKOLAH</p>
              <hr className="mt-4" style={{ width: "20%", color: "black", marginLeft: "40%" }} />
            </div>
            <div className="content-body">
              <div className="row justify-content-center">
                <div className="col-5">
                  <span className="d-block text-center my-3" style={{ textAlign: "justify", fontWeight: "bold" }}>VISI MISI</span> Visi Sekolah adalah imajinasi moral yang dijadikan dasar atau rujukan dalam menentukan tujuan atau keadaan masa depan sekolah yang secara khusus diharapkan oleh Sekolah. Visi Sekolah merupakan turunan dari Visi Pendidikan Nasional, yang dijadikan dasar atau rujukan untuk merumuskan Misi, Tujuan sasaran untuk pengembangan sekolah dimasa depan yang diimpikan dan terus terjaga kelangsungan hidup dan perkembangannya.
                  <span className="d-block text-center mt-3" style={{ fontWeight: "bold", fontStyle: "italic" }}>“BERPRESTASI DALAM ILMU PENGETAHUAN YANG BERLANDASKAN IMAN DAN TAQWA SERTA BERBUDI PEKERTI LUHUR”</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-4" id="kontak" style={{ height: "300px", backgroundColor: "#004b49", color: "white" }}>
        <div className="inline-content d-flex justify-content-center align-items-center">
          <div className="content-text text-center">
            <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>KONTAK KAMI</p>
            <hr className="mt-4" style={{ width: "100%", color: "white" }} />
            <p style={{ fontSize: "15px", textAlign: "center", fontFamily: "monospace", paddingTop: "50px" }}>
              PPDB ONLINE &copy; SMP ISLAM WALISONGO<br />
              <span>Ds. Teben Kemuning, Kamoning, Sampang</span>
            </p>
            <div style={{ fontSize: "15px", textAlign: "center", fontFamily: "monospace" }}>
              <span style={{ display: "block" }}><i className="fa fa-solid fa-phone me-2"></i>+62 878-6559-2040</span>
              <span><i className="fa fa-solid fa-envelope me-2"></i>smpwalisongo@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </LayoutPengunjung>
  )
}

export default LandingPage