import LayoutAdmin from "../component/LayoutAdmin"
import { useState } from "react"
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import DatePickers from "../../utils/DatePickers"

export const Dashboard = () => {
  return (
    <LayoutAdmin>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>DASHBOARD</span>
          </div>
          <div className="card-body p-4">
            <span>Selamat Datang, SMP ISLAM WALISONGO</span>
          </div>
        </div>
        <div className="list-card d-flex mt-4 gap-4" style={{ width: "104%" }}>
          <div className="col-sm-4 p-2 " style={{ backgroundColor: "#9ADE7B", color: "white" }}>
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
        <div className="close-pendaftaran" style={{ width: "110%" }}>
          <div className="card p-3 mt-5" style={{ backgroundColor: "#D2E3C8" }}>
            <div className="content d-flex align-items-center gap-3">
              <button className="btn btn-primary" style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }}><i className="fa-solid fa-laptop me-1"></i>Tutup Pendaftaran PPDB Online!</button>
              <div style={{ fontSize: "13px" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Status pendaftaran PPDB Online</span> masih dibuka. Terakhir diubah mm/dd/yyyy hh:mm:dd</div>
            </div>
          </div>
        </div>
      </section>
    </LayoutAdmin>
  )
}

export const Verifikasi = () => {
  return (
    <LayoutAdmin>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="text-header p-3">
            <span style={{ fontWeight: "bold" }}>VERIFIKASI DATA</span>
            <hr style={{ marginTop: "3px" }} />
            <DatePickers />
          </div>
          <div className="searching" >
            <hr style={{ marginTop: "-1px" }} />
            <label htmlFor="" className="me-2 ms-3" style={{ fontSize: "12px" }}>Filter :</label>
            <input type="text" style={{ padding: "4px", fontSize: "12px", height: "25px" }} placeholder="Type to filter" name="search" />
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%" }}>No</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "10%" }}>No. Pendaftaran</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "12%" }}>NISN</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "15%" }}>NIK</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "15%" }}>Nama</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Status</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Aksi</th>
                </tr>
              </thead>
              {/* <tbody>
                <tr>
                  <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                    <span className="d-flex justify-content-center" style={{ backgroundColor: "green", color: "white", padding: "7px", fontSize: "10px", borderRadius: "8px" }}>BELUM TERVERIFIKASI</span>
                  </td>
                  <td style={{ fontWeight: "normal" }} className="d-flex gap-3 justify-content-center">
                    <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} className="btn btn-danger">
                      <i className="fa fa-solid fa-x"></i>
                    </button>
                    <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} className="btn btn-danger">
                      <i className="fa fa-solid fa-print"></i>
                    </button>
                    <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} className="btn btn-success">
                      <i className="fa fa-solid fa-check"></i>
                    </button>
                  </td>
                </tr>
              </tbody> */}
            </table>
          </div>
          <div className="d-flex justify-content-end me-4">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </LayoutAdmin>
  )
}

export const Kelulusan = () => {
  return (
    <LayoutAdmin>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="text-header p-3">
            <span style={{ fontWeight: "bold" }}>VERIFIKASI KELULUSAN</span>
            <hr style={{ marginTop: "3px" }} />
            <DatePickers />
          </div>
          <div className="searching" >
            <hr style={{ marginTop: "-1px" }} />
            <label htmlFor="" className="me-2 ms-3" style={{ fontSize: "12px" }}>Filter :</label>
            <input type="text" style={{ padding: "4px", fontSize: "12px", height: "25px" }} placeholder="Type to filter" name="search" />
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%" }}>No</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "10%" }}>No. Pendaftaran</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "12%" }}>NISN</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "15%" }}>NIK</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "15%" }}>Nama</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Status</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Aksi</th>
                </tr>
              </thead>
              {/* <tbody>
                <tr>
                  <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px" }}>1</td>
                  <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                    <span className="d-flex justify-content-center" style={{ backgroundColor: "green", color: "white", padding: "7px", fontSize: "10px", borderRadius: "8px" }}>BELUM TERVERIFIKASI</span>
                  </td>
                  <td style={{ fontWeight: "normal" }} className="d-flex gap-3 justify-content-center">
                    <button type="button" style={{ fontSize: "10px", fontWeight: "bold", height: "25px" }} className="btn btn-danger d-flex align-items-center">
                      <i className="fa fa-solid fa-x me-2"></i>
                      Tidak
                    </button>
                    <button type="button" style={{ fontSize: "10px", fontWeight: "bold", height: "25px" }} className="btn btn-success d-flex align-items-center">
                      <i className="fa fa-solid fa-check me-2"></i>
                      Lulus
                    </button>
                  </td>
                </tr>
              </tbody> */}
            </table>
          </div>
          <div className="d-flex justify-content-end me-4">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </LayoutAdmin>
  )
}

export const Kelola = () => {
  const [content, setContent] = useState('')
  return (
    <LayoutAdmin>
      <section>
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: "bold" }}>
              Perbarui Pengumuman
            </span>
          </div>
          <div className="content">
            <ReactQuill
              value={content}
              onChange={setContent}
            // modules={modules}
            />
          </div>
          <div className="card-footer d-flex justify-content-end align-items-center">
            <button className="btn btn-primary"> SIMPAN</button>
          </div>
        </div>
      </section>
    </LayoutAdmin>
  )
}


