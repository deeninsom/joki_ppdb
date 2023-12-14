/* eslint-disable @typescript-eslint/no-explicit-any */

const FormDataWali = (props: any) => {
  const { formData, setFormData } = props
  const { nama_wali, alamat, jenis_pekerjaan, no_handphone } = formData.data_wali || {};

  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", marginLeft: "-65px" }} className="col-sm-4 col-form-label">Nama Orang Tua / Wali <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={nama_wali}
              onChange={(e) => setFormData({
                ...formData,
                data_wali: {
                  ...formData.data_wali,
                  nama_wali: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Alamat <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={alamat}
              onChange={(e) => setFormData({
                ...formData,
                data_wali: {
                  ...formData.data_wali,
                  alamat: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jenis Pekerjaan <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select
              value={jenis_pekerjaan}
              onChange={(e) => setFormData({
                ...formData,
                data_wali: {
                  ...formData.data_wali,
                  jenis_pekerjaan: e.target.value,
                },
              })}
              className="form-select" aria-label="Default select example">
              <option selected>-- Pilih jenis pekerjaan --</option>
              <option value="Wiraswasta">Wiraswasta</option>
              <option value="Pegawai Negri">Pegawai Negri</option>
              <option value="Wirausaha">Wirausaha</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">No. Handphone/WA</label>
          <div className="col-sm-9 ">
            <input
              value={no_handphone}
              onChange={(e) => setFormData({
                ...formData,
                data_wali: {
                  ...formData.data_wali,
                  no_handphone: e.target.value,
                },
              })}
              type="text" className="form-control" />
          </div>
        </div>
      </form>
    </section >
  )
}

export default FormDataWali