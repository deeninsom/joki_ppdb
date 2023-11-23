import alur from "../../../assets/BG.png"



const SyaratSection = () => {
  return (
    <section className="content-3" id="syarat" style={{ height: "650px", backgroundColor: "#004b49", color: "white" }}>
      <div className="inline-content d-flex justify-content-center align-items-center">
        <div className="content-text text-center">
          <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>SYARAT PENDAFTARAN</p>
          <hr className="mt-2" style={{ width: "60%", color: "white", marginLeft: "90px" }} />
        </div>
      </div>
      <div className="content-body d-flex justify-content-center mt-4">
        <img src={alur} height={450} style={{ width: "80%" }} alt="" />
        <div className="list-syarat" style={{ position: "absolute", marginRight: "11%", marginTop: "110px" }}>
          <ul style={{ listStyle: "none", fontWeight: "bold" }}>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Mengisi Formulir Pendaftaran</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Berusia Maksimal 12 tahun pada 1 juli 2023</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Menyerahkan Foto Hitam Putih Ukuruan 3x4 Sebanyak 12 Lembar</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Ijazah Asli SD/MI + Foto Copy 1 Lembar</li>
            <li className="my-2 text-black"><i className="fa fa-solid fa-clipboard-list me-2" style={{ color: "green" }}></i> Foto Copy Kartu Keluarga (KK) 3 Lembar</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SyaratSection