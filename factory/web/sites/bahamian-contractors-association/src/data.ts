export const PHONE = "(242) 356-8850"
export const TEL = "tel:+12423568850"
export const EMAIL = "admin@bahamiancontractors.org"
export const ADDRESS = "#27 Chesapeake Road, Suite #11, Nassau"
export const EVENT = { name: "Skyfall", what: "Q4 Mix & Mingle", date: "2026-12-11T00:00:00-05:00", day: "Friday 11 December", where: "Royal Blue Tavern", url: "https://www.bahamiancontractors.org/events/skyfall-2026", bits: ["Drinks and hors d'oeuvres", "Networking", "Photo booth", "Giveaways", "VIP cigar lounge"] }
export const TIERS = [
  { id: "associate", name: "Associate", dues: 250, who: "Building suppliers, manufacturers, consultants, project managers and professionals." },
  { id: "general", name: "General", dues: 300, who: "General contractors, specialty contractors and subcontractors." },
  { id: "prime", name: "Prime", dues: 1000, who: "Contractors with an annual revenue of $5 million or more." },
  { id: "developer", name: "Developer / Corporate", dues: 5000, who: "Developers with an annual turnover of $10 million or more." },
] as const
export const ROLES = ["A contractor or subcontractor", "A supplier or manufacturer", "A consultant or professional", "A developer"] as const
export const REVENUE = ["Under $5 million", "$5 to $10 million", "$10 million or more"] as const
export function tierFor(role: string, rev: string) {
  if (role === "A developer") return rev === "$10 million or more" ? "developer" : "associate"
  if (role === "A contractor or subcontractor") return rev === "Under $5 million" ? "general" : "prime"
  return "associate"
}
