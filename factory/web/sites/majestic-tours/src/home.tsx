import { useState } from "react"
import { mount, useLenis, Footer } from "./ui"
import { JourneyDesktop, JourneyPhone } from "./Journey"
import { STOPS_FOR_FORM } from "./ui"

function Home() {
  useLenis()
  const [where, setWhere] = useState(STOPS_FOR_FORM[0])
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <main id="main">
        <JourneyDesktop where={where} setWhere={setWhere} />
        <JourneyPhone where={where} setWhere={setWhere} />
      </main>
      <Footer />
    </>
  )
}
mount(<Home />)
