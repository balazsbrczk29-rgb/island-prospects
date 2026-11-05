export const IMG = "https://i0.wp.com/www.hardinglee.com/wp-content/uploads/2022/07/"

export const ATTORNEYS = {
  dhl: { name: "Donna M. Harding-Lee", role: "Senior Partner", email: "dharding-lee@hardinglee.com", photo: `${IMG}donna1.jpg?resize=368%2C436` },
  nhj: { name: "Nadia Hope Johnson", role: "Associate", email: "nhjohnson@hardinglee.com", photo: `${IMG}nadia1.jpg?resize=368%2C436` },
} as const
export type AKey = keyof typeof ATTORNEYS

// Matters drawn only from the practice areas the firm and its attorneys publish.
export const MATTERS: { id: string; label: string; area: string; who: AKey[]; note: string; ask: string[] }[] = [
  { id: "property", label: "Buying or selling property", area: "Conveyancing and real property", who: ["dhl", "nhj"], note: "Conveyancing is a core practice of the firm and an area of both attorneys.", ask: ["Buying or selling", "Island and property", "Target completion"] },
  { id: "company", label: "Forming or running a company", area: "Company incorporation, corporate and commercial law", who: ["dhl"], note: "Company incorporation and commercial law are among the firm's stated focus areas.", ask: ["Company name, if chosen", "Local or international owners", "Purpose of the company"] },
  { id: "family-island", label: "A resort or Family Island development", area: "Resort development, with particular focus on the Family Islands", who: ["dhl"], note: "Mrs. Harding-Lee's practice includes resort development, with particular focus in the Family Islands.", ask: ["Island and site", "Stage of the project", "Your role"] },
  { id: "estate", label: "Planning an estate", area: "Estate planning", who: ["dhl"], note: "Estate planning is listed among the Senior Partner's areas of practice.", ask: ["Who the plan is for", "Assets in The Bahamas", "Anything urgent"] },
  { id: "employment", label: "An employment question", area: "Employment law", who: ["dhl", "nhj"], note: "Employment law is an area of both attorneys.", ask: ["Employer or employee", "What happened, briefly", "Any deadline"] },
  { id: "family", label: "A family or adoption matter", area: "Family law", who: ["nhj"], note: "Family law is an area of interest of Mrs. Johnson, an adoption advocate.", ask: ["Type of matter", "Island", "Best time to call"] },
  { id: "finance", label: "Banking, insurance or gaming", area: "Banking, insurance and gaming law", who: ["dhl"], note: "Banking and insurance are firm focus areas; gaming law is among the Senior Partner's practice areas.", ask: ["Your organisation", "Nature of the matter", "Local or international"] },
]
