
const FormDataSekolah = () => {
  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end" }} className="col-sm-3 col-form-label">Nama Sekolah <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jenjang Sekolah <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select className="form-select" aria-label="Default select example">
              <option selected>-- Pilih jenjang sekolah --</option>
              <option value="1">SDN</option>
              <option value="2">MI</option>
            </select>
          </div>
        </div>
        {/* <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">N.P.S.N <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input type="text" className="form-control" required />
          </div>
        </div> */}
      </form>
    </section >
  )
}

export default FormDataSekolah