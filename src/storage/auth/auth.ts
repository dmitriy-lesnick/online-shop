import { makeAutoObservable, runInAction } from "mobx"
import usersData from "./usersData"
import { RootStorage } from ".."

type TAuthUser = {
    name: string
}


class AuthStorage {
    users
    authUser: TAuthUser | null = null
    localStrg
    key
    rootStorage
    isReady = true

    constructor(localStrg: Storage, rootStorage: RootStorage) {
        makeAutoObservable(this)
        this.users = usersData
        this.localStrg = localStrg
        this.key = 'AUTH__KEY'
        this.rootStorage = rootStorage

    }

    init(name?: string, pass?: string) {
        this.isReady = false
        if (name && pass) {
            if (this.users.some(u => u.name === name && u.password === pass)) {
                runInAction(() => {
                    this.localStrg.setItem(this.key, name)
                    this.authUser = { 'name': name }
                })
                return true
            } else {
                return false
            }
        } else {
            let res = this.localStrg.getItem(this.key)
            if (res) {
                runInAction(() => {
                    this.authUser = { 'name': res }
                })
            }
        }
        this.isReady = true
    }

    logout() {
        this.isReady = false
        runInAction(() => {
            this.localStrg.removeItem(this.key)
            this.rootStorage.cart.items = []
            this.authUser = null
            this.isReady = true
        })
    }
}

export default AuthStorage