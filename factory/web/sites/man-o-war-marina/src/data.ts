// Every fact below is sourced from manowarmarinavillage.com (home, /services, /faq, /mow-life), Nov 2026.
export const BIZ = {
  name: 'Man-O-War Marina',
  phone: '(242) 554-9500',
  tel: '+12425549500',
  email: 'mowmv@hotmail.com',
  restaurantPhone: '(242) 554-9134',
  restaurantTel: '+12425549134',
  rates: 'https://www.manowarmarinavillage.com/_files/ugd/0b3c23_d163829ea9184f5f9c0444129b450dbf.pdf',
  instagram: 'https://www.instagram.com/manowarmarina/',
  facebook: 'https://www.facebook.com/p/Man-O-War-Marina-Village-100090702221315/',
}

export const LIMITS = { loa: 120, beam: 20, draft: 7 }

const wix = (id: string, ext = 'jpg') => (w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/${id}~mv2.${ext}`

export const PHOTO = {
  dusk: { src: wix('0b3c23_fe4056ccc3bf4942b06afd5b77b81bb2'), w: 3024, h: 4032, alt: 'The marina dock running out to the sun setting over the harbour, a NOW OPEN flag beside it' },
  walk: { src: wix('0b3c23_8644da714b4c437e8e7cbf5070c31817'), w: 3024, h: 4032, alt: 'White-railed boardwalk along the docks to the Dock N’ Dine building under a clear blue sky' },
  flag: { src: wix('0b3c23_dfa1ef9bf2204ee5949ef9c5d0f6c4dd'), w: 3024, h: 4032, alt: 'A finger dock reaching into clear harbour water on a bright morning' },
  shop: { src: wix('0b3c23_07d680b9e44048aaac78806ae00244f2'), w: 3024, h: 4032, alt: 'Inside the office and gift shop: custom shirts and local goods under a timber roof' },
  porch: { src: wix('0b3c23_6bc8e1ba5247465aa4ecd2c150aa6f1e'), w: 3024, h: 4032, alt: 'The covered porch of Dock N’ Dine with a blue table looking out over the harbour' },
  sign: { src: wix('0b3c23_5ee2be2f41934c34acf94d9f6436b3c3', 'png'), w: 2048, h: 1536, alt: 'The Man-O-War Marina sign on its piling among sailboats at their slips' },
}
