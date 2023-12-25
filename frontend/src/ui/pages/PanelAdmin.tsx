/* eslint-disable @typescript-eslint/no-explicit-any */
import LayoutAdmin from "../component/LayoutAdmin"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import DatePickers from "../../utils/DatePickers"
import axiosInstance from "../../service/_api";
import parse from 'html-react-parser';

export const Dashboard = () => {
  const [viewSiswa, setViewSiswa]: any = useState(0)
  const [lolosSeleksi, setlolosSeleksi]: any = useState(0)
  const [tidakLolosSeleksi, setTidakLolosSeleksi]: any = useState(0)
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

  const updateStatusPendaftaran = (status: boolean) => {
    axiosInstance.put(`/websites/1`, {
      status_pendaftaran: status
    })
      .then((response) => {
        setWebsite(response.data.data)
      })
      .catch((error: any) => {
        alert(error)
      })
  }

  useEffect(() => {
    axiosInstance.get(`/siswa?page=${1}&limit=${10}`)
      .then((response) => {
        setViewSiswa(response.data.data.length)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [])

  useEffect(() => {
    axiosInstance.get(`/nilai?status_seleksi=lolos&page=${1}&limit=${10}`)
      .then((response) => {
        setlolosSeleksi(response.data.totalData)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [])

  useEffect(() => {
    axiosInstance.get(`/nilai?status_seleksi=tidak lolos&page=${1}&limit=${10}`)
      .then((response) => {
        setTidakLolosSeleksi(response.data.totalData)
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
            <span className="" style={{ fontSize: "40px" }}>{viewSiswa}</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>JUMLAH PENDAFTAR</span>
          </div>
          <div className="col-sm-4 p-2 " style={{ backgroundColor: "#29ADB2", color: "white" }}>
            <span className="" style={{ fontSize: "40px" }}>{lolosSeleksi}</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>TOTAL LULUS PPDB</span>
          </div>
          <div className="col-sm-4 p-2 " style={{ backgroundColor: "#29ADB2", color: "white" }}>
            <span className="" style={{ fontSize: "40px" }}>{tidakLolosSeleksi}</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", display: "block" }}>TOTAL TIDAK LULUS PPDB</span>
          </div>
        </div>
        <div className="close-pendaftaran" style={{ width: "110%" }}>
          <div className="card p-3 mt-5" style={{ backgroundColor: "#D2E3C8" }}>
            <div className="content d-flex align-items-center gap-3">
              {
                website.status_pendaftaran == 0 ?
                  (
                    <>
                      <button className="btn btn-danger" onClick={() => updateStatusPendaftaran(true)} style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }}><i className="fa-solid fa-laptop me-1"></i>Buka Pendaftaran PPDB Online!</button>
                      <div style={{ fontSize: "13px" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Status pendaftaran PPDB Online</span> masih ditutup. Terakhir diubah {website.updated_at}</div>
                    </>
                  ) :
                  (
                    <>
                      <button className="btn btn-primary" onClick={() => updateStatusPendaftaran(false)} style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }}><i className="fa-solid fa-laptop me-1"></i>Tutup Pendaftaran PPDB Online!</button>
                      <div style={{ fontSize: "13px" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Status pendaftaran PPDB Online</span> masih dibuka. Terakhir diubah {website.updated_at}</div>
                    </>
                  )
              }
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
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axiosInstance.get(`/siswa?kode_pendaftaran=${searchValue.slice(1)}&status=menunggu&page=${page}&limit=${limit}&filterDate=${selectedDate}`)
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
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.nama_lengkap}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                        {
                          val.status === 'menunggu' && (
                            <span className="d-flex justify-content-center bg-warning" style={{ padding: "7px", fontSize: "10px", borderRadius: "8px" }}>BELUM TERVERIFIKASI</span>
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
                {
                  viewDetailSiswa.data_alamat && viewDetailSiswa.data_alamat.map((val: any, index: any) => (
                    <ul key={index}>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Alamat</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.alamat}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Desa</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.desa}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Kecamatan</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.kecamatan}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Kabupaten</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.kabupaten}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Jarak Sekolah</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.jarak_sekolah}</div>
                      </li>
                    </ul>
                  ))
                }
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Wali</div>
                </li>
                {
                  viewDetailSiswa.data_alamat && viewDetailSiswa.data_wali.map((val: any, index: any) => (
                    <ul key={index}>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Nama Wali</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.nama_wali}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>NO. Handphone</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.no_handphone}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Alamat</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.alamat}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Jenis Pekerjaan</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.jenis_pekerjaan}</div>
                      </li>
                    </ul>
                  ))
                }
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Sekolah</div>
                </li>
                {
                  viewDetailSiswa.data_sekolah && viewDetailSiswa.data_sekolah.map((val: any, index: any) => (
                    <ul key={index}>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Nama Sekolah</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.nama_sekolah}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Jenjang Sekolah</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.jenjang_sekolah}</div>
                      </li>
                    </ul>
                  ))
                }
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
                {
                  viewDetailSiswa.data_alamat && viewDetailSiswa.data_alamat.map((val: any, index: any) => (
                    <ul key={index}>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Alamat</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.alamat}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Desa</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.desa}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Kecamatan</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.kecamatan}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Kabupaten</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.kabupaten}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Jarak Sekolah</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.jarak_sekolah}</div>
                      </li>
                    </ul>
                  ))
                }
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Wali</div>
                </li>
                {
                  viewDetailSiswa.data_alamat && viewDetailSiswa.data_wali.map((val: any, index: any) => (
                    <ul key={index}>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Nama Wali</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.nama_wali}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>NO. Handphone</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.no_handphone}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Alamat</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.alamat}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Jenis Pekerjaan</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.jenis_pekerjaan}</div>
                      </li>
                    </ul>
                  ))
                }
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Data Sekolah</div>
                </li>
                {
                  viewDetailSiswa.data_sekolah && viewDetailSiswa.data_sekolah.map((val: any, index: any) => (
                    <ul key={index}>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Nama Sekolah</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.nama_sekolah}</div>
                      </li>
                      <li className="d-flex my-2">
                        <div style={{ width: "40%" }}>Jenjang Sekolah</div>
                        <div>:</div>
                        <div className="ms-2" style={{ fontWeight: "bold" }}>{val.jenjang_sekolah}</div>
                      </li>
                    </ul>
                  ))
                }
                <li className="d-flex my-2 align-items-center">
                  <div style={{ width: "40%" }}>Status</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{
                    viewDetailSiswa.status === 'lolos' ? 'Sudah Diverifikasi' : 'Belum Diverifikasi'
                  }</div>
                </li>
              </ul>
              <p className="ms-3" style={{ fontSize: '12px', marginTop: '5%', fontWeight: 'bold' }}>Ubah status penerimaan :</p>
              <div className="changestatus d-flex gap-2 ms-3">
                <div className="col-4">
                  <select
                    value={viewDetailSiswa.status}
                    onChange={(e: any) => setViewDetailSiswa({ ...viewDetailSiswa, status: e.target.value })}
                    className="form-select" aria-label="Default select example">
                    <option selected>Pilih Status</option>
                    <option value="lolos">Diterima</option>
                    <option value="tidak lolos">Tidak Diterima</option>
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
  const [viewNilai, setViewNilai] = useState([])
  const [viewDetailNilai, setViewDetailNilai]: any = useState({})
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    axiosInstance.get(`/nilai?kode_pendaftaran=${searchValue.slice(1)}&status_seleksi=lolos&page=${page}&limit=${limit}`)
      .then((response) => {
        setViewNilai(response.data.data)
        setLimit(response.data.limits)
        setPage(response.data.pages)
        setTotalPages(response.data.totalPages)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [searchValue, page, limit])

  const handleViewDetail = (id: string) => {
    axiosInstance.get(`/nilai/${id}`)
      .then((response) => {
        setViewDetailNilai(response.data.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

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
            <span style={{ fontWeight: "bold" }}>HASIL LOLOS SELEKSI</span>
          </div>
          <div className="searching" >
            <hr style={{ marginTop: "-1px" }} />
            <label htmlFor="" className="me-2 ms-3" style={{ fontSize: "12px" }}>Filter :</label>
            <input type="text" style={{ padding: "4px", fontSize: "12px", height: "25px" }} placeholder="Type to filter" name="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%" }}>No</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "10%" }}>No. Pendaftaran</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "15%" }}>Nama</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "12%" }}>NISN</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Status</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center", width: "15%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  viewNilai.map((val: any, index) => (
                    <tr>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{index + 1}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.siswa_id?.kode_pendaftaran}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.siswa_id?.nama_lengkap}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.siswa_id?.nisn}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                        <span className="d-flex justify-content-center" style={{ backgroundColor: "green", color: "white", padding: "7px", fontSize: "10px", borderRadius: "8px", fontWeight: "bold" }}>{val.status}</span>
                      </td>
                      <td style={{ fontWeight: "normal" }} className="d-flex gap-3 justify-content-center">
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} data-bs-toggle="modal" data-bs-target="#viewdetailnilai" className="btn btn-secondary">
                          <i className="fa fa-solid fa-eye"></i>
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
      <div className="modal" tabIndex={-1} id="viewdetailnilai">
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
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.kode_pendaftaran}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nama Lengkap</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.nama_lengkap}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NISN</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.nisn}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Rapot</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.nilai_rapot}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Ujian</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.nilai_ujian}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Status</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.status == 0 ? 'Tidak Lolos' : 'Lolos'}</div>
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

