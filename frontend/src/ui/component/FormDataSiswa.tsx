
const FormDataSiswa = () => {
  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Nama Lengkap <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">N.I.S.N <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">N.I.K Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Tempat Lahir Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Tanggal Lahir Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="date" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jenis Kelamin Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select className="form-select" aria-label="Default select example">
              <option selected>-- Pilih --</option>
              <option value="1">Laki - Laki</option>
              <option value="2">Perempuan</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Agama Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">No. Handphone/WA</label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} htmlFor="formFileSm" className="col-sm-3 col-form-label">Upload Raport</label>
          <div className="col-sm-9 ">
            <input className="form-control form-control-sm" id="formFileSm" type="file" />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Nilai Rata - rata</label>
          <div className="col-sm-9 ">
            <input type="number" className="form-control" />
          </div>
        </div>
      </form>
    </section >
  )
}

export default FormDataSiswa