import Layout from "../../Layout/SiswaPage/Layout"

const CardPengumuman = () => {
  return (
    <Layout>
      <section>
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "GrayText" }}>
            <span style={{ fontWeight: "bold", color: "yellow" }}><i className="fa-regular fa-paper-plane me-2"></i>INFO PENGUMUMAN</span>
          </div>
          <div className="card-body p-4">
            <span>Belum ada pengumuman dari Panitia PPDB Online SMP ISLAM WALISONGO</span>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CardPengumuman