export const KelolaPengumuman = () => {
  const [pengumumanUmum, setPengumumanUmum] = useState('')
  const [pengumumanUjian, setPengumumanUjian] = useState('')
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

  const handleUpdatePengumumanUmum = () => {
    const parseText: any = parse(pengumumanUmum)
    const resultText = parseText.props.children
    // const dataText = {
    //   text: '',
    //   href: ''
    // }

    // if(parseText.length > 0){
    //   parseText.map((val: any)=>{
    //     // console.log('halo')

    //     if(val.props.children === ''){
    //       console.log(val.props.children)
    //     }
    //     // if(parseText.props.children.type === 'a'){
    //     //   dataText.href = val.props.children.props.children
    //     // }else{
    //     //   dataText.text = val.props.children
    //     // }
    //   })
    // }else {
    //   console.log('hai')
    //   if(parseText.props.children.type === 'a'){
    //     dataText.href = parseText.props.children.props.children
    //   }else{
    //     dataText.text = parseText.props.children
    //   }
    // }

    // console.log(dataText)

    axiosInstance.put('/websites/1', {
      pengumuman_umum: resultText
    })
      .then((response) => {
        // window.location.reload()
        setPengumumanUmum(response.data.data.pengumuman_umum);
      })
      .catch((error) => {
        console.error('Error updating pengumuman umum:', error);
      });
  }

  const handleUpdatePengumumanUjian = () => {
    const parseText: any = parse(pengumumanUjian)
    const resultText = parseText.props.children

    axiosInstance.put('/websites/1', {
      pengumuman_ujian: resultText
    })
      .then((response) => {
        window.location.reload()
        setPengumumanUjian(response.data.data.pengumuman_ujian);
      })
      .catch((error) => {
        console.error('Error updating pengumuman umum:', error);
      });
  }

  return (
    <LayoutAdmin>
      <section>
        <div className="card">
          <div className="know content p-3">
            <span style={{ fontWeight: "bold" }}>Pengumuman saat ini :</span>
            <p style={{ marginTop: "10px" }}>{website.pengumuman_umum}</p>
          </div>
          <div className="card-header">
            <span style={{ fontWeight: "bold" }}>
              Perbarui Pengumuman Umum
            </span>
          </div>
          <div className="content">
            <ReactQuill
              value={pengumumanUmum}
              onChange={setPengumumanUmum}
            />
          </div>
          <div className="card-footer d-flex justify-content-end align-items-center">
            <button className="btn btn-primary" onClick={handleUpdatePengumumanUmum}> SIMPAN</button>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="card">
          <div className="know content p-3">
            <span style={{ fontWeight: "bold" }}>Pengumuman saat ini :</span>
            <p style={{ marginTop: "10px" }}>{website.pengumuman_ujian}</p>
          </div>
          <div className="card-header">
            <span style={{ fontWeight: "bold" }}>
              Perbarui Pengumuman Ujian
            </span>
          </div>
          <div className="content">
            <ReactQuill
              value={pengumumanUjian}
              onChange={setPengumumanUjian}
            />
          </div>
          <div className="card-footer d-flex justify-content-end align-items-center">
            <button className="btn btn-primary" onClick={handleUpdatePengumumanUjian}> SIMPAN</button>
          </div>
        </div>
      </section>
    </LayoutAdmin>
  )
}

