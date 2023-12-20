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

  const navigatePage = (page: string) => {
    navigate(page)
  }

  return (
    <LayoutSiswa>
      <section>
        <div className="list-card d-flex gap-4" style={{ marginTop: "10%", marginLeft: "10%" }}>
          <div className="col-sm-5 p-4 text-center"
            onClick={() => navigatePage(`/siswa-panel/biodata/${id}`)}
            style={{ backgroundColor: "#9ADE7B", color: "white", cursor: "pointer" }}>
            <i className="fa-solid fa-file-circle-check" style={{ fontSize: "80px" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>BIODATA</span>
          </div>
          <div className="col-sm-5 p-4 text-center"
            onClick={() => navigatePage(`/siswa-panel/print-seleksi/${id}`)}
            style={{ backgroundColor: "#29ADB2", color: "white", cursor: "pointer" }}>
            <i className="fa-solid fa-print" style={{ marginTop: "2px", fontSize: "70px" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>PRINT HASIL SELEKSI</span>
          </div>
        </div>
        <div className="list-card d-flex gap-4 mt-4 " style={{ marginLeft: "10%" }}>
          <div className="col-sm-5 p-4 text-center bg-danger"
            onClick={() => navigatePage(`/siswa-panel/pengumuman/${id}`)}
            style={{ color: "white", cursor: "pointer" }}>
            <i className="fa-solid fa-volume-high" style={{ fontSize: "80px" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>PENGUMUMAN</span>
          </div>
          <div className="col-sm-5 p-4 text-center bg-warning"
            onClick={() => navigatePage(`/siswa-panel/pengumuman-ujian/${id}`)}
            style={{ color: "white", cursor: "pointer" }}>
            <i className="fa-solid fa-volume-high" style={{ marginTop: "2px", fontSize: "70px" }}></i>
            <span style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "20px", display: "block" }}>UJIAN</span>
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
        setUser(response.data.data[0])
        console.log(response.data.data[0].data_sekolah[0].nama_sekolah)
        if (response.data.data[0].file_rapot === null || response.data.data[0].file_rapot === undefined) {
          setNotif(true)
        }
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
        [section]: [
          {
            ...prevUser[section][0],
            [fieldName]: value,
          },
        ],
      }));
    } else {
      setUser((prevUser: any) => ({ ...prevUser, [section]: [{ ...prevUser[section][0], [fieldName]: value }] }));
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
                          <input type="text" disabled value={user.kode_pendaftaran} style={{ fontWeight: 'bold', border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
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
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>No. Pendaftaran : <span style={{ fontSize: "12px", fontWeight: "bold", color: 'GrayText', display: "block" }}>{user.kode_pendaftaran}</span></span>
                <hr />
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>Status Pendaftaran : <span style={{ fontSize: "12px", fontWeight: "bold", color: 'GrayText', display: "block" }}>{user.status === 'lolos' ? 'Belum Disetujui' : 'Disetujui'}</span></span>
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
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'alamat', e.target.value)} 
                          value={user.data_alamat && user.data_alamat.length > 0 ? user.data_alamat[0].alamat : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Desa</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'desa', e.target.value)} 
                          value={user.data_alamat && user.data_alamat.length > 0 ? user.data_alamat[0].desa : ''}style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kecamatan</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'kecamatan', e.target.value)} 
                          value={user.data_alamat && user.data_alamat.length > 0 ? user.data_alamat[0].kecamatan : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Kabupaten</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'kabupaten', e.target.value)} 
                          value={user.data_alamat && user.data_alamat.length > 0 ? user.data_alamat[0].kabupaten : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Provinsi</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'provinsi', e.target.value)} 
                          value={user.data_alamat && user.data_alamat.length > 0 ? user.data_alamat[0].provinsi : ''}style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jarak ke sekolah</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_alamat', 'jarak_sekolah', e.target.value)} 
                          value={user.data_alamat && user.data_alamat.length > 0 ? user.data_alamat[0].jarak_sekolah : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
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
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'nama_wali', e.target.value)}                      
                          value={user.data_wali && user.data_wali.length > 0 ? user.data_wali[0].nama_wali : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Alamat</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'alamat', e.target.value)}
                          value={user.data_wali && user.data_wali.length > 0 ? user.data_wali[0].alamat : ''}  style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>Jenis Pekerjaan</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'jenis_pekerjaan', e.target.value)} value={user.data_wali && user.data_wali.length > 0 ? user.data_wali[0].jenis_pekerjaan : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                        </td>
                      </tr>
                      <tr style={{ fontSize: "12px" }}>
                        <td className="p-3" style={{ width: "10%" }}>No. Handphone/WA</td>
                        <td className="p-3 " style={{ width: "2%" }}>:</td>
                        <td className="p-3">
                          <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_wali', 'no_handphone', e.target.value)} value={user.data_wali && user.data_wali.length > 0 ? user.data_wali[0].no_handphone : ''}style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
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
                        <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_sekolah', 'nama_sekolah', e.target.value)} value={user.data_sekolah && user.data_sekolah.length > 0 ? user.data_sekolah[0].nama_sekolah : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
                      </td>
                    </tr>
                    <tr style={{ fontSize: "12px" }}>
                      <td className="p-3" style={{ width: "10%" }}>Jenjang Sekolah </td>
                      <td className="p-3 " style={{ width: "2%" }}>:</td>
                      <td className="p-3">
                        <input type="text" disabled={!input} onChange={(e) => handleInputChange('data_sekolah', 'jenjang_sekolah', e.target.value)} value={user.data_sekolah && user.data_sekolah.length > 0 ? user.data_sekolah[0].jenjang_sekolah : ''} style={{ border: "none", marginRight: "2px", height: "30px", backgroundColor: "white" }} />
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
  const navigate = useNavigate()
  const { id } = useParams()
  const navigatePage = (page: string) => {
    navigate(page)
  }


  const [nilai, setNilai]: any = useState({})
  const [siswa, setSiswa]: any = useState({})

  useEffect(() => {

    const fetchData = async () => {
      const response: any = await axiosInstance.get(`/siswa?user_id=${id}&&page=1&&limit=1`);
      const siswaData = response.data.data[0]
      setSiswa(siswaData)

      const nilaiResponse: any = await axiosInstance.get(`/nilai?siswa_id=${siswaData.id}&&page=1&&limit=1`);
      const nilaiData = nilaiResponse.data.data[0];
      setNilai(nilaiData)
    }

    fetchData()
  }, [id]);

  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO PENGUMUMAN</span>
          </div>
          <div className="card-body p-4">
            {
              !nilai && (
                <span>Belum ada pengumuman dari panitia PPDB ONLINE SMP ISLAM WALISONGO</span>
              )
            }
            {
              nilai && nilai.status === 'menunggu' && (
                <span>Belum ada pengumuman dari panitia PPDB ONLINE SMP ISLAM WALISONGO</span>
              )
            }
            {
              nilai && nilai.status === 'tidak lolos' && (
                <div className="p-4" style={{ textAlign: 'center', fontSize: "20px" }}>
                  <p>Mohon maaf
                    <span className="ms-1" style={{ fontWeight: "bold", textTransform: 'uppercase' }}>{siswa.nama_lengkap}
                    </span>
                    <span className="bg-danger ms-1 p-1" style={{ fontWeight: 'bold', color: "white", borderRadius: "5px" }} >Tidak LULUS
                    </span>
                    <span className="ms-1">
                      Seleksi sebagai calon peserta didik baru <span style={{ fontWeight: "bold" }}>MTS WALI SONGO,</span> Anda bisa mengikuti tahun berikutnya.
                    </span>
                  </p>
                </div>
              )
            }
            {
              nilai && nilai.status === 'lolos' && (
                <div className="p-4" style={{ textAlign: 'center', fontSize: "20px" }}>
                  <p>Selamat
                    <span className="ms-1" style={{ fontWeight: "bold", textTransform: 'uppercase' }}>{siswa.nama_lengkap}
                    </span>
                    <span className="bg-success ms-1 p-1" style={{ fontWeight: 'bold', color: "white", borderRadius: "5px" }} >LULUS
                    </span>
                    <span className="ms-1">
                      Seleksi sebagai calon peserta didik baru <span style={{ fontWeight: "bold" }}>MTS WALI SONGO,</span> Silahkan cetak surat pengumuman sebagai bukti lulus seleksi.
                    </span>
                  </p>
                  <hr />
                  <div>
                    <button onClick={() => navigatePage(`/siswa-panel/print-seleksi/${id}`)} className="btn btn-success">Cetak Bukti Lulus
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}

export const PengumumanUjian = () => {
  const [pengumumanUjian, setPengumumanUjian]: any = useState({})
  useEffect(() => {
    axiosInstance.get('/websites/1')
      .then((response) => {
        setPengumumanUjian(response.data.data)
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  }, [])


  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO UJIAN</span>
          </div>
          <div className="card-body p-4">
            <span>{pengumumanUjian.pengumuman_ujian}</span>
          </div>
        </div>
      </section>
    </LayoutSiswa>
  )
}

export const PrintSeleksi = () => {

  const { id } = useParams()
  const [nilai, setNilai]: any = useState({})

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/siswa?user_id=${id}&&page=1&&limit=1`);
        response.data.data.forEach((val: any) => {
          axiosInstance.get(`/nilai?siswa_id=${val.id}&page=1&&limit=1`)
            .then((response) => {
              response.data.data.forEach((val: any) => {
                setNilai(val);
              });
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        });
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    fetchUserData();
  }, [id]);

  const handlePrint = async (id: string) => {
    const response = await axiosInstance.get(`/siswa?user_id=${id}&&page=1&&limit=1`);

    const pdfResponse = await axiosInstance.get(`/nilai/generate-pdf/${response.data.data[0].id}`, {
      responseType: 'blob', // Specify the response type as 'blob' to handle binary data
    });

    const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HASIL SELEKSI.pdf';

    // Append the anchor to the document and trigger a click event
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }

  return (
    <LayoutSiswa>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>Hasil Seleksi</span>
          </div>
          <div className="card-body p-4" >
            {
              nilai && nilai.status !== 'lolos' ? (
                <button disabled className="btn btn-secondary" style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }}><i className="fa-solid fa-print me-3"></i>Print Hasil Seleksi!</button>
              ) : (
                <>
                  <button className="btn btn-primary" style={{ width: "250px", fontSize: "13px", fontWeight: "bold" }} onClick={() => handlePrint(`${id}`)}><i className="fa-solid fa-print me-3"></i>Print Hasil Seleksi!</button>
                </>
              )
            }
          </div>
        </div>
      </section>

    </LayoutSiswa>
  )
}
