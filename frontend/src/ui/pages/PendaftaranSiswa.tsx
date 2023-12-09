/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import ButtonStep from "./../component/ButtonStep"
import FormPendaftaran from "../component/FormPendaftaran"
import logo from "../../../assets/SMP-removebg-preview.jpg"


const PendaftaranSiswa = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCardForm, setShowCardForm] = useState(Array(6).fill(false));

  const handleStepClick = (stepIndex: any) => {
    setCurrentStep(stepIndex);
    setShowCardForm((prev) =>
      prev.map((_, index) => (index === stepIndex ? true : false))
    );
  };

  const handleNextClick = (stepIndex: any) => {
    const nextStep = stepIndex + 1;
    setCurrentStep(nextStep);
    setShowCardForm(prev => prev.map((_, index) => index === nextStep ? true : false));
  };

  const handlePrevClick = (stepIndex: any) => {
    const nextStep = stepIndex - 1;
    setCurrentStep(nextStep);
    setShowCardForm(prev => prev.map((_, index) => index === nextStep ? true : false));
  };

  useEffect(() => {
    setCurrentStep(0);
    setShowCardForm(prev => prev.map((_, index) => index === 0));
  }, []);
  
  return (
    <>
      <section>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: "#004040" }}>
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <a className="navbar-brand mt-lg-0 d-flex align-items-center gap-2" href="/ppdbonline" style={{ color: "white", fontWeight: "bold" }}>
                <img
                  src={logo}
                  height="25"
                  alt="Logo Sekolah"
                  loading="lazy"
                />
                PPDB ONLINE
              </a>
            </div>
          </div>
        </nav>
        <div className="content">
          <div className="text-header mt-4">
            <div className="logo d-flex justify-content-center my-4">
              <img src={logo} height={100} alt="" />
            </div>
            <div style={{ fontSize: "20px", textAlign: "center", fontFamily: "monospace" }}>
              FORM PENDAFTARAN PPDB ONLINE<br />
              <span style={{ fontWeight: "bold" }}>SMP ISLAM WALISONGO</span>
            </div>
          </div>
          <div className="step-content mt-5 d-flex justify-content-center align-items-center gap-2">
            <ButtonStep onClick={() => handleStepClick(0)} active={currentStep === 0} text="Ketentuan" />
            <i className="fa fa-solid fa-chevron-right"></i>
            <ButtonStep onClick={() => handleStepClick(1)} active={currentStep === 1} text="Data Siswa" />
            <i className="fa fa-solid fa-chevron-right"></i>
            <ButtonStep onClick={() => handleStepClick(2)} active={currentStep === 2} text="Data Alamat" />
            <i className="fa fa-solid fa-chevron-right"></i>
            <ButtonStep onClick={() => handleStepClick(3)} active={currentStep === 3} text="Data Orang Tua" />
            <i className="fa fa-solid fa-chevron-right"></i>
            <ButtonStep onClick={() => handleStepClick(4)} active={currentStep === 4} text="Data Sekolah" />
            <i className="fa fa-solid fa-chevron-right"></i>
            <ButtonStep onClick={() => handleStepClick(5)} active={currentStep === 5} text="Konfirmasi" />
          </div>
        </div>

        {showCardForm.map((show, index) => (
          show &&
          <FormPendaftaran key={index} numberCard={index} active={index === currentStep} onNext={() => handleNextClick(index)} onPrev={() => handlePrevClick(index)} />
        ))}
      </section>
    </>
  )
}

export default PendaftaranSiswa