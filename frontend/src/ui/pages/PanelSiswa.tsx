/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom"
import { LayoutSiswa } from "../component/LayoutSiswa"
import logo from "../../assets/SMP-removebg-preview.jpg"
import { useEffect, useState } from "react"
import axiosInstance from "../../service/_api"
import moment from "moment"

const formatDate = (val: any) => {
  const parsedDate = moment(val);
  return parsedDate.format('YYYY-MM-DD HH:mm');
}

export const Dashboard = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const navigatePage = () => {
    navigate(`/siswa-panel/biodata/${id}`)
  }

  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO PENGUMUMAN</span>
          </div>
          <div className="card-body p-4">
            <span>Belum ada pengumuman  dari Panitia PPDB Online SMP ISLAM WALISONGO</span>
          </div>
        </div>
        <div className="list-card d-flex mt-4 gap-4">
          <div className="col-sm-5 p-4 text-center" onClick={navigatePage} style={{ backgroundColor: "#9ADE7B", color: "white", cursor: "pointer" }}>
            <i className="fa-solid fa-file-circle-check" style={{ fontSize: "80px" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>BIODATA</span>
          </div>
          <div className="col-sm-5 p-4 text-center" style={{ backgroundColor: "#29ADB2", color: "white", cursor: "pointer" }}>
            <i className="fa-solid fa-print" style={{ marginTop: "2px", fontSize: "70px" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>PRINT HASIL SELEKSI</span>
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}

export const Biodata = () => {

  const { id } = useParams()
  const [user, setUser]: any = useState({})
  const [input, setInput] = useState(false)
  const [notif, setNotif] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/siswa?user_id=${id}&&page=1&&limit=1`);
        response.data.data.map((val: any) => {
          setUser(val)
          if (val.file_rapot === null) {
            setNotif(true)
          }
        })
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    fetchUserData();
  }, [id]);

  const changeBiodata = async () => {
    try {
      await axiosInstance.put(`/siswa/${user.id}`, user);
      setInput(false)
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  const handleInputChange = (section: string, fieldName: string, value: any) => {
    if (fieldName !== '') {
      setUser((prevUser: any) => ({
        ...prevUser,
        [section]: {
          ...prevUser[section],
          [fieldName]: value,
        },
      }));
    } else {
      setUser((prevUser: any) => ({ ...prevUser, [section]: value }));
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axiosInstance
        .post("/upload", formData)
        .then((response) => {
          user.file_rapot = response.data.data.url
          axiosInstance.put(`/siswa/${user.id}`, user)
            .then((response) => {
              setUser((prevUser: any) => ({
                ...prevUser, ...response
              }));
              window.location.reload();
            })
            .catch((error) => {
              alert(`Error upload rapot file: ${error}`)
            });
        })
        .catch((error) => {
          alert(`Error uploading file: ${error}`)
        });
    }
  };

  const viewPdf = () => {
    window.open(user.file_rapot)
  }

  return (
    <LayoutSiswa>
      <section>
        <div className="body" style={{ width: "100%" }}>
          <div className="list-card d-flex gap-3">
            <div className="col-sm-9">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}><i className="fa fa-solid fa-user me-2"></i>BIODATA SISWA</span>
                </div>
                <div className="card-body p-3">
                  <table className="table table-bordered">
                    <tbody >
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Pendaftaran</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled value={user.kode_pendaftaran} style={{fontWeight: 'bold', border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Nama Lengkap</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input disabled={!input} type="text" onChange={(e) => handleInputChange('nama_lengkap', '', e.target.value)} value={user.nama_lengkap} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>N.I.S.N</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('nisn', '', e.target.value)} value={user.nisn} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>N.I.K</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('nik', '', e.target.value)} value={user.nik} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Tempat Lahir</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('tempat_lahir', '', e.target.value)} value={user.tempat_lahir} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Tanggal Lahir</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('tanggal_lahir', '', e.target.value)} value={user.tanggal_lahir} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jenis Kelamin</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('jenis_kelamin', '', e.target.value)} value={user.jenis_kelamin} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Agama</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('agama', '', e.target.value)} value={user.agama} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Handphone/WA</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('no_handphone', '', e.target.value)} value={user.no_handphone} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>File Rapot</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          {
                            notif ?
                              (
                                <div className="d-flex gap-2">
                                  <input onChange={handleFileChange} className="form-control form-control-sm" id="formFileSm" type="file" />
                                  <button className="btn btn-primary" onClick={handleUpload} style={{ fontSize: "10px" }}>Upload</button>
                                </div>
                              ) :
                              (
                                <>
                                  {
                                    input ? (
                                      <div className="d-flex gap-2">
                                        <input onChange={handleFileChange} className="form-control form-control-sm" id="formFileSm" type="file" />
                                        <button className="btn btn-primary" onClick={handleUpload} style={{ fontSize: "10px" }}>Upload</button>
                                      </div>
                                    ) : (
                                      <i className="fa fa-solid fa-file-pdf" onClick={viewPdf} style={{ color: "red", fontSize: "20px", cursor: "pointer" }}></i>
                                    )
                                  }
                                </>
                              )
                          }
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Nilai rata - rata</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('nilai_rapot', '', e.target.value)} value={user.nilai_rapot} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
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
                  <span style={{ fontSize: "12px", display: "block" }}>{formatDate(user.created_at)}</span>
                </div>
                <hr />
                <span style={{fontSize: "12px", fontWeight: "bold" }}>No. Pendaftaran : <span style={{ fontSize: "12px", fontWeight: "bold", color: 'GrayText', display: "block" }}>{user.kode_pendaftaran}</span></span>
                <hr />
                <span style={{fontSize: "12px", fontWeight: "bold" }}>Status Pendaftaran : <span style={{ fontSize: "12px", fontWeight: "bold", color: 'GrayText', display: "block" }}>{user.status == 0 ? 'Belum Disetujui' : 'Disetujui'}</span></span>
              </div>
              {
                !input ? (
                  <>
                    <span className="mt-3 ms-2" style={{ display: 'block', fontSize: "12px" }}>Klik untuk edit: </span>
                    <i className="fa fa-regular fa-pen-to-square" style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => setInput(true)}></i>
                  </>
                ) : (
                  <>
                    <span className="mt-3 ms-2" style={{ display: 'block', fontSize: "12px" }}>Klik untuk simpan: </span>
                    <button className="btn btn-primary mt-1" style={{ fontSize: "10px", marginLeft: "8px" }} onClick={changeBiodata}>save</button>
                    <button className="btn btn-secondary mt-1" style={{ fontSize: "10px", marginLeft: "8px" }} onClick={() => setInput(false)}>Batal</button>
                  </>
                )
              }
              {
                notif ? (
                  <div className="alert alert-warning mt-3" style={{ fontSize: "10px" }} role="alert">
                    <i className="fa fa-solid fa-circle-exclamation me-1"></i>Anda belum melakukan upload file rapot, silahkan perbarui data anda !
                  </div>
                ) : (
                  ''
                )
              }
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
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'alamat', e.target.value)} value={user.data_alamat?.alamat} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Desa</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'desa', e.target.value)} value={user.data_alamat?.desa} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kecamatan</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'kecamatan', e.target.value)} value={user.data_alamat?.kecamatan} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kabupaten</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'kabupaten', e.target.value)} value={user.data_alamat?.kabupaten} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Provinsi</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'provinsi', e.target.value)} value={user.data_alamat?.provinsi} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jarak ke sekolah</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'jarak_sekolah', e.target.value)} value={user.data_alamat?.jarak_sekolah} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
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
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'nama_wali', e.target.value)} value={user.data_wali?.nama_wali} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Alamat</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'alamat', e.target.value)} value={user.data_wali?.alamat} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jenis Pekerjaan</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'jenis_pekerjaan', e.target.value)} value={user.data_wali?.jenis_pekerjaan} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Handphone/WA</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'no_handphone', e.target.value)} value={user.data_wali?.no_handphone} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
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
                      <td className="p-3">
                        <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_sekolah', 'nama_sekolah', e.target.value)} value={user.data_sekolah?.nama_sekolah} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                      </td>
                    </tr>
                    <tr style={{ fontSize: "12px" }}>
                      <td className="p-3" style={{ width: "10%" }}>Jenjang Sekolah </td>
                      <td className="p-3 " style={{ width: "2%" }}>:</td>
                      <td className="p-3">
                        <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_sekolah', 'jenjang_sekolah', e.target.value)} value={user.data_sekolah?.jenjang_sekolah} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}

export const Pengumuman = () => {
  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO PENGUMUMAN</span>
          </div>
          <div className="card-body p-4">
            <span>Belum ada pengumuman dari Panitia PPDB Online SMP ISLAM WALISONGO</span>
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}

export const PengumumanUjian = () => {
  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO UJIAN</span>
          </div>
          <div className="card-body p-4">
            <span>Belum ada pengumuman dari Panitia PPDB Online SMP ISLAM WALISONGO</span>
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}

export const PrintSeleksi = () => {
  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>Hasil Seleksi</span>
          </div>
          <div className="card-body p-4">
            <button className="btn btn-primary" style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }}><i className="fa-solid fa-print me-3"></i>Print Hasil Seleksi!</button>
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}
