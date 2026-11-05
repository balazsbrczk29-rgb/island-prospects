export const I = "https://pigeoncaybahamas.com/wp-content/uploads/2018/03/"
export type Cottage = { id: string; name: string; guests: number; beds: string; rate: number; kitchen: string; imgs: string[] }
export const COTTAGES: Cottage[] = [
  { id: "sea-studio", name: "Sea Studio", guests: 2, beds: "Queen bed", rate: 225, kitchen: "Kitchenette", imgs: ["sea-studio1.jpg", "sea-studio2.jpg", "sea-studio3.jpg"] },
  { id: "garden-view", name: "Garden View", guests: 2, beds: "Queen bed", rate: 215, kitchen: "Full kitchen", imgs: ["garden-view1.jpg", "garden-view2.jpg", "garden-view3.jpg"] },
  { id: "hibiscus", name: "Hibiscus", guests: 2, beds: "Queen bed", rate: 215, kitchen: "Full kitchen", imgs: ["hibicus1.jpg", "hibicus2.jpg", "hibicus4.jpg"] },
  { id: "little-house", name: "Little House", guests: 2, beds: "Queen bed", rate: 250, kitchen: "Full kitchen", imgs: ["little-house1.jpg", "little-house2.jpg"] },
  { id: "winston", name: "Winston Cottage", guests: 2, beds: "Queen bed", rate: 250, kitchen: "Full kitchen", imgs: ["winston-cottage1.jpg", "winston-cottage2.jpg", "winston-cottage3.jpg"] },
  { id: "oleander", name: "Oleander", guests: 4, beds: "Queen bed and two twins", rate: 315, kitchen: "Full kitchen", imgs: ["oleander-img1.jpg", "oleander-img2.jpg", "oleander-img3.jpg", "oleander-img4.jpg"] },
  { id: "casuarina", name: "Casuarina", guests: 4, beds: "A queen bed in each bedroom", rate: 325, kitchen: "Full kitchen", imgs: ["causarina1.jpg", "causarina2.jpg", "causarina3.jpg", "causarina4.jpg"] },
  { id: "big-house", name: "Big House", guests: 6, beds: "King, queen and two twin beds", rate: 425, kitchen: "Full kitchen", imgs: ["big-house-img1.jpg", "big-house-img2.jpg", "big-house-img3.jpg", "big-house-img4.jpg"] },
]
export const INCLUDED = ["Air conditioning and ceiling fans", "Refrigerator, coffee and tea maker", "Bottled water in the cottage", "Housekeeping", "Hair dryer, extra towels and bedding", "Shower bath", "Ocean view outdoor sitting", "Cribs available, iron on request"]
export const FEES = { breakfast: 18, dinner: 35, gratuity: 0.15, vat: 0.10, levy: 0.06, taxiRT: 120, taxiOW: 60 }
