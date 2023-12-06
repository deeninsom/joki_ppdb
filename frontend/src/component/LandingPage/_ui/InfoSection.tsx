import shape1 from '../../../assets/telah-dibuka.png'

const InfoSection = () => {
  return (
    <section className="content-2 pb-4" id="info" style={{ backgroundColor: "#EEEEEE", color: "black" }}>
      <div className="d-flex justify-content-center">
        <div className="content-text  mb-3">
          <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>INFORMASI PPDB ONLINE</p>
          <hr className="mt-4" style={{ width: "60%", color: "black", marginLeft: "108px" }} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ height: "350px", width: "50%", padding: "20px", backgroundColor: "#527853", color: "white" }}>
          <span className="text-center my-3" style={{ fontSize: "30px", fontWeight: "bold" }}>PENERIMAAN PESERTA DIDIK BARU</span>
          <span className="text-center my-3" style={{backgroundImage: `url(${shape1})`, width: "100%"}}>
            Telah Dibuka !</span>
          <div className="card p-4">
            <span>
              Pendaftaran dibuka mulai 7 November 2022 – 7 Januari 2023. Segera daftarkan putra-putri anda sebelum kuota habis. Pendaftaran bisa dilakukan secara  registrasi online melalui official website kami
            </span></div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection