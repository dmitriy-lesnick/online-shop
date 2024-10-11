import { makeAutoObservable } from "mobx"
import { TApiInstance } from "../api"
import { TProduct } from "../types/types"


class ProductsStorage {
    api: TApiInstance
    items: TProduct[] = []

    constructor(api: TApiInstance) {
        makeAutoObservable(this)
        this.api = api
    }

    get one() {
        return (id: number) => this.items.find(i => i.id === id)
    }

    async load() {
        let res = await this.api.products.all()
        if (res) {
            this.items = res
        }
    }

}

export default ProductsStorage 