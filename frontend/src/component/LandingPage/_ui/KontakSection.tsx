
const KontakSection = () => {
  return (
    <section className="content-4" id="kontak" style={{ height: "300px", backgroundColor: "#004b49", color: "white" }}>
      <div className="inline-content d-flex justify-content-center align-items-center">
        <div className="content-text text-center">
          <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>KONTAK KAMI</p>
          <hr className="mt-4" style={{ width: "100%", color: "white" }} />
          <p style={{ fontSize: "15px", textAlign: "center", fontFamily: "monospace", paddingTop: "50px" }}>
            PPDB ONLINE &copy; SMP ISLAM WALISONGO<br />
            <span>Ds. Teben Kemuning, Kamoning, Sampang</span>
          </p>
          <div style={{ fontSize: "15px", textAlign: "center", fontFamily: "monospace" }}>
            <span style={{ display: "block" }}><i className="fa fa-solid fa-phone me-2"></i>08xxx-xxx-xxx</span>
            <span><i className="fa fa-solid fa-envelope me-2"></i>xx@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KontakSection