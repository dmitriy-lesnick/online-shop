
export type TProduct = {
    id: number
    price: number
    rest?: number
    title: string
}

export type TCart = TCartItem[]

export type TCartItem = {
    id: number,
    cnt: number
}

export type TCartLoadResponse = {
    cart: TCart
    needUpdate: boolean
    token: string
}



