
const FormDataWali = () => {
  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", marginLeft: "-65px" }} className="col-sm-4 col-form-label">Nama Orang Tua / Wali <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Alamat <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jenis Pekerjaan <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select className="form-select" aria-label="Default select example">
              <option selected>-- Pilih jenis pekerjaan --</option>
              <option value="1">Wiraswasta</option>
              <option value="2">Pegawai Negri</option>
              <option value="2">Wirausaha</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">No. Handphone/WA</label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" />
          </div>
        </div>
      </form>
    </section >
  )
}

export default FormDataWali