export const KelolaUjian = () => {
  const [viewNilai, setViewNilai] = useState([])
  const [viewDetailNilai, setViewDetailNilai]: any = useState({})
  const [selectedDate, setSelectedDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [payloadNilai, setPayloadNilai] = useState({
    siswa_id: '',
    nilai_rapot: 0,
    nilai_ujian: 0
  })

  const [viewSiswa, setViewSiswa] = useState([])

  useEffect(() => {
    axiosInstance
      .get(
        `/nilai?kode_pendaftaran=${searchValue.slice(1)}&page=${page}&limit=${limit}&filterDate=${selectedDate}`
      )
      .then((response) => {
        setViewNilai(response.data.data);
        setLimit(response.data.limits);
        setPage(response.data.pages);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        alert(error);
      });
  }, [searchValue, page, limit, selectedDate]);

  useEffect(() => {
    axiosInstance
      .get(`/siswa?status=lolos&page=${page}&limit=${limit}`)
      .then((response) => {
        const filteredSiswa = response.data.data.filter(
          (siswa: any) =>
            !viewNilai.some((nilai: any) => nilai.siswa_id.id === siswa.id)
        );
        setViewSiswa(filteredSiswa);
        setLimit(response.data.limits);
        setPage(response.data.pages);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        alert(error);
      });
  }, [viewNilai, page, limit]);

  const handleViewDetail = (id: string) => {
    axiosInstance.get(`/nilai/${id}`)
      .then((response) => {
        console.log(response.data)
        setViewDetailNilai(response.data.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const handleDelete = (id: string) => {
    axiosInstance.delete(`/nilai/${id}`)
      .then(() => {
        setViewNilai((prevNilai: any) => prevNilai.filter((nilai: any) => nilai.id !== id));
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const changeStatus = (id: string) => {
    axiosInstance.put(`/nilai/${id}`, viewDetailNilai)
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

  const handleSubmitNilai = () => {
    axiosInstance.post(`/nilai`, payloadNilai)
      .then(() => {
        setPayloadNilai({
          siswa_id: '',
          nilai_rapot: 0,
          nilai_ujian: 0
        })
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error add data:', error);
      });
  }

  const handleExportExcel = async () => {
    try {
      const response = await axiosInstance.get('nilai/generate-excel', { responseType: 'blob' });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'HASIL_SELEKSI.xlsx';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  };

  return (
    <LayoutAdmin>
      <section>
        <div className="card" style={{ width: "110%" }}>
          <div className="text-header p-3">
            <span style={{ fontWeight: "bold" }}>KELOLA NILAI UJIAN</span>
            <hr style={{ marginTop: "3px" }} />
            <DatePickers setSelectDate={setSelectedDate} />
          </div>
          <hr style={{ marginTop: "-1px" }} />
          <div className="header-2 d-flex justify-content-between">
            <div className="searching" >
              <label htmlFor="" className="me-2 ms-3" style={{ fontSize: "12px" }}>Filter :</label>
              <input type="text" style={{ padding: "4px", fontSize: "12px", height: "25px" }} placeholder="Cari kode pendaftaran" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} name="search" />
            </div>
            <div className="button-action d-flex">
              <button className="btn btn-success me-2 d-flex align-items-center" style={{ fontSize: "10px" }} onClick={handleExportExcel}>
                <i className="fa fa-solid fa-file-excel me-2"></i>
                <span>Export</span>
              </button>
              <button className="btn btn-primary me-4" style={{ fontSize: "10px" }} data-bs-toggle="modal" data-bs-target="#inputnilai">
                <i className="fa fa-solid fa-plus"></i>
                <span>Tambah</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "4%" }}>No</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", width: "10%" }}>No. Pendaftaran</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center" }}>Nama</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center" }}>NISN</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center" }}>Nilai rapot</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center" }}>Nilai Ujian</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center" }}>status</th>
                  <th style={{ fontWeight: "bold", fontSize: "11px", textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  viewNilai.map((val: any, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{index + 1}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.siswa_id?.kode_pendaftaran}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px" }}>{val.siswa_id?.nama_lengkap}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{val.siswa_id?.nisn}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{val.nilai_rapot}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>{val.nilai_ujian}</td>
                      <td style={{ fontWeight: "normal", fontSize: "11px", textAlign: "center" }}>
                        {val.status === 'menunggu' && (
                          <span className="d-flex justify-content-center bg-warning" style={{ padding: "7px", fontSize: "10px", borderRadius: "8px", color: "white", fontWeight: "bold" }}>Menunggu</span>
                        )}
                        {val.status === 'lolos' && (
                          <span className="d-flex justify-content-center bg-success" style={{ padding: "7px", fontSize: "10px", borderRadius: "8px", color: "white", fontWeight: "bold" }}>Lolos</span>
                        )}
                        {val.status === 'tidak lolos' && (
                          <span className="d-flex justify-content-center bg-danger" style={{ padding: "7px", fontSize: "10px", borderRadius: "8px", color: "white", fontWeight: "bold" }}>Tidak Lolos</span>
                        )}
                      </td>
                      <td style={{ fontWeight: "normal" }} className="d-flex gap-3 justify-content-center">
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} data-bs-toggle="modal" data-bs-target="#viewdetailnilai" className="btn btn-secondary">
                          <i className="fa fa-solid fa-eye"></i>
                        </button>
                        <button type="button" style={{ fontSize: "10px", fontWeight: "bold" }} onClick={() => handleViewDetail(val.id)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#viewdetailupdatenilai">
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
      <div className="modal" tabIndex={-1} id="inputnilai">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              Tambah Data
            </div>
            <div className="modal-body">
              <ul style={{ listStyle: "none" }}>
                <li className="d-flex my-2 align-items-center">
                  <div style={{ width: "40%" }}>Pilih Siswa</div>
                  <div>:</div>
                  <div className="col-4 ms-3">
                    <select
                      value={payloadNilai.siswa_id}
                      onChange={(e) => setPayloadNilai({ ...payloadNilai, siswa_id: e.target.value })}
                      className="form-select" aria-label="Default select example">
                      <option selected>Pilih Siswa</option>
                      {
                        viewSiswa.map((val: any, index) => (
                          <option key={index} value={val.id}>{val.nama_lengkap}</option>
                        ))
                      }
                    </select>
                  </div>
                </li>
                <li className="d-flex my-2 align-items-center">
                  <div style={{ width: "40%" }}>Nilai Rapot</div>
                  <div>:</div>
                  <div className="col-4 ms-3">
                    <input type="text" value={payloadNilai.nilai_rapot} onChange={(e) => setPayloadNilai({ ...payloadNilai, nilai_rapot: Number(e.target.value) })} className="form-control" />
                  </div>
                </li>
                <li className="d-flex my-2 align-items-center">
                  <div style={{ width: "40%" }}>Nilai Ujian</div>
                  <div>:</div>
                  <div className="col-4 ms-3">
                    <input type="text" value={payloadNilai.nilai_ujian} onChange={(e) => setPayloadNilai({ ...payloadNilai, nilai_ujian: Number(e.target.value) })} className="form-control" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitNilai} data-bs-dismiss="modal">Simpan</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" tabIndex={-1} id="viewdetailnilai">
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
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.kode_pendaftaran}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nama Lengkap</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.nama_lengkap}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NISN</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.nisn}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Rapot</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.nilai_rapot}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Ujian</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.nilai_ujian}</div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" tabIndex={-1} id="viewdetailupdatenilai">
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
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.kode_pendaftaran}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nama Lengkap</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.nama_lengkap}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>NISN</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.siswa_id?.nisn}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Rapot</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.nilai_rapot}</div>
                </li>
                <li className="d-flex my-2">
                  <div style={{ width: "40%" }}>Nilai Ujian</div>
                  <div>:</div>
                  <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDetailNilai.nilai_ujian}</div>
                </li>
              </ul>
              <p className="ms-3" style={{ fontSize: '12px', marginTop: '5%', fontWeight: 'bold' }}>Ubah status kelulusan :</p>
              <div className="changestatus d-flex gap-2 ms-3">
                <div className="col-4">
                  <select
                    value={viewDetailNilai.status}
                    onChange={(e) => setViewDetailNilai({ ...viewDetailNilai, status: e.target.value })}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="menunggu" disabled>Menunggu</option>
                    <option value="lolos">Lolos</option>
                    <option value="tidak lolos">Tidak Lolos</option>
                  </select>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2" style={{ fontSize: "12px" }} onClick={() => changeStatus(viewDetailNilai?.id)}>
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
    </LayoutAdmin>
  )
}


