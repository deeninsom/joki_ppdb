// import { useEffect, useState } from "react"
// import Layout from "../component/Layout/SiswaPage/Layout"
// import HomeSection from "../component/SiswaPage/_ui/HomeSection"
// import { useNavigate } from "react-router-dom"

// const SiswaPage = () => {

//   // const navigate = useNavigate()

//   // const [menuNumber, setMenuNumber] = useState(1)
//   // const [page, setPage] = useState("")
//   // useEffect(()=>{
//   //   setMenuNumber(1)
//   // }, [])

//   // const handleClickMenu = (page: string) =>{
//   //   setMenuNumber(number)
//   // }

//   // const handleLogout = () => {
//   //   navigate('/')
//   // }


//   return (
//     <Layout>
//       {/* <HomeSection/> */}
//       {/* <section style={{overflow: "hidden"}}>
//       <div className="row ms-2 mt-4">
//         <div className="col-sm-3">
//           <div className="card p-4">
//             <div className="tittle" style={{ fontWeight: "bold", fontSize: "17px" }}>MENU DASHBOARD</div>
//             <div className="content-header d-flex gap-4 mt-4 align-items-center" style={{ marginLeft: "20px" }}>
//               <img src={logo} style={{ width: "50px" }} alt="" />
//               <div className="content-text">
//                 <div className="text-tittle d-flex align-items-center gap-1" style={{ color: "GrayText", fontSize: "10px", fontWeight: "bold" }}>
//                   <i className="fa-solid fa-user"></i>
//                   <span>calon siswa</span>
//                 </div>
//                 <span style={{ fontSize: "15px" }}>Syihabuddin</span>
//               </div>
//             </div>
//             <div className="content-menu mt-4">
//               <span style={{ fontSize: "13px", fontWeight: "bolder", color: "GrayText" }}>UTAMA</span>
//               <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
//                 <li className="my-3 d-flex align-items-center gap-3" style={{cursor: "pointer"}} onClick={()=> handleClickMenu(1)}>
//                   <i className="fa fa-solid fa-house"></i>
//                   <span>HOME</span>
//                 </li>
//                 <li className="my-3 d-flex align-items-center gap-3" style={{cursor: "pointer"}} onClick={()=> handleClickMenu(2)}>
//                   <i className="fa fa-solid fa-volume-high"></i>
//                   <span style={{ marginLeft: "-2px" }}>PENGUMUMAN</span>
//                 </li>
//                 <li className="my-3 d-flex align-items-center gap-3" style={{cursor: "pointer"}} onClick={()=> handleClickMenu(3)}>
//                   <i className="ms-1 fa fa-solid fa-file"></i>
//                   <span style={{ marginLeft: "2px" }}>BIODATA</span>
//                 </li>
//                 <li className="my-3 d-flex align-items-center gap-3" style={{cursor: "pointer"}}>
//                   <i className="fa fa-solid fa-print" style={{ marginLeft: "2px"}} ></i>
//                   <span style={{ marginLeft: "1px" }}>PRINT PENDAFTARAN</span>
//                 </li>
//               </ul>
//               <span style={{ fontSize: "13px", fontWeight: "bolder", color: "GrayText" }}>LAINYA</span>
//               <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
//                 <li className="my-3 d-flex align-items-center gap-3" onClick={handleLogout} style={{cursor: "pointer"}}>
//                   <i style={{ marginLeft: "4px" }} className="fa fa-solid fa-right-from-bracket"></i>
//                   <span>KELUAR</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-8 ms-3">
//           {
//             menuNumber == 1 && (
//               <CardHome/>
//             )
//           }
//                  {
//             menuNumber == 2 && (
//               <CardPengumuman/>
//             )
//           }
//                  {
//             menuNumber == 3 && (
//               <CardBiodata/>
//             )
//           }
//         </div>
//       </div>
//     </section> */}
//     </Layout>
//   )
// }

// export default SiswaPage