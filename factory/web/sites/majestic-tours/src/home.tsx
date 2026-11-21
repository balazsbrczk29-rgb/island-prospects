import { useState } from "react"
import { mount, useLenis, Footer, STOPS_FOR_FORM } from "./ui"
import { JourneyDesktop, JourneyPhone } from "./Journey"
import { Story, Arrival, Desks, Faq, FloatingActions } from "./sections"

function Home() {
  useLenis()
  const [where, setWhere] = useState(STOPS_FOR_FORM[0])
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <main id="main">
        <JourneyDesktop where={where} setWhere={setWhere} />
        <JourneyPhone where={where} setWhere={setWhere} />
        <Story />
        <Arrival />
        <Desks />
        <Faq />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
mount(<Home />)
