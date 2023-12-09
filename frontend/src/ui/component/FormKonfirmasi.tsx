/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const FormKonfirmasi = (props: any) => {

  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = () => {
    const updatedAgreed = !isAgreed;
    setIsAgreed(updatedAgreed);
    props.onAgreeChange(updatedAgreed);
  };

  return (
    <section>
      <div className="content-body mt-4">
        <span className="d-block">Proses pendaftaran PPDB Online SMP ISLAM WALISONGO hampir selesai.</span>
        <span className="d-block">Silahkan periksa kembali data - data yang sudah anda masukan.</span>
      </div>
      <div className="question mt-5">
        <span style={{ fontFamily: "serif", color: "black", fontWeight: "bold", fontSize: "15px" }}>Apakah data calon siswa sudah selesai ?</span>
        <div className="form-check mt-2" style={{ marginLeft: "10px" }}>
          <input
            onChange={handleAgreeChange}
            checked={isAgreed}
            className="form-check-input" style={{ cursor: "pointer" }} type="radio" value="" id="flexCheckIndeterminate" />
          <label style={{ fontFamily: "serif", fontSize: '15px' }} className="form-check-label" htmlFor="flexCheckIndeterminate">
            Ya, sudah sesuai!
          </label>
        </div>
      </div>
    </section>
  )
}

export default FormKonfirmasi