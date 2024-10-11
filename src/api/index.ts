import { AxiosInstance } from 'axios'
import { FlattenObjectKeys } from "../types/utility/objects";
import createProductsApi from './products';
import createCartApi from './cart';


export function createApi(http: AxiosInstance) {
    return {
        products: createProductsApi(http),
        cart: createCartApi(http)
    }
}

export type TApiInstance = ReturnType<typeof createApi>;
export type TApiInstanceKeys = FlattenObjectKeys<TApiInstance, true>

