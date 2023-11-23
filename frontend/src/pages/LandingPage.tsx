import AlurSection from "../component/LandingPage/_ui/AlurSection"
import InfoSection from "../component/LandingPage/_ui/InfoSection"
import Jumbotron from "../component/LandingPage/_ui/Jumbotron"
import KontakSection from "../component/LandingPage/_ui/KontakSection"
import ProfileSekolah from "../component/LandingPage/_ui/ProfileSekolah"
import SyaratSection from "../component/LandingPage/_ui/SyaratSection"
import Layout from "../component/Layout/LandingPage/Layout"

const LandingPage = () => {
  return (
    <Layout>
      <Jumbotron/>
      <AlurSection/>
      <InfoSection/>
      <SyaratSection/>
      <ProfileSekolah/>
      <KontakSection/>
    </Layout>
  )
}

export default LandingPage