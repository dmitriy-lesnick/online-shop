import { AxiosInstance } from "axios";
import { TProduct } from "../types/types";


function createProductsApi(http: AxiosInstance) {
    return {
        async all() {
            let result = (await http.get<TProduct[]>('/products/index.php')).data
            return result
        },

        async one(id: number) {
            let result = (await http.get<TProduct>(`/products/index.php?id=${id}`)).data
            return result
        }
    }
}


export default createProductsApi



