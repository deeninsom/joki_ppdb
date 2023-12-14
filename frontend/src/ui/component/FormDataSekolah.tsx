/* eslint-disable @typescript-eslint/no-explicit-any */

const FormDataSekolah = (props: any) => {
  const { setFormData, formData } = props;
  const { nama_sekolah, jenjang_sekolah } = formData.data_sekolah || {};

  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end" }} className="col-sm-3 col-form-label">Nama Sekolah <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={nama_sekolah}
              onChange={(e) => setFormData({
                ...formData,
                data_sekolah: {
                  ...formData.data_sekolah,
                  nama_sekolah: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jenjang Sekolah <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select
              value={jenjang_sekolah}
              onChange={(e) => setFormData({
                ...formData,
                data_sekolah: {
                  ...formData.data_sekolah,
                  jenjang_sekolah: e.target.value,
                },
              })}
              className="form-select" aria-label="Default select example">
              <option selected>-- Pilih jenjang sekolah --</option>
              <option value="SDN">SDN</option>
              <option value="MI">MI</option>
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