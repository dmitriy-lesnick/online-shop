import { makeAutoObservable, runInAction } from "mobx"
import { TApiInstance } from "../api"
import { TCart } from "../types/types"
import { RootStorage } from "."


class CartStorage {
    items: TCart = []
    token: string = ''
    cartApi
    localStrg
    rootStore
    isReady = true

    constructor(api: TApiInstance, localStrg: Storage, rootStore: RootStorage) {
        makeAutoObservable(this)
        this.cartApi = api.cart
        this.localStrg = localStrg
        this.rootStore = rootStore
    }

    get has() {
        return (id: number) => this.items.some(i => i.id === id)
    }

    get totalCnt() {
        return this.items.length
    }

    get totalPrice() {
        return this.items.reduce((total, i) => total + i.cnt * (this.rootStore.products.one(i.id)?.price || 0), 0)
    }

    get cnt() {
        return (id: number) => this.items.find(i => i.id === id)?.cnt ?? 0
    }



    async load() {
        if (this.rootStore.auth.authUser) {
            let tokenKey = `CART__${this.rootStore.auth.authUser?.name}`
            let { cart, token, needUpdate } = await this.cartApi.load(this.localStrg.getItem(tokenKey))
            if (needUpdate) {
                this.localStrg.setItem(tokenKey, token)
            }
            runInAction(() => {
                this.items = cart
                this.token = token
            })
        }

    }

    async add(id: number) {
        let res = await this.cartApi.add(this.token, id)
        if (res) {
            runInAction(() => {
                this.items.push({ id: id, cnt: 1 })
            })
        }
    }

    async remove(id: number) {
        let res = await this.cartApi.remove(this.token, id)
        if (res) {
            runInAction(() => {
                this.items = this.items.filter(i => i.id !== id)
            })
        }
    }

    async change(id: number, cnt: number) {
        this.isReady = false
        let res = await this.cartApi.change(this.token, id, cnt)
        if (res) {
            runInAction(() => {
                let item = this.items.find(i => i.id === id)
                item ? item.cnt = cnt : null
                this.isReady = true
            })

        }
    }

    async clean() {
        let res = await this.cartApi.clean(this.token)
        if (res) {
            runInAction(() => {
                this.items = []
            })
        }
    }

}


export default CartStorage