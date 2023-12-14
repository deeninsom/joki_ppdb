/* eslint-disable @typescript-eslint/no-explicit-any */
import LayoutAdmin from "../component/LayoutAdmin"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import DatePickers from "../../utils/DatePickers"
import axiosInstance from "../../service/_api";

export const Dashboard = () => {
  const [viewSiswa, setViewSiswa]: any = useState({})


  useEffect(() => {
    axiosInstance.get(`/siswa?page=${1}&limit=${10}`)
      .then((response) => {
        setViewSiswa(response.data)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [])


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
            <span className="" style={{ fontSize: "40px" }}>{viewSiswa.totalData}</span>
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

  const [viewSiswa, setViewSiswa] = useState([])
  const [viewDetailSiswa, setViewDetailSiswa]: any = useState({})
  const [selectedStatus, setSelectedStatus] = useState("false");
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axiosInstance.get(`/siswa?kode_pendaftaran=${searchValue.slice(1)}&status=0&page=${page}&limit=${limit}&filterDate=${selectedDate}`)
      .then((response) => {
        setViewSiswa(response.data.data)
        setLimit(response.data.limits)
        setPage(response.data.pages)
        setTotalPages(response.data.totalPages)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [searchValue, page, limit, selectedDate])

  const handleViewDetail = (id: string) => {
    axiosInstance.get(`/siswa/${id}`)
      .then((response) => {
        setViewDetailSiswa(response.data.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const handleDelete = (id: string) => {
    axiosInstance.delete(`/siswa/${id}`)
      .then(() => {
        setViewSiswa(prevSiswa => prevSiswa.filter((siswa: any) => siswa.id !== id));
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const viewPdf = () => {
    window.open(viewDetailSiswa.file_rapot)
  }

  const changeStatus = (id: string) => {
    viewDetailSiswa.status = Boolean(selectedStatus)
    axiosInstance.put(`/siswa/${id}`, viewDetailSiswa)
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    setPage(page - 1)
  }

  return (
    <LayoutAdmin>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="text-header p-3">
            <span style={{ fontWeight: "bold" }}>VERIFIKASI DATA</span>
            <hr style={{ marginTop: "3px" }} />
            <DatePickers setSelectDate={setSelectedDate} />
          </div>
          <div className="searching" >
            <hr style={{ marginTop: "-1px" }} />
            <label htmlFor="" className="me-2 ms-3" style={{ fontSize: "12px" }}>Filter :</label>
            <input type="text" style={{ padding: "4px", fontSize: "12px", height: "25px" }} placeholder="Cari kode pendaftaran" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} name="search" />
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
              <tbody>
                {
                  viewSiswa.map((val: any, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{index + 1}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.kode_pendaftaran}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nisn}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nik}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nama_lengkap}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                        {
                          val.status == 0 ? (
                            <span className="d-flex justify-content-center bg-warning" style={{ padding: "7px", fontSize: "10px", borderRadius: "8px" }}>BELUM TERVERIFIKASI</span>
                          ) : (
                            <span className="d-flex justify-content-center" style={{ backgroundColor: "green", color: "white", padding: "7px", fontSize: "10px", borderRadius: "8px" }}>TERVERIFIKASI</span>
                          )
                        }
                      </td>
                      <td style={{ fontWeight: "normal" }} className="d-flex gap-3 justify-content-center">
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} data-bs-toggle="modal" data-bs-target="#viewdetail" className="btn btn-secondary">
                          <i className="fa fa-solid fa-eye"></i>
                        </button>
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#viewdetailupdate">
                          <i className="fa fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleDelete(val.id)} className="btn btn-danger">
                          <i className="fa fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="setlimit ms-3 d-flex align-items-center gap-2 mb-3">
              <label htmlFor="limit" style={{ fontSize: "10px" }}>Limit</label>
              <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} name="" id="" style={{ fontSize: "10px", padding: "3px" }}>
                <option defaultValue={limit}>{limit}</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <nav aria-label="Page navigation example" style={{ marginRight: "15px" }} >
              <ul className="pagination" >
                <li className="page-item" onClick={handlePrevPage}>
                  <button disabled={page == 1} className="page-link" style={{ fontSize: '10px', cursor: page == 1 ? "" : "pointer" }} aria-label="Previous">
                    <span aria-hidden="true" >&laquo;</span>
                  </button>
                </li>
                <li className="page-item" ><div className="page-link" style={{ fontSize: '10px', cursor: "pointer" }} >{page}</div></li>
                <li className="page-item" onClick={handleNextPage}>
                  <button disabled={page >= totalPages} className="page-link" style={{ fontSize: '10px', cursor: page >= totalPages ? "" : "pointer" }} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="modal" tabIndex={-1} id="viewdetail">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              Lihat Data
            </div>
            <div className="modal-body">
              <ul style={{ listStyle: "none" }}>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>No. Pendaftaran</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.kode_pendaftaran}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nama Lengkap</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nama_lengkap}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NISN</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nisn}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NIK</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nik}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Tempat Lahir</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.tempat_lahir}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Tanggal Lahir</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.tanggal_lahir}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Jenis Kelamin</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.jenis_kelamin}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Agama</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.agama}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Rata - rata ( rapot )</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nilai_rapot}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>File Rapot</div>
                  <div>:</div>
                  <div className="ms-2">
                    {
                      viewDetailSiswa.file_raport !== '' ? (
                        <i className="fa fa-solid fa-file-pdf" onClick={viewPdf} style={{ color: "red", fontSize: "20px", cursor: "pointer" }}></i>
                      ) : (
                        ''
                      )
                    }
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Alamat</div>
                </li>
                <ul>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Alamat</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.alamat}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Desa</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.desa}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Kecamatan</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.kecamatan}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Kabupaten</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.kabupaten}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Jarak Sekolah</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.jarak_sekolah}</div>
                  </li>
                </ul>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Wali</div>
                </li>
                <ul>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Nama Wali</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.nama_wali}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>NO. Handphone</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.no_handphone}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Alamat</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.alamat}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Jenis Pekerjaan</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.jenis_pekerjaan}</div>
                  </li>
                </ul>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Sekolah</div>
                </li>
                <ul>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Nama Sekolah</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_sekolah?.nama_sekolah}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Jenjang Sekolah</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_sekolah?.jenjang_sekolah}</div>
                  </li>
                </ul>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" tabIndex={-1} id="viewdetailupdate">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              Lihat Data
            </div>
            <div className="modal-body">
              <ul style={{ listStyle: "none" }}>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>No. Pendaftaran</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.kode_pendaftaran}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nama Lengkap</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nama_lengkap}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NISN</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nisn}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NIK</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nik}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Tempat Lahir</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.tempat_lahir}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Tanggal Lahir</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.tanggal_lahir}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Jenis Kelamin</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.jenis_kelamin}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Agama</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.agama}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Rata - rata ( rapot )</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.nilai_rapot}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>File Rapot</div>
                  <div>:</div>
                  <div className="ms-2">
                    {
                      viewDetailSiswa.file_raport !== '' ? (
                        <i className="fa fa-solid fa-file-pdf" onClick={viewPdf} style={{ color: "red", fontSize: "20px", cursor: "pointer" }}></i>
                      ) : (
                        ''
                      )
                    }
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Alamat</div>
                </li>
                <ul>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Alamat</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.alamat}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Desa</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.desa}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Kecamatan</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.kecamatan}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Kabupaten</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.kabupaten}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Jarak Sekolah</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_alamat?.jarak_sekolah}</div>
                  </li>
                </ul>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Wali</div>
                </li>
                <ul>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Nama Wali</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.nama_wali}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>NO. Handphone</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.no_handphone}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Alamat</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.alamat}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Jenis Pekerjaan</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_wali?.jenis_pekerjaan}</div>
                  </li>
                </ul>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Sekolah</div>
                </li>
                <ul>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Nama Sekolah</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_sekolah?.nama_sekolah}</div>
                  </li>
                  <li className="d-flex my-2">
                    <div style={{ width: "40%" }}>Jenjang Sekolah</div>
                    <div>:</div>
                    <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailSiswa.data_sekolah?.jenjang_sekolah}</div>
                  </li>
                </ul>
                <li className="d-flex my-2 align-items-center">
                  <div style={{ width: "40%" }}>Status</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{
                    viewDetailSiswa.status == 0 ? 'Belum Diverifikasi' : 'Sudah Diverifikasi'
                  }</div>
                </li>
              </ul>
              <p className="ms-3" style={{ fontSize: '12px', marginTop: '5%', fontWeight: 'bold' }}>Ubah status penerimaan :</p>
              <div className="changestatus d-flex gap-2 ms-3">
                <div className="col-4">
                  <select
                    value={viewDetailSiswa.status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="form-select" aria-label="Default select example">
                    <option selected>Pilih Status</option>
                    <option value="true">Diterima</option>
                    <option value="false">Tidak Diterima</option>
                  </select>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2" style={{ fontSize: "12px" }} onClick={() => changeStatus(viewDetailSiswa?.id)}>
                  <i className="fa fa-solid fa-repeat"></i>
                  Ubah
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
      {/* {
        buttonView && (
        )
      } */}
    </LayoutAdmin >
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
            {/* <DatePickers /> */}
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
                  <div className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </div>
                </li>
                {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                <li className="page-item">
                  <div className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </LayoutAdmin>
  )
}

