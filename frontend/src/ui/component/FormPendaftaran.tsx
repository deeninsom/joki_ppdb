/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import FormDataAlamat from "../component/FormDataAlamat";
import FormDataSekolah from "../component/FormDataSekolah";
import FormDataSiswa from "../component/FormDataSiswa";
import FormDataWali from "../component/FormDataWali";
import FormKetentuan from "../component/FormKetentuan";
import FormKonfirmasi from "../component/FormKonfirmasi";
import axiosInstance from "../../service/_api";
import { useLogin } from "../../service/hooks/useLogin";

const FormPendaftaran = (props: any) => {
  const { numberCard, active, onNext, onPrev } = props;
  const [isAgreed, setIsAgreed] = useState(false);
  const { login, error, isLoading }: any = useLogin()


  const handleAgreeChange = (agreed: any) => {
    setIsAgreed(agreed);
  };

  let headerContent;
  let subHeaderContent;
  let endHeaderContent;
  let cardBodyContent;

  const [formData, setFormData] = useState({
    nama_lengkap: "",
    nisn: 0,
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    no_handphone: "",
    file_rapot: "",
    nilai_rapot: "",
    data_alamat: {
      alamat: "",
      desa: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      jarak_sekolah: ""
    },
    data_wali: {
      nama_wali: "",
      alamat: "",
      jenis_pekerjaan: "",
      no_handphone: ""
    },
    data_sekolah: {
      nama_sekolah: "",
      jenjang_sekolah: ""
    }
  });

  const saveToLocalStorage = (numberForm: number, payload: any) => {
    switch (numberForm) {
      case 1:
        localStorage.setItem("formDataSiswa", JSON.stringify(payload));
        break
      case 2:
        localStorage.setItem("formDataSiswa", JSON.stringify(payload));
        break
      case 3:
        localStorage.setItem("formDataSiswa", JSON.stringify(payload));
        break
      case 4:
        localStorage.setItem("formDataSiswa", JSON.stringify(payload));
        break
    }

    onNext()
  }

  useEffect(() => {
    const storedData = localStorage.getItem("formDataSiswa");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // console.log(parsedData)
      setFormData((prevData) => ({ ...prevData, ...parsedData }));
    }
  }, []);

  switch (numberCard) {
    case 0:
      headerContent = "KETENTUAN PPDB ONLINE";
      subHeaderContent = "SMP ISLAM WALISONGO";
      endHeaderContent = "TAHUN PELAJARAN 2023-2024"
      cardBodyContent = <FormKetentuan onAgreeChange={() => handleAgreeChange(!isAgreed)} />;
      break;
    case 1:
      headerContent = "FORM";
      subHeaderContent = "IDENTITAS DIRI CALON SISWA"
      cardBodyContent = <FormDataSiswa setFormData={setFormData} formData={formData} />;
      break;
    case 2:
      headerContent = "FORM";
      subHeaderContent = "ALAMAT CALON SISWA"
      cardBodyContent = <FormDataAlamat setFormData={setFormData} formData={formData} />;
      break;
    case 3:
      headerContent = "FORM";
      subHeaderContent = "ORANG TUA/WALI CALON SISWA"
      cardBodyContent = <FormDataWali setFormData={setFormData} formData={formData} />;
      break;
    case 4:
      headerContent = "FORM";
      subHeaderContent = "DATA SEKOLAH ASAL"
      cardBodyContent = <FormDataSekolah setFormData={setFormData} formData={formData} />;
      break;
    case 5:
      headerContent = "KONFIRMASI";
      subHeaderContent = "DATA CALON SISWA"
      cardBodyContent = <FormKonfirmasi onAgreeChange={() => handleAgreeChange(!isAgreed)} />;
      break;
    default:
      headerContent = "Default Header";
  }


  const handleSubmit = () => {
    const storedData = localStorage.getItem("formDataSiswa");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      axiosInstance.post('/siswa', {
        nama_lengkap: parsedData.nama_lengkap,
        nisn: parsedData.nisn,
        nik: parsedData.nik,
        tempat_lahir: parsedData.tempat_lahir,
        tanggal_lahir: parsedData.tanggal_lahir,
        jenis_kelamin: parsedData.jenis_kelamin,
        agama: parsedData.agama,
        no_handphone: parsedData.no_handphone,
        nilai_rapot: parsedData.nilai_rapot,
        data_alamat: parsedData.data_alamat,
        data_wali: parsedData.data_wali,
        data_sekolah: parsedData.data_sekolah
      })
        .then((response) => {
          login(response.data.data.nisn, response.data.data.nisn);
          localStorage.removeItem('formDataSiswa')
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }
  return (
    <section className={`card-form d-flex justify-content-center${active ? ' active' : ''}`} style={{ marginTop: "50px" }}>
      <div className="card" style={{ width: "60%" }}>
        <div className="card-header text-center" style={{ backgroundColor: "#004b49", color: "white" }}>
          <span style={{ fontSize: "30px" }}>{headerContent}</span>
          {subHeaderContent && (
            <>
              <br />
              <span style={{ fontSize: "25px", fontWeight: "bold" }}>{subHeaderContent}</span>
            </>
          )}
          {
            endHeaderContent && (
              <>
                <br />
                <span>{endHeaderContent}</span>
              </>
            )
          }
        </div>
        <div className="card-body">
          {cardBodyContent}
        </div>
        <div className="card-footer d-flex justify-content-between p-3">
          <button disabled={numberCard === 0} onClick={onPrev} className="btn btn-primary">Kembali</button>

          <button hidden={numberCard >= 5} disabled={numberCard === 0 ? !isAgreed : isAgreed} onClick={() => saveToLocalStorage(numberCard, formData)} className="btn btn-success">Selanjutnya</button>
          <button hidden={numberCard < 5} disabled={numberCard === 5 ? !isAgreed : isAgreed} onClick={numberCard === 5 ? handleSubmit : onNext} className="btn btn-success">{isLoading ? 'Sedang Mengirim' : "Daftar Sekarang"}</button>
        </div>
        <p style={{ color: 'red', fontSize: "10px", paddingTop: "20px", textAlign: "center" }}>{error}</p>
      </div>
    </section>
  )
}

export default FormPendaftaran