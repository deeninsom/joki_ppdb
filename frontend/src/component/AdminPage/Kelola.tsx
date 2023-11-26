import { useState } from "react";
import Layout from "../Layout/AdminPage/Layout"
// import HTMLReactParser from "html-react-parser";
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';

const Kelola = () => {

  const [content, setContent] = useState('')
  return (
    <Layout>
      <section>
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: "bold" }}>
              Perbarui Pengumuman
            </span>
          </div>
          <div className="content">
            <ReactQuill
              value={content}
              onChange={setContent}
            // modules={modules}
            />
          </div>
        <div className="card-footer d-flex justify-content-end align-items-center">
          <button className="btn btn-primary"> SIMPAN</button>
        </div>
        </div>
      </section>
    </Layout>
  )
}

export default Kelola;