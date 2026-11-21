import { Plus } from "lucide-react"
import LivingWater from "./LivingWater"
import { BookButton, Closing, Toolbar, mount } from "./chrome"
import { PHOTO, PLACES, TIERS, money, sized } from "./trip"
import "./styles.css"

const QA: { title: string; items: [string, string][] }[] = [
  {
    title: "The boat",
    items: [
      ["What kind of boat will I get?", "Every rental is the same: a 24 ft Key West, comfortable seating for 8, a center console with shade, and a single 250 hp engine. No need to compare options. They are all identical and all well maintained."],
      ["What is included on the boat?", "A Garmin GPS loaded with current Abaco maps, all required safety gear, and an easy-access cooler under the helm seat for drinks, food, or ice and your catch."],
      ["How many people can I bring?", "The boat comfortably seats 8."],
    ],
  },
  {
    title: "Booking",
    items: [
      ["How do I book?", "Online. Pick your dates, choose your pickup and return times, and see exactly what is available. Booking online is the fastest way to lock in your dates."],
      ["How do I check availability?", "Availability is live on our booking page and updated in real time. Whatever you see open is open, so there is no need to call or text to confirm."],
      ["How long is a rental?", "Rentals are based on a 24 hour period. Choose a return time earlier than your pickup time so you are not charged for an extra day."],
      ["Do you allow single day rentals?", "Yes. We allow 1 day rentals, and the daily rate drops as you add more days."],
    ],
  },
  {
    title: "Where you can go",
    items: [
      ["Where can I take the boat?", "Your rental is approved for use within a set boundary around Abaco. This keeps you within safe, familiar waters and close to fuel, help, and cell service if you need it. The boundary map comes with your rental agreement. Please review it before heading out."],
      ["I have a specific route in mind. Is it in range?", "Tell us the route and we will confirm it falls within the boundary."],
      ["It is my first time in the Abacos and Man-O-War seems hard to reach. Help?", "That is exactly why we deliver. Tell us where you are staying and we will get the boat to you."],
    ],
  },
]

function Faq() {
  return (
    <>
      <a className="skip" href="#rates">Skip to rates</a>
      <Toolbar here="faq" />
      <main>
        <section className="page-head" data-tab-hide>
          <div className="wrap page-head__in">
            <h1>Good to know before you book the&nbsp;boat.</h1>
            <div>
              <p>If your dates are the question, the booking page shows live availability, so you never have to call to check.</p>
              <BookButton />
            </div>
          </div>
          <LivingWater
            className="strip" focus="50% 62%" eager
            src={sized(PHOTO.shallows, 1500)} texture={sized(PHOTO.shallows, 1500)}
            srcSet={`${sized(PHOTO.shallows, 750)} 750w, ${sized(PHOTO.shallows, 1500)} 1500w, ${sized(PHOTO.shallows, 2500)} 2500w`} sizes="100vw"
            alt="Sunlight rippling over white sand under clear shallow water"
          />
        </section>

        <div className="wrap">
          <section className="know" id="rates" aria-labelledby="rates-title">
            <h2 id="rates-title">The longer you float, the more you save.</h2>
            <table className="rates">
              <caption>Rates are VAT exclusive. Every rental is the same 24 ft Key West.</caption>
              <thead><tr><th scope="col">Length of rental</th><th scope="col">Per day</th></tr></thead>
              <tbody>{TIERS.map(t => <tr key={t.label}><th scope="row">{t.label}</th><td>{money(t.rate)}</td></tr>)}</tbody>
            </table>
          </section>

          <section className="know" aria-labelledby="delivery-title">
            <h2 id="delivery-title">Getting your boat.</h2>
            <table className="rates">
              <caption>Elbow Cay and Marsh Harbour are free if you return the team member who brings the boat back to Man-O-War Cay.</caption>
              <thead><tr><th scope="col">Where you are staying</th><th scope="col">Delivery, each way</th></tr></thead>
              <tbody>{PLACES.map(p => <tr key={p.id}><th scope="row">{p.name}</th><td>{p.each ? money(p.each) : "Free"}</td></tr>)}</tbody>
            </table>
          </section>

          <section className="know" aria-labelledby="extras-title">
            <h2 id="extras-title">Add-ons.</h2>
            <table className="rates">
              <caption>Add them when you book, or ask us on WhatsApp.</caption>
              <thead><tr><th scope="col">Extra</th><th scope="col">Price</th></tr></thead>
              <tbody>
                <tr><th scope="row">A Night Out</th><td>$50 an hour</td></tr>
                <tr><th scope="row">Get Acquainted</th><td>$100 an hour</td></tr>
                <tr><th scope="row">Snorkeling set</th><td>from $5 a day</td></tr>
              </tbody>
            </table>
          </section>

          {QA.map(g => (
            <section className="know" key={g.title} aria-label={g.title}>
              <h2>{g.title}.</h2>
              <div className="qa">
                {g.items.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}<Plus size={20} strokeWidth={2} aria-hidden="true" /></summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Closing />
    </>
  )
}
mount(<Faq />)
