export const PHONE = "(242) 377-0335"
export const TEL = "tel:+12423770335"
export const ADDRESS = "Sabal Close, Airport Industrial Park, Nassau"
const BASE = "https://www.coverupbahamas.com/wp-content/uploads/2011/05/"
export const PHOTOS = {
  oldFortBay: { src: BASE + "Old-Fortbay-11.jpg", alt: "A two-storey building with a blue awning, white scalloped valance and curtains, among palms" },
  covers: { src: BASE + "Covers-1024x574.jpg", alt: "A boat fitted with a clear window enclosure, a coil of rope on deck" },
  upholstery: { src: BASE + "Boat-Upholstery-1024x574.jpg", alt: "Boat upholstery made by Cover Up" },
  ferry: { src: BASE + "Ferry-Seats-1024x574.jpg", alt: "Upholstered ferry seats made by Cover Up" },
  workshop: { src: "https://coverupbahamas.com/wp-content/uploads/2022/11/PHOTO-2022-11-01-14-05-00-3-1024x768.jpg", alt: "The Cover Up workshop with its sign and a Cover Up Weather Shield truck" },
}
export const LAND = [
  ["Awnings", "Fixed awnings for windows, doors, storefronts and verandahs, customised to your openings."],
  ["Retractable awnings", "Shade when you want it, rolled away when you don't."],
  ["Weather screens", "Screens that close a porch or restaurant terrace against wind and rain."],
  ["Hurricane shutters", "Storm protection made for your openings, ready before the season."],
] as const
export const SEA = [
  ["Bimini tops", "From a 10 ft inflatable upward."],
  ["Isinglass enclosures", "Clear enclosures, all the way up to a mega yacht."],
  ["Marine canvas", "Covers and canvas made for salt, sun and wind."],
  ["Boat upholstery", "Seats and cushions, from a sport boat to a ferry."],
] as const
