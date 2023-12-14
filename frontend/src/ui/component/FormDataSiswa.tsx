/* eslint-disable @typescript-eslint/no-explicit-any */

const FormDataSiswa = (props: any) => {
  const { setFormData, formData } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Membaca file menggunakan FileReader
      const reader = new FileReader();

      reader.onloadend = () => {
        // Mengonversi file menjadi string atau array buffer, sesuai kebutuhan Anda
        const fileContent = reader.result as string;

        // Memperbarui state formData dengan fileContent
        setFormData({ ...formData, file_rapot: fileContent });
      };

      // Baca file sebagai string, Anda dapat mengubah sesuai kebutuhan
      reader.readAsDataURL(file);
    }
  };

  return (
    <section>
      <form action="" style={{ padding: "20px" }}>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Nama Lengkap <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.nama_lengkap}
              onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">N.I.S.N <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.nisn}
              onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">N.I.K Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Tempat Lahir Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.tempat_lahir}
              onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Tanggal Lahir Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.tanggal_lahir}
              onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
              type="date" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Jenis Kelamin Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <select
              value={formData?.jenis_kelamin}
              onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}
              className="form-select" aria-label="Default select example">
              <option defaultValue={""}>-- Pilih --</option>
              <option value="Laki - Laki">Laki - Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">Agama Siswa <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.agama}
              onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
              type="text" className="form-control" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label">No. Handphone/WA <span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.no_handphone}
              onChange={(e) => setFormData({ ...formData, no_handphone: e.target.value })}
              type="text" className="form-control" />
          </div>
        </div>
        <div className="mb-3 row">
          <label style={{ textAlign: "end", }} className="col-sm-3 col-form-label" >Nilai Rata - rata ( rapot )<span style={{ color: "red" }}>*</span></label>
          <div className="col-sm-9 ">
            <input
              value={formData?.nilai_rapot}
              onChange={(e) => setFormData({ ...formData, nilai_rapot: e.target.value })}
              type="number" className="form-control" />
          </div>
        </div>
      </form>
    </section >
  )
}

export default FormDataSiswa