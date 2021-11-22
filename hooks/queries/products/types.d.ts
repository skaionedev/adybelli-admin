export interface IProduct {
  color_id: string
  createdAt: string
  gender: null | number
  image: string
  in_stock: boolean
  name: string
  name_ru: string
  on_sale: boolean
  price: null | string
  prod_id: string
  sale_price: number
  slug: string
  tm_id: number
  trademark: {
    createdAt: string
    logo: null | string
    title: string
    title_tr: string
    tm_id: number
    value: string
  }
}
