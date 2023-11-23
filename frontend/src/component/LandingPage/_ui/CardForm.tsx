/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import FormDataAlamat from "../FormComponent/FormDataAlamat";
import FormDataSekolah from "../FormComponent/FormDataSekolah";
import FormDataSiswa from "../FormComponent/FormDataSiswa";
import FormDataWali from "../FormComponent/FormDataWali";
import FormKetentuan from "../FormComponent/FormKetentuan";
import FormKonfirmasi from "../FormComponent/FormKonfirmasi";
import { useNavigate } from "react-router-dom";

const CardForm = (props: any) => {

  const { numberCard, active, onNext, onPrev } = props;
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate()
  

  const handleAgreeChange = (agreed: any) => {
    setIsAgreed(agreed);
  };

  let headerContent;
  let subHeaderContent;
  let endHeaderContent;
  let cardBodyContent;

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
      cardBodyContent = <FormDataSiswa />;
      break;
    case 2:
      headerContent = "FORM";
      subHeaderContent = "ALAMAT CALON SISWA"
      cardBodyContent = <FormDataAlamat />;
      break;
    case 3:
      headerContent = "FORM";
      subHeaderContent = "ORANG TUA/WALI CALON SISWA"
      cardBodyContent = <FormDataWali />;
      break;
    case 4:
      headerContent = "FORM";
      subHeaderContent = "DATA SEKOLAH ASAL"
      cardBodyContent = <FormDataSekolah />;
      break;
    case 5:
      headerContent = "KONFIRMASI";
      subHeaderContent = "DATA CALON SISWA"
      cardBodyContent = <FormKonfirmasi onAgreeChange={() => handleAgreeChange(!isAgreed)}/>;
      break;
    default:
      headerContent = "Default Header";
  }

  const handleSubmit = () =>{
    navigate("/panel_siswa/home")
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

          <button hidden={numberCard >= 5} disabled={numberCard === 0 ? !isAgreed : isAgreed} onClick={onNext} className="btn btn-success">Selanjutnya</button>
          <button hidden={numberCard < 5} disabled={numberCard === 5 ? !isAgreed : isAgreed} onClick={numberCard === 5 ? handleSubmit: onNext} className="btn btn-success">Daftar Sekarang</button>
        </div>
      </div>
    </section>
  )
}

export default CardForm