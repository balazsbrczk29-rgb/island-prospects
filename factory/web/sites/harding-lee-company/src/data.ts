export const IMG = "https://ip-assets-harding-lee-company.lovable.app/assets/"

export type AKey = "dhl" | "nhj"

export const ATTORNEYS: Record<AKey, {
  name: string; short: string; role: string; email: string; portrait: string; initials: string
  areas: string; record: string[]
}> = {
  dhl: {
    name: "Donna M. Harding-Lee",
    short: "Mrs. Harding-Lee",
    role: "Senior Partner",
    initials: "DHL",
    email: "dharding-lee@hardinglee.com",
    portrait: "https://i0.wp.com/www.hardinglee.com/wp-content/uploads/2022/07/donna1.jpg",
    areas: "Corporate and commercial law, conveyancing, real property, estate planning, resort development with a particular focus on the Family Islands, banking, gaming and employment law.",
    record: [
      "Former partner of Cash, Fountain & Company, where she worked closely with Sir Gerald Cash and tutored under Sir Cyril Fountain, a former Chief Justice.",
      "Chairperson of the Board of Bank of The Bahamas.",
      "Has served on the Judicial and Legal Services Commission and the Disciplinary Tribunal of The Bahamas Bar Association.",
    ],
  },
  nhj: {
    name: "Nadia Hope Johnson",
    short: "Mrs. Johnson",
    role: "Attorney",
    initials: "NHJ",
    email: "nhjohnson@hardinglee.com",
    portrait: "https://i0.wp.com/www.hardinglee.com/wp-content/uploads/2022/07/nadia1.jpg",
    areas: "Conveyancing, employment and family law. An adoption advocate, passionate about children's rights.",
    record: [
      "LLB, University of Buckingham. Called to the Bar of England & Wales on 24 November 2005 (Middle Temple) and to The Bahamas Bar on 9 December 2005.",
      "With the firm since November 2005.",
      "Mentor and board member, Ranfurly Homes for Children.",
    ],
  },
}

export type Matter = { id: string; label: string; who: AKey[]; why: string; plain: string }

export const MATTERS: Matter[] = [
  { id: "property", label: "Property, land or resort development", who: ["dhl", "nhj"],
    why: "Conveyancing and real property are at the centre of her practice, with resort development in the Family Islands.",
    plain: "Title, conveyancing and the transfer of land and homes in Nassau, on Long Island and across the Family Islands, and the legal side of developing land and resorts outside Nassau." },
  { id: "company", label: "Forming or running a company", who: ["dhl"],
    why: "Company incorporation and corporate and commercial law are at the core of her practice and the firm's.",
    plain: "Company incorporation, corporate and commercial law, and international and domestic transactions." },
  { id: "finance", label: "A banking, insurance or gaming matter", who: ["dhl"],
    why: "Banking and gaming law are among her areas; insurance and banking are a focus of the firm.",
    plain: "Banking, insurance and gaming law, for institutional and individual clients, locally and worldwide." },
  { id: "estate", label: "Planning an estate", who: ["dhl"],
    why: "Estate planning is one of her areas, for families with property in The Bahamas.",
    plain: "Estate planning for families with property and interests in The Bahamas." },
  { id: "employment", label: "An employment question", who: ["dhl", "nhj"],
    why: "Employment law is part of her practice, for employers and employees.",
    plain: "Employment law for employers and employees." },
  { id: "family", label: "Family law or an adoption", who: ["nhj"],
    why: "Family law is one of her areas, and she is an adoption advocate, passionate about children's rights.",
    plain: "Family law and adoption, handled with care for the children involved." },
]

export const OFFICES = {
  nassau: {
    name: "Nassau chambers",
    island: "New Providence",
    lines: ["Mecam House", "Dowdeswell & Deveaux Streets", "P.O. Box N\u2011877, Nassau"],
    phones: [["(242) 326-4065", "+12423264065"], ["(242) 326-4066", "+12423264066"], ["(242) 328-7712", "+12423287712"]],
    fax: "(242) 326-4067",
    map: "https://www.google.com/maps/search/?api=1&query=Dowdeswell+Street+and+Deveaux+Street+Nassau+Bahamas",
  },
  longisland: {
    name: "Long Island office",
    island: "Long Island",
    lines: ["Salt Pond, Long Island", "P.O. Box LI 30\u2011129"],
    phones: [["(242) 338-0009", "+12423380009"], ["(242) 338-0042", "+12423380042"]],
    fax: "(242) 338-0092",
    map: "https://www.google.com/maps/search/?api=1&query=Salt+Pond+Long+Island+Bahamas",
  },
} as const

export type OKey = keyof typeof OFFICES

export function letter(m: Matter | null, to: AKey, name = "", reply = "", note = "") {
  const a = ATTORNEYS[to]
  const others = m ? m.who.filter(k => k !== to).map(k => ATTORNEYS[k].email) : []
  const subject = m ? `Enquiry: ${m.label.toLowerCase()}` : "Enquiry"
  const body = [
    `Dear ${a.short},`,
    "",
    m ? `I would like to discuss a matter concerning ${m.label.charAt(0).toLowerCase() + m.label.slice(1)}.` : "I would like to discuss a matter with you.",
    note ? `\n${note}` : "",
    "",
    `Name: ${name}`,
    `Best way to reach me: ${reply}`,
  ].join("\n")
  const cc = others.length ? `&cc=${others.join(",")}` : ""
  return `mailto:${a.email}?subject=${encodeURIComponent(subject)}${cc}&body=${encodeURIComponent(body)}`
}
