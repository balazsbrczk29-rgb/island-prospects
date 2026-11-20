// Every stop and fact below is from cherylbahamastaxiandtours.com/bahamas-tours.html (scraped 2026-11-20).
export type Kind = "History" | "Food and rum" | "Beach and water" | "Culture and shopping"
export type Stop = { id: string; name: string; kind: Kind; line: string; note?: string }

export const STOPS: Stop[] = [
  { id: "forts", name: "The forts and the 66 Steps", kind: "History", line: "Fort Charlotte, Fort Fincastle, Fort Montague: built in the 1700s. Re-enactment and the noon cannon on Wednesdays and Fridays.", note: "Wed, Fri 11:30am" },
  { id: "cloisters", name: "The Cloisters", kind: "History", line: "Built by French monks in the 14th century, now on Paradise Island, looking back across the harbour." },
  { id: "batcave", name: "The Bat Cave", kind: "History", line: "Lucayan history, pirate legends, fruit bats today, and the kissing chair for a photo." },
  { id: "clifton", name: "Clifton Heritage Park", kind: "History", line: "A 45-minute walk through the history of the slave village, with ATV, beach or snorkel options.", note: "45 min" },
  { id: "conch", name: "Conch demonstration", kind: "Food and rum", line: "Out of the shell, cleaned, every part explained, then fresh conch salad.", note: "$10 a bowl, shares 4" },
  { id: "fishfry", name: "The Fish Fry", kind: "Food and rum", line: "Lunch with the locals: 15 to 20 restaurants, seafood fried, steamed or grilled." },
  { id: "rumcake", name: "Rum Cake Factory", kind: "Food and rum", line: "Free tastings: piña colada, amaretto, banana, cinnamon. Over a thousand cakes baked a day." },
  { id: "distillery", name: "Rum distillery", kind: "Food and rum", line: "A history tour of one of Nassau's oldest restaurants, ending at the bar." },
  { id: "candy", name: "Bahamian candy store", kind: "Food and rum", line: "An authentic Bahamian sugar rush. Ask about the candy store tour." },
  { id: "junkanoo", name: "Junkanoo World Museum", kind: "Culture and shopping", line: "Drums, horns, cowbells and the costumes. Try them on, then conch fritters on site." },
  { id: "craft", name: "Straw market and hand craft", kind: "Culture and shopping", line: "Souvenirs of conch shell, coconut and straw, with help knowing a fair price." },
  { id: "ardastra", name: "Ardastra Gardens and Zoo", kind: "Culture and shopping", line: "Four acres of gardens and native birds; the flamingo show is at 10:30 every morning.", note: "$18 pp, under 4 free" },
  { id: "lovebeach", name: "Time at Love Beach", kind: "Beach and water", line: "A secluded beach away from downtown: music, food, drinks. Lunch package for six or more.", note: "Snorkel $20" },
  { id: "rose", name: "Snorkel cruise to Rose Island", kind: "Beach and water", line: "A coral reef, a secluded beach, a BBQ lunch cooked at anchor. Hotel transfers included.", note: "About 6 hours" },
  { id: "pigs8", name: "Pieces of 8: the swimming pigs", kind: "Beach and water", line: "Five Exuma cays by 38 ft powerboat: the pigs, iguanas, nurse sharks, a sandbar, lunch.", note: "$400 adult, $365 age 5-11" },
  { id: "exuma", name: "Exuma day trip", kind: "Beach and water", line: "Stingrays, sharks and the pigs, with a plane and boat option for anyone who gets seasick.", note: "9am to 5pm" },
  { id: "bluelagoon", name: "Blue Lagoon beach day", kind: "Beach and water", line: "A boat to Blue Lagoon Island: grilled lunch, the aqua park, dolphins and sea lions." },
  { id: "dolphin", name: "Dolphin swim", kind: "Beach and water", line: "In an ocean lagoon: the kiss, the hug, the foot push. Sea lion programmes too." },
  { id: "fishing", name: "Fishing and snorkelling", kind: "Beach and water", line: "Sightseeing by boat, reef fishing and optional snorkelling near a private island." },
  { id: "atv", name: "ATV adventure and beach", kind: "Beach and water", line: "Off-road through Clifton's trails, then the beach. Driver's licence needed; helmets provided." },
  { id: "parasail", name: "Parasailing and jet ski", kind: "Beach and water", line: "Up above the harbour, or fast across it." },
  { id: "glass", name: "Glass bottom boat", kind: "Beach and water", line: "The reef below, without getting wet." },
]

export const KINDS: Kind[] = ["History", "Food and rum", "Beach and water", "Culture and shopping"]
export const PRESETS: Record<string, string[]> = {
  short: ["forts", "craft", "cloisters"],
  full: ["forts", "lovebeach", "conch"],
}
