import { AxiosInstance } from "axios";
import { TCartLoadResponse } from "../types/types";


function createCartApi(http: AxiosInstance) {
    return {
        async load(token: string | null) {
            let result = (await http.get<TCartLoadResponse>(`/cart/load.php?token=${token}`)).data
            return result
        },

        async add(token: string, id: number) {
            let result: boolean = (await http.get(`/cart/add.php?token=${token}&id=${id}`)).data
            return result
        },

        async remove(token: string, id: number) {
            let result: boolean = (await http.get(`/cart/remove.php?token=${token}&id=${id}`)).data
            return result
        },

        async change(token: string, id: number, cnt: number) {
            let result: boolean = (await http.get(`/cart/change.php?token=${token}&id=${id}&cnt=${cnt}`)).data
            return result
        },

        async clean(token: string) {
            let result: boolean = (await http.get(`/cart/clean.php?token=${token}`)).data
            return result
        }


    }
}

export default createCartApi
