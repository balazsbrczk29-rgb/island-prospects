import { IMG } from "./site"

export type Place = "harbour" | "rose" | "lagoon" | "exuma" | "harbourisland" | "reefs" | "land"
export type Kind = "Sea and islands" | "Sail and evening" | "Dive and snorkel" | "Culture and family" | "Fishing"

export type Tour = { id: string; name: string; line: string; place: Place; kind: Kind; img: string; alt: string; detail?: string }

const T = (id: string) => `https://www.majestictoursbahamas.com/tours/?id=${id}`
export const tourUrl = T

export const TOURS: Tour[] = [
  { id: "09", name: "Flying Cloud, Evening Dinner", line: "Sail Nassau Harbour as the city lights come on, with a Bahamian barbecue buffet.", place: "harbour", kind: "Sail and evening", img: IMG + "flying-cloud/evening/flying-cloud-sunset-picture-1.jpg", alt: "The Flying Cloud catamaran under sail at sunset", detail: "Pickups 5:00 to 5:30PM" },
  { id: "42", name: "Seahorse Sailing, Sunset Dinner Cruise", line: "A two-hour sail into an ocean sunset.", place: "harbour", kind: "Sail and evening", img: IMG + "seahorse-sailing/sunset-01.jpg", alt: "A Seahorse catamaran sailing at sunset" },
  { id: "06", name: "Barefoot Sailing Sunset Cruise", line: "Around Nassau Harbour and the island at dusk.", place: "harbour", kind: "Sail and evening", img: IMG + "barefoot-sailing/sunset-01_480.jpg", alt: "A sailboat silhouetted against the sunset" },
  { id: "68", name: "Blackbeard's Revenge Pirate Ship", line: "Daytime pirate drama aboard a 140 foot, 18th century style ship.", place: "harbour", kind: "Culture and family", img: IMG + "black-beard-revenge/blackbeardsrevengeboat.jpg", alt: "The Blackbeard's Revenge pirate ship" },
  { id: "39", name: "Sandy Toes, Rose Island", line: "The original swimming pigs and snorkelling, on an uninhabited private island.", place: "rose", kind: "Sea and islands", img: IMG + "sandy-toes/veranda-04_480.jpg", alt: "The veranda at Sandy Toes on Rose Island" },
  { id: "83", name: "Perfect Day, Rose Island", line: "Reef snorkel, a private beach club and the swimming pigs.", place: "rose", kind: "Sea and islands", img: IMG + "perfect-day/1.jpg", alt: "Beach loungers at the Rose Island beach club" },
  { id: "84", name: "Rose Island Half Day", line: "Pigs, lunch, snorkelling and turtle watching, without an eight-hour day.", place: "rose", kind: "Sea and islands", img: IMG + "rose-half-day/1.webp", alt: "Rose Island shoreline and turquoise water" },
  { id: "08", name: "Flying Cloud, Full Day Sail and Snorkel", line: "A 57 foot catamaran sail to a nearby island.", place: "rose", kind: "Sail and evening", img: IMG + "flying-cloud/rose.jpg", alt: "The Flying Cloud catamaran anchored off an island" },
  { id: "04", name: "Barefoot Sailing, Full Day Sail and Snorkel", line: "Great sailing and anchoring at a secluded beach.", place: "rose", kind: "Sail and evening", img: IMG + "barefoot-sailing/under-way_480.jpg", alt: "Barefoot Sailing under way" },
  { id: "33", name: "Blue Lagoon Island Dolphin Swim", line: "In the water with the dolphins at Dolphin Encounters.", place: "lagoon", kind: "Sea and islands", img: IMG + "dolphin-encounters/swim-05.jpg", alt: "A guest kissed by a dolphin at Blue Lagoon Island" },
  { id: "32", name: "Blue Lagoon Island, Dolphin Encounter", line: "The Close Encounter programme, standing in the shallows.", place: "lagoon", kind: "Culture and family", img: IMG + "dolphin-encounters/encounter-02.jpg", alt: "A dolphin encounter in the shallows" },
  { id: "53", name: "Blue Lagoon Island, Sea Lion Encounter", line: "Meet the sea lions at Blue Lagoon.", place: "lagoon", kind: "Culture and family", img: IMG + "blue-lagoon-sea-lion-encounter/sealion3.jpg", alt: "A sea lion at Blue Lagoon Island" },
  { id: "56", name: "Blue Lagoon, Island Beach Day", line: "Get away from busy Nassau for a serene beach day.", place: "lagoon", kind: "Sea and islands", img: IMG + "blue-lagoon/BLI12.jpg", alt: "The beach at Blue Lagoon Island" },
  { id: "35", name: "The Fantastic Exuma Day Trip", line: "55 minutes and 38 nautical miles by powerboat to the Exuma Cays: iguanas, stingrays, the pigs of Ship Channel Cay.", place: "exuma", kind: "Sea and islands", img: IMG + "powerboat/powerboat.jpg", alt: "An offshore powerboat running across turquoise water", detail: "Hotel transfer included" },
  { id: "70", name: "Aqua Shores, Exuma", line: "Swimming pigs, sharks and iguanas by luxury powerboat.", place: "exuma", kind: "Sea and islands", img: IMG + "aqua-shores/image001.jpg", alt: "An Aqua Shores powerboat" },
  { id: "60", name: "Born Free Charters, Exuma Island Hopping", line: "A full, all-inclusive day led by local guides.", place: "exuma", kind: "Sea and islands", img: IMG + "born-free-charters/20210104_173005000_iOS.jpg", alt: "A Born Free Charters boat in the Exuma Cays" },
  { id: "82", name: "Harbour Island Pink Sands Experience", line: "Pink Sands Beach, swimming pigs and turtles in one powerboat day.", place: "harbourisland", kind: "Sea and islands", img: IMG + "born-free-charters/pink_sand_walk.png", alt: "Walking on the pink sand beach of Harbour Island" },
  { id: "24", name: "Stuart Cove's, 2-Reef Snorkel", line: "Walls, reefs, wrecks and film locations in clear water.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/snorkel-02.jpg", alt: "Snorkellers over a reef" },
  { id: "26", name: "Stuart Cove's, 2-Tank Morning Dive", line: "Walls, reefs and wrecks over the shelf around New Providence.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/wall-01.jpg", alt: "A diver on a reef wall" },
  { id: "28", name: "Stuart Cove's, 2-Tank Shark Dive", line: "Face to face with sharks, operated by Stuart Cove's.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/shark-03.jpg", alt: "Reef sharks circling a diver" },
  { id: "25", name: "Stuart Cove's, 2-Tank Afternoon Dive", line: "Two tanks at film locations and wrecks.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/wreck-03.jpg", alt: "A diver above a wreck" },
  { id: "27", name: "Stuart Cove's, 1-Tank Night Dive", line: "The creatures of the reef at night.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/coral-01.jpg", alt: "Coral lit by a dive light" },
  { id: "29", name: "Stuart Cove's, Resort Course", line: "A first scuba experience, learned quickly.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/wreck-01.jpg", alt: "A wreck under clear water" },
  { id: "61", name: "Stuart Cove's, Open Water Certification", line: "Dive instruction and certification.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/wreck-01.jpg", alt: "A wreck dive site" },
  { id: "30", name: "Stuart Cove's, Wilderness Seafari", line: "An all-day dive trip toward the Out Islands.", place: "reefs", kind: "Dive and snorkel", img: IMG + "stuart-coves/shark-01_480.jpg", alt: "A shark over the reef" },
  { id: "43", name: "Local Culture Tour", line: "A Junkanoo shack, local teas and crafts, a fort and a rum distillery.", place: "land", kind: "Culture and family", img: IMG + "culture-tour/displaycase.jpg", alt: "A display case of Bahamian crafts" },
  { id: "49", name: "Clifton Heritage National Park", line: "A genuine journey into Bahamian history.", place: "land", kind: "Culture and family", img: IMG + "clifton/cliftonpic2.jpg", alt: "Clifton Heritage National Park" },
  { id: "81", name: "Island Food Tour: Sip. Sample. Savor.", line: "Nassau's first mobile food tour of Bahamian dishes and drinks.", place: "land", kind: "Culture and family", img: IMG + "food-tour/food_tour_1.jpg", alt: "Bahamian dishes on the food tour" },
  { id: "73", name: "Rum Runners Passage", line: "Native rum drinks and island delights.", place: "land", kind: "Culture and family", img: IMG + "rum-runners/IT1.jpg", alt: "Rum Runners Passage" },
  { id: "10", name: "Pirates of Nassau", line: "1716, the golden age of piracy, brought back to life.", place: "land", kind: "Culture and family", img: IMG + "pirates/blackbeard.jpg", alt: "Blackbeard at the Pirates of Nassau museum" },
  { id: "75", name: "Pirate Jeep Tours", line: "The pirate history of Nassau in a customised jeep.", place: "land", kind: "Culture and family", img: IMG + "pirate-jeep-tours/Pirate%20Jeep%20I.jpg", alt: "A pirate jeep in Nassau" },
  { id: "03", name: "Ardastra Gardens, Zoo and Conservation Centre", line: "Four acres of gardens and over 150 animals, most of them rescued.", place: "land", kind: "Culture and family", img: IMG + "ardastra-gardens/flamingo_480.jpg", alt: "A flamingo at Ardastra Gardens" },
  { id: "80", name: "Baha Bay Waterpark", line: "A family day of slides and pools.", place: "land", kind: "Culture and family", img: IMG + "baha-bay/Baha-Bay-Hero.jpg", alt: "Baha Bay waterpark" },
  { id: "37", name: "Deep Sea Fishing, Full Day", line: "Charter your own fishing vessel.", place: "harbour", kind: "Fishing", img: IMG + "bahamian-waters/days-catch.jpg", alt: "The day's catch on the dock" },
  { id: "38", name: "Deep Sea Fishing, Half Day", line: "Charter your own fishing vessel for the morning or afternoon.", place: "harbour", kind: "Fishing", img: IMG + "bahamian-waters/wahoo.jpg", alt: "A wahoo caught offshore" },
  { id: "05", name: "Barefoot Sailing, Half Day Sail and Snorkel", line: "On deck under the white jib, then into the water.", place: "rose", kind: "Sail and evening", img: IMG + "barefoot-sailing/welcome-aboard.jpg", alt: "Guests stepping aboard Barefoot Sailing" },
  { id: "41", name: "Seahorse Sailing, Half Day Sail and Snorkel", line: "A half day sail and snorkel by catamaran.", place: "rose", kind: "Sail and evening", img: IMG + "seahorse-sailing/boats-01.jpg", alt: "The Seahorse catamarans" },
]

export const PLACES: Record<Place, { name: string; note: string }> = {
  harbour: { name: "Nassau Harbour", note: "Sunset sails, the dinner cruises and the fishing charters leave from the harbour." },
  rose: { name: "Rose Island", note: "An uninhabited island off Nassau and Paradise Island: pigs, beach clubs, sail and snorkel." },
  lagoon: { name: "Blue Lagoon Island", note: "Dolphins, sea lions and a quiet beach, a short boat ride away." },
  exuma: { name: "Exuma Cays", note: "38 nautical miles by offshore powerboat: Allan's Cay iguanas and Ship Channel Cay." },
  harbourisland: { name: "Harbour Island, Eleuthera", note: "A full powerboat day to the Pink Sands Beach." },
  reefs: { name: "Southwest reefs", note: "Stuart Cove's walls, wrecks and shark dives off New Providence." },
  land: { name: "On the island", note: "Forts, rum, Junkanoo, pirates, gardens and food in and around Nassau." },
}
