/* eslint-disable @typescript-eslint/no-explicit-any */

const FormDataAlamat = (props: any) => {
  const { setFormData, formData } = props;
  const { alamat, desa, kecamatan, kabupaten, provinsi, jarak_sekolah } = formData.data_alamat || {};

  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Alamat <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={alamat}
              onChange={(e) => setFormData({
                ...formData,
                data_alamat: {
                  ...formData.data_alamat,
                  alamat: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Desa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={desa}
              onChange={(e) => setFormData({
                ...formData,
                data_alamat: {
                  ...formData.data_alamat,
                  desa: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Kecamatan <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={kecamatan}
              onChange={(e) => setFormData({
                ...formData,
                data_alamat: {
                  ...formData.data_alamat,
                  kecamatan: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Kabupaten <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={kabupaten}
              onChange={(e) => setFormData({
                ...formData,
                data_alamat: {
                  ...formData.data_alamat,
                  kabupaten: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Provinsi <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={provinsi}
              onChange={(e) => setFormData({
                ...formData,
                data_alamat: {
                  ...formData.data_alamat,
                  provinsi: e.target.value,
                },
              })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jarak ke sekolah <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select
              value={jarak_sekolah}
              onChange={(e) => setFormData({
                ...formData,
                data_alamat: {
                  ...formData.data_alamat,
                  jarak_sekolah: e.target.value,
                },
              })}
              className="form-select" aria-label="Default select example">
              <option defaultValue={""}>-- Pilih jarak siswa ke sekolah--</option>
              <option value="Kurang dari 5 km">Kurang dari 5 km</option>
              <option value="5 - 10 km">5 - 10 km</option>
              <option value="11 - 20 km">11 - 20 km</option>
              <option value="21 - 30 km">21 - 30 km</option>
              <option value="Lebih dari 30 km">Lebih dari 30 km</option>
            </select>
          </div>
        </div>
      </form>
      {/* {
          formData.data_alamat.map((val: any, index: any) => (
            <>
            </>
          ))
        } */}
    </section >
  )
}

export default FormDataAlamat