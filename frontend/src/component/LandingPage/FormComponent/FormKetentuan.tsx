/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ketentuan from "../../../assets/BG.png"


const FormKetentuan = (props: any) => {

  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = () => {
    const updatedAgreed = !isAgreed;
    setIsAgreed(updatedAgreed);
    props.onAgreeChange(updatedAgreed);
  };

  return (
    <section>
      <div className="content-body d-flex justify-content-center mt-4">
        <img src={ketentuan} height={350} style={{ width: "80%" }} alt="" />
        <div className="list-syarat" style={{ position: "absolute", marginRight: "1%", marginTop: "110px" }}>
          <ul style={{ listStyle: "none", fontWeight: "bold", fontSize: "13px" }}>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Mengisi Formulir Pendaftaran</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Berusia Maksimal 12 tahun pada 1 juli 2023</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Menyerahkan Foto Hitam Putih Ukuruan 3x4 Sebanyak 12 Lembar</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Ijazah Asli SD/MI + Foto Copy 1 Lembar</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Foto Copy Kartu Keluarga (KK) 3 Lembar</li>
          </ul>
        </div>
      </div>
      <div className="question mt-3">
        <span style={{ fontFamily: "serif", color: "black", fontWeight: "bold", fontSize: "15px" }}>Apakah anda setuju dengan ketentuan PPDB Online diatas ?</span>
        <div className="form-check mt-2" style={{ marginLeft: "10px" }}>
          <input
            onChange={handleAgreeChange}
            checked={isAgreed}
            className="form-check-input" style={{ cursor: "pointer" }} type="radio" value="" id="flexCheckIndeterminate" />
          <label style={{ fontFamily: "serif", fontSize: '15px' }} className="form-check-label" htmlFor="flexCheckIndeterminate">
            Ya, saya menyetujui ketentuan PPDB Online!
          </label>
        </div>
      </div>
    </section>
  )
}

export default FormKetentuan