
const FormDataAlamat = () => {
  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Alamat <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Desa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Kecamatan <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Kabupaten <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Provinsi <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jarak ke sekolah <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select className="form-select" aria-label="Default select example">
              <option selected>-- Pilih jarak siswa ke sekolah--</option>
              <option value="1">Kurang dari 5 km</option>
              <option value="2">5 - 10 km</option>
              <option value="2">11 - 20 km</option>
              <option value="2">21 - 30 km</option>
              <option value="2">Lebih dari 30 km</option>
            </select>
          </div>
        </div>
      </form>
    </section >
  )
}

export default FormDataAlamat