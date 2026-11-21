// Every stop, line, time and price below is from cherylbahamastaxiandtours.com/bahamas-tours.html
// (scraped 2026-11-20, photo list re-checked 2026-11-21). Map positions are approximate, placed by us.
export type Kind = "History" | "Food and rum" | "Culture and shopping" | "Beach and water"
export type Stop = {
  id: string; name: string; short: string; kind: Kind; line: string; note?: string; img: string
  at: [number, number]           // lat, lon (approximate)
  sea?: boolean                  // reached by boat from the harbour
  far?: boolean                  // off this map (Exuma)
  mins?: number                  // sourced visit length
}

export const STOPS: Stop[] = [
  { id: "forts", name: "The forts and the 66 Steps", short: "Forts", kind: "History", img: "the-forts.png", at: [25.0716, -77.3385],
    line: "Fort Charlotte, Fort Fincastle and Fort Montague, built in the 1700s. Re-enactment and the noon cannon on Wednesdays and Fridays.", note: "Wed and Fri, 11:30am" },
  { id: "cloisters", name: "The Cloisters", short: "Cloisters", kind: "History", img: "cloisters.png", at: [25.0858, -77.3155],
    line: "Built by French monks in the 14th century, now standing on Paradise Island, looking back across the harbour." },
  { id: "batcave", name: "The Bat Cave", short: "Bat Cave", kind: "History", img: "bat-cave.png", at: [25.042, -77.4],
    line: "Lucayan history, pirate legends, fruit bats today, and the kissing chair for a photo." },
  { id: "clifton", name: "Clifton Heritage Park", short: "Clifton", kind: "History", img: "clifton-heritage-park.png", at: [25.002, -77.546], mins: 45,
    line: "A 45-minute walk through the history of the slave village, with ATV, beach or snorkel options.", note: "45 minutes" },
  { id: "conch", name: "Conch demonstration", short: "Conch", kind: "Food and rum", img: "conch.png", at: [25.0775, -77.3255],
    line: "Out of the shell, cleaned, every part explained, then a bowl of fresh conch salad.", note: "$10 a bowl, shares 4" },
  { id: "fishfry", name: "The Fish Fry", short: "Fish Fry", kind: "Food and rum", img: "fish-fry.png", at: [25.079, -77.361],
    line: "Lunch with the locals: 15 to 20 restaurants, seafood fried, steamed or grilled." },
  { id: "rumcake", name: "Rum Cake Factory", short: "Rum cake", kind: "Food and rum", img: "rum-cake-factory.png", at: [25.0772, -77.3355],
    line: "Free tastings: piña colada, amaretto, banana, cinnamon. Over a thousand cakes baked a day." },
  { id: "distillery", name: "Rum distillery", short: "Distillery", kind: "Food and rum", img: "run-distillary.png", at: [25.0752, -77.3478],
    line: "A history tour of one of Nassau's oldest restaurants, ending at the bar." },
  { id: "candy", name: "Bahamian candy store", short: "Candy", kind: "Food and rum", img: "candy-store.png", at: [25.0768, -77.3418],
    line: "An authentic Bahamian sugar rush. Ask about the candy store tour." },
  { id: "junkanoo", name: "Junkanoo World Museum", short: "Junkanoo", kind: "Culture and shopping", img: "junkanoo.png", at: [25.0738, -77.3502],
    line: "Drums, horns, cowbells and the costumes. Try them on, then conch fritters on site." },
  { id: "craft", name: "Straw market and hand craft", short: "Straw market", kind: "Culture and shopping", img: "hand-craft.png", at: [25.0779, -77.3438],
    line: "Souvenirs of conch shell, coconut and straw, with help knowing what a fair price is." },
  { id: "ardastra", name: "Ardastra Gardens and Zoo", short: "Ardastra", kind: "Culture and shopping", img: "ardastra-gardens-zoo.png", at: [25.0752, -77.369],
    line: "Four acres of gardens and native birds. The flamingo show is at 10:30 every morning.", note: "$18 per person, under 4 free" },
  { id: "lovebeach", name: "Time at Love Beach", short: "Love Beach", kind: "Beach and water", img: "time-at-the-beach.png", at: [25.0635, -77.49],
    line: "A secluded beach away from downtown: music, food, drinks. Lunch package for six or more.", note: "Snorkelling $20" },
  { id: "atv", name: "ATV adventure and beach", short: "ATV", kind: "Beach and water", img: "atv-adventure.png", at: [25.0075, -77.536],
    line: "Off-road through Clifton's trails, then the beach. One rider per ATV, driver's licence needed, helmets and gloves provided." },
  { id: "parasail", name: "Parasailing and jet ski", short: "Parasail", kind: "Beach and water", img: "parasailing-jetski.png", at: [25.0795, -77.405],
    line: "Up above the bay, or fast across it." },
  { id: "glass", name: "Glass bottom boat", short: "Glass bottom", kind: "Beach and water", img: "glass-bottom-boat.png", at: [25.0818, -77.3448], sea: true,
    line: "The reef below, without getting wet." },
  { id: "bluelagoon", name: "Blue Lagoon beach day", short: "Blue Lagoon", kind: "Beach and water", img: "blue-lagoon-beach.png", at: [25.0988, -77.2845], sea: true,
    line: "A boat to Blue Lagoon Island: grilled lunch, the aqua park, dolphins and sea lions." },
  { id: "dolphin", name: "Dolphin swim", short: "Dolphins", kind: "Beach and water", img: "dolphin-swim.png", at: [25.0972, -77.2712], sea: true,
    line: "In an ocean lagoon: the kiss, the hug, the foot push. Sea lion programmes too." },
  { id: "fishing", name: "Fishing and snorkelling", short: "Fishing", kind: "Beach and water", img: "fishing-and-snorkeling.png", at: [25.0905, -77.31], sea: true,
    line: "Sightseeing by boat, reef fishing and optional snorkelling near a private island." },
  { id: "rose", name: "Snorkel cruise to Rose Island", short: "Rose Island", kind: "Beach and water", img: "snorkeling.png", at: [25.0975, -77.175], sea: true, mins: 360,
    line: "A coral reef, a secluded beach, a BBQ lunch cooked at anchor, 8 miles east of downtown. Hotel transfers included.", note: "About 6 hours" },
  { id: "pigs8", name: "Pieces of 8: the swimming pigs", short: "Pigs by powerboat", kind: "Beach and water", img: "pieces-of-eight-2.png", at: [24.99, -77.075], sea: true, far: true,
    line: "Five Exuma cays by 38 ft powerboat: the pigs, iguanas, nurse sharks, a sandbar, lunch. Full refund 72 hours or more ahead.", note: "$400 adult, $365 age 5 to 11" },
  { id: "exuma", name: "Exuma day trip", short: "Exuma day", kind: "Beach and water", img: "swim-with-pigs.png", at: [24.975, -77.09], sea: true, far: true,
    line: "Stingrays, sharks and the swimming pigs, with a plane and boat option for anyone who gets seasick.", note: "9am to 5pm" },
]

