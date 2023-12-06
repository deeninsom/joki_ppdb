import logo from "../assets/SMP-removebg-preview.jpg"

const Auth = () => {
  return (
    <>
      <section style={{ padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="card p-5" style={{ width: "40%", boxShadow: "0 2px 5px 0 rgba(0, 0, 0, .25), 0 3px 10px 5px rgba(0, 0, 0, 0.13)"}}>
          <div className="images d-flex justify-content-center">
          <img
            src={logo}
            height="100"
            width={100}
            alt="Logo Sekolah"
            loading="lazy"
          />
          </div>
          <span className="my-2" style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold"
          }}>Login PPDB ONLINE</span>
          <br />
          <span style={{
            textAlign: "center",
            fontSize: "10px",
            fontWeight: "bold",
            color: "GrayText"
          }}>MTS ISLAM WALISONGO</span>
          <form>
            <div className="form-group my-3">
              <label htmlFor="exampleInputText" className="my-2">NISN / Username</label>
              <input type="text" className="form-control" id="exampleInputText" placeholder="" />
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleInputPassword1" className="my-2">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="" />
            </div>
          </form>
          <button type="submit" className="btn btn-primary">Masuk</button>
        </div>
      </section>
    </>
  )
}

export default Auth