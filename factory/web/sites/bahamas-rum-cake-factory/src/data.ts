const F = "https://thebahamasrumcakefactory.com/cdn/shop/files/"
export const STORE = "https://thebahamasrumcakefactory.com/"
export const IMG = {
  hero: `${F}20oz_bundt_original.png?v=1766596271&width=1200`,
  beach: `${F}6pack_4oz_Pineapple_Beach_SoGood.png?v=1787842340&width=1600`,
  friends: `${F}6pack_4oz_Pineapple_2girls_SoGood.png?v=1787844886&width=1600`,
  six: `${F}Six_Pack_Mixed.png?v=1766589573&width=800`,
  shop: `${F}IMG_5312.jpg?v=1770928005&width=900`,
}
export const FLAVOURS: { name: string; note: string; img: string; seasonal?: boolean }[] = [
  { name: "Original", note: "George Bates's recipe, the one that started the shop in 2000.", img: `${F}20oz_bundt_original.png?v=1766596271&width=700` },
  { name: "Original with pecans", note: "", img: `${F}20oz_bundt_original_with_pecans.png?v=1766596261&width=700` },
  { name: "Pineapple", note: "", img: `${F}20oz_bundt_pineapple.png?v=1766596103&width=700` },
  { name: "Pina colada", note: "", img: `${F}20oz_bundt_pina_colada.png?v=1766596116&width=700` },
  { name: "Coconut", note: "", img: `${F}20oz_bundt_coconut.png?v=1771538307&width=700` },
  { name: "Banana", note: "", img: "" },
  { name: "Chocolate", note: "", img: `${F}20oz_bundt_chocolate.png?v=1766596159&width=700` },
  { name: "Caramel Caribbean", note: "", img: `${F}20oz_bundt_caramel.png?v=1766596224&width=700` },
  { name: "Key lime", note: "", img: "" },
  { name: "Amaretto", note: "", img: `${F}20oz_bundt_amaretto.png?v=1766596250&width=700` },
  { name: "Irish cream", note: "", img: `${F}20oz_bundt_irish_cream.png?v=1766596144&width=700` },
  { name: "Kentucky bourbon", note: "", img: `${F}20oz_bundt_kentucky_bourbon.png?v=1766596132&width=700` },
  { name: "Strawberry", note: "", img: `${F}20oz_bundt_strawberry.png?v=1766587204&width=700` },
  { name: "Pumpkin spice", note: "Listed in the current range.", img: `${F}20oz_bundt_pumpkin_spice.png?v=1766595762&width=700`, seasonal: true },
]