export const KINDS: Kind[] = ["History", "Food and rum", "Culture and shopping", "Beach and water"]

/* where the day starts and ends */
export const STARTS = [
  { id: "cable", label: "Cable Beach", at: [25.0745, -77.4] as [number, number] },
  { id: "downtown", label: "Downtown and the cruise port", at: [25.0788, -77.3432] as [number, number] },
  { id: "paradise", label: "Paradise Island", at: [25.0846, -77.323] as [number, number] },
  { id: "west", label: "Western end", at: [25.026, -77.528] as [number, number] },
  { id: "airport", label: "Nassau airport", at: [25.039, -77.466] as [number, number] },
]
export const DOCK: [number, number] = [25.0795, -77.3405] // harbour, downtown

export const PRESETS: Record<string, { title: string; ids: string[] }> = {
  short: { title: "Sightseeing and shopping", ids: ["forts", "craft", "cloisters"] },
  full: { title: "A full day out", ids: ["forts", "conch", "lovebeach"] },
}

/* Fees Cheryl's site states. Anything not listed here is quoted by Cheryl's. */
export function feeFor(id: string, adults: number, kids: number): { lo: number; hi: number; text: string } | null {
  const ppl = adults + kids
  switch (id) {
    case "forts": return { lo: 3 * ppl, hi: 5 * ppl, text: "historic sites, usually $3 to $5 each" }
    case "conch": { const b = Math.ceil(ppl / 4); return { lo: b * 10, hi: b * 10, text: `${b} bowl${b > 1 ? "s" : ""} of conch salad, $10 each` } }
    case "ardastra": return { lo: 18 * ppl, hi: 18 * ppl, text: "$18 per person (under 4 free)" }
    case "pigs8": return { lo: 400 * adults + 365 * kids, hi: 400 * adults + 365 * kids, text: "$400 adult, $365 age 5 to 11" }
    default: return null
  }
}
