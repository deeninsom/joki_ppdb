import logo from "../../../assets/SMP-removebg-preview.jpg"
import Layout from "../../Layout/SiswaPage/Layout"

const CardBiodata = () => {
  return (
    <Layout>
      <section>
        <div className="body" style={{ width: "100%" }}>
          <div className="list-card d-flex gap-3">
            <div className="col-sm-9">
              <div className="card">
                <div className="card-header">
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}><i className="fa fa-solid fa-user me-2"></i>BIODATA SISWA</span>
                </div>
                <div className="card-body p-3">
                  <table className="table table-bordered">
                    <tbody>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Pendaftaran</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Pendaftaran</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Nama Lengkap</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>N.I.S.N</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>N.I.K</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Tempat Lahir</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Tanggal Lahir</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jenis Kelamin</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Agama</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Handphone/WA</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-sm-4" style={{ backgroundColor: "#ffff", display: "block" }}>
              <div className="card p-5">
                <div className="logo d-flex justify-content-center">
                  <img src={logo} className="text-center" width={100} alt="" />
                </div>
                <hr />
                <div className="date-register">
                  <span style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>Tanggal Daftar:</span>
                  <span style={{ fontSize: "12px", display: "block" }}>21 November 2023 20:16:27</span>
                </div>
                <hr />
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>No. Pendaftaran : <span style={{ fontSize: "12px", fontWeight: "normal" }}>-</span></span>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}><i className="fa fa-solid fa-file me-2"></i>DATA ALAMAT SISWA</span>
                </div>
                <div className="card-body p-3">
                  <table className="table table-bordered">
                    <tbody>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Alamat</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Desa</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kecamatan</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kabupaten</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Provinsi</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kode Pos</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jarak ke sekolah</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}><i className="fa fa-solid fa-file me-2"></i>DATA ORANG TUA</span>
                </div>
                <div className="card-body p-3">
                  <table className="table table-bordered">
                    <tbody>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Nama Orang Tua / Wali </td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Alamat</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jenis Pekerjaan</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Handphone/WA</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 mt-3 mb-3">
            <div className="card">
              <div className="card-header">
                <span style={{ fontSize: "13px", fontWeight: "bold" }}><i className="fa fa-solid fa-file me-2"></i>DATA SEKOLAH</span>
              </div>
              <div className="card-body p-3">
                <table className="table table-bordered">
                  <tbody>
                    <tr style={{ fontSize: "12px" }}>
                      <td className="p-3" style={{ width: "10%" }}>Nama Sekolah</td>
                      <td className="p-3 " style={{ width: "2%" }}>:</td>
                      <td className="p-3">-</td>
                    </tr>
                    <tr style={{ fontSize: "12px" }}>
                      <td className="p-3" style={{ width: "10%" }}>Jenjang Sekolah </td>
                      <td className="p-3 " style={{ width: "2%" }}>:</td>
                      <td className="p-3">-</td>
                    </tr>
                    <tr style={{ fontSize: "12px" }}>
                      <td className="p-3" style={{ width: "10%" }}>N.P.S.N </td>
                      <td className="p-3 " style={{ width: "2%" }}>:</td>
                      <td className="p-3">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CardBiodata