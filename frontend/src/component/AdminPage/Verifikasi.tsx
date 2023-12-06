/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../Layout/AdminPage/Layout"
import DatePickers from "../../utils/DatePickers";


const Verifikasi = () => {

  return (
    <Layout>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="text-header p-3">
            <span style={{ fontWeight: "bold" }}>VERIFIKASI DATA</span>
            <hr style={{ marginTop: "3px" }} />
            <DatePickers/>
          </div>
          <div className="searching" >
            <hr style={{ marginTop: "-1px" }} />
            <label htmlFor="" className="me-2 ms-3" style={{fontSize: "12px"}}>Filter :</label>
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
    </Layout>
  )
}

export default Verifikasi