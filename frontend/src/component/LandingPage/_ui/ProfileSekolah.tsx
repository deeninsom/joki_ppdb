
const ProfileSekolah = () => {
  return (
    <section className="content-2" id="profile" style={{ height: "500px", backgroundColor: "#EEEEEE", color: "black" }}>
      <div className="inline-content d-flex justify-content-center align-items-center">
        <div className="body">
          <div className="content-text text-center">
            <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>PROFILE SEKOLAH</p>
            <hr className="mt-4" style={{ width: "20%", color: "black", marginLeft: "40%" }} />
          </div>
          <div className="content-body">
            <div className="row justify-content-center">
              <div className="col-4">
              <span className="d-block text-center my-3" style={{textAlign: "justify", fontWeight: "bold"}}>VISI MISI</span> Visi Sekolah adalah imajinasi moral yang dijadikan dasar atau rujukan dalam menentukan tujuan atau keadaan masa depan sekolah yang secara khusus diharapkan oleh Sekolah. Visi Sekolah merupakan turunan dari Visi Pendidikan Nasional, yang dijadikan dasar atau rujukan untuk merumuskan Misi, Tujuan sasaran untuk pengembangan sekolah dimasa depan yang diimpikan dan terus terjaga kelangsungan hidup dan perkembangannya.
              </div>
              <div className="col-4">
              <span className="d-block text-center my-3" style={{fontWeight: "bold"}}>SLOGAN</span> “BERPRESTASI DALAM ILMU PENGETAHUAN YANG BERLANDASKAN IMAN DAN TAQWA SERTA BERBUDI PEKERTI LUHUR”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSekolah