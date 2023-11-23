import alur from "../../../assets/ALUR.png"


const AlurSection = () => {
  return (
    <section className="content-1" id="alur" style={{ height: "620px", backgroundColor: "#004b49", color: "white" }}>
      <div className="inline-content d-flex justify-content-center align-items-center">
        <div className="content-text text-center">
          <p className="my-3" style={{ fontSize: "40px", fontFamily: "monospace" }}>ALUR PPDB ONLINE</p>
          <hr className="mt-2" style={{ width: "60%", color: "white", marginLeft: "80px" }} />
        </div>
      </div>
      <div className="content-body d-flex justify-content-center mt-4">
        <img src={alur} height={400} alt="" />
      </div>
    </section>
  )
}

export default AlurSection