export const KelolaPengumuman = () => {
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

export const KelolaUjian = () => {
  // const [viewSiswa, setViewSiswa] = useState([])
  // const [viewDetailSiswa, setViewDetailSiswa]: any = useState({})
  // const [selectedStatus, setSelectedStatus] = useState("false");
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    axiosInstance.get(`/siswa?kode_pendaftaran=${searchValue.slice(1)}&status=0&page=${page}&limit=${limit}`)
      .then((response) => {
        console.log(response.data)
        // setViewSiswa(response.data.data)
        setLimit(response.data.limits)
        setPage(response.data.pages)
        setTotalPages(response.data.totalPages)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [searchValue, page, limit])

  // const handleViewDetail = (id: string) => {
  //   axiosInstance.get(`/siswa/${id}`)
  //     .then((response) => {
  //       setViewDetailSiswa(response.data.data)
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //     })
  // }

  // const handleDelete = (id: string) => {
  //   axiosInstance.delete(`/siswa/${id}`)
  //     .then(() => {
  //       setViewSiswa(prevSiswa => prevSiswa.filter((siswa: any) => siswa.id !== id));
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //     })
  // }

  // const viewPdf = () => {
  //   window.open(viewDetailSiswa.file_rapot)
  // }

  // const changeStatus = (id: string) => {
  //   viewDetailSiswa.status = Boolean(selectedStatus)
  //   axiosInstance.put(`/siswa/${id}`, viewDetailSiswa)
  //     .then(() => {
  //       window.location.reload()
  //     })
  //     .catch((error) => {
  //       console.error('Error updating status:', error);
  //     });
  // };

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    setPage(page - 1)
  }
  return (
    <LayoutAdmin>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="text-header p-3">
            <span style={{ fontWeight: "bold" }}>KELOLA NILAI UJIAN</span>
            <hr style={{ marginTop: "3px" }} />
            {/* <DatePickers /> */}
          </div>
          <hr style={{ marginTop: "-1px" }} />
          <div className="header-2 d-flex justify-content-between">
            <div className="searching" >
              <label htmlFor="" className="me-2 ms-3" style={{ fontSize: "12px" }}>Filter :</label>
              <input type="text" style={{ padding: "4px", fontSize: "12px", height: "25px" }} placeholder="Cari kode pendaftaran" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} name="search" />
            </div>
            <button className="btn btn-primary me-4" style={{ fontSize: "10px" }} data-bs-toggle="modal" data-bs-target="#inputnilai"><i className="fa fa-solid fa-plus"></i></button>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%" }}>No</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "10%" }}>No. Pendaftaran</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "2%", textAlign: "center" }}>Matematika</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%", textAlign: "center" }}>Indonesia</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%", textAlign: "center" }}>Agama</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%", textAlign: "center" }}>Inggris</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "4%" }}>Nilai Ujian</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Aksi</th>
                </tr>
              </thead>
              {/* <tbody>
                {
                  viewSiswa.map((val: any, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{index + 1}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.kode_pendaftaran}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nisn}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nik}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nama_lengkap}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                        {
                          val.status == 0 ? (
                            <span className="d-flex justify-content-center bg-warning" style={{ padding: "7px", fontSize: "10px", borderRadius: "8px" }}>BELUM TERVERIFIKASI</span>
                          ) : (
                            <span className="d-flex justify-content-center" style={{ backgroundColor: "green", color: "white", padding: "7px", fontSize: "10px", borderRadius: "8px" }}>TERVERIFIKASI</span>
                          )
                        }
                      </td>
                      <td style={{ fontWeight: "normal" }} className="d-flex gap-3 justify-content-center">
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} data-bs-toggle="modal" data-bs-target="#viewdetail" className="btn btn-secondary">
                          <i className="fa fa-solid fa-eye"></i>
                        </button>
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#viewdetailupdate">
                          <i className="fa fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleDelete(val.id)} className="btn btn-danger">
                          <i className="fa fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody> */}
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="setlimit ms-3 d-flex align-items-center gap-2 mb-3">
              <label htmlFor="limit" style={{ fontSize: "10px" }}>Limit</label>
              <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} name="" id="" style={{ fontSize: "10px", padding: "3px" }}>
                <option defaultValue={limit}>{limit}</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <nav aria-label="Page navigation example" style={{ marginRight: "15px" }} >
              <ul className="pagination" >
                <li className="page-item" onClick={handlePrevPage}>
                  <button disabled={page == 1} className="page-link" style={{ fontSize: '10px', cursor: page == 1 ? "" : "pointer" }} aria-label="Previous">
                    <span aria-hidden="true" >&laquo;</span>
                  </button>
                </li>
                <li className="page-item" ><div className="page-link" style={{ fontSize: '10px', cursor: "pointer" }} >{page}</div></li>
                <li className="page-item" onClick={handleNextPage}>
                  <button disabled={page >= totalPages} className="page-link" style={{ fontSize: '10px', cursor: page >= totalPages ? "" : "pointer" }} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="modal" tabIndex={-1} id="inputnilai">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              Lihat Data
            </div>
            <div className="modal-body">
              <ul style={{ listStyle: "none" }}>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>No. Pendaftaran</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>m</div>
                </li>

              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}


