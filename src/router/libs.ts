import { RouteObject } from "react-router-dom";
import routes from ".";

export function recordToNative(route: RouteRecord): RouteObject {
    const { children, ...copy } = route;
    const res: RouteObject = copy;

    if (children) {
        res.children = Object.values(children).map(recordToNative);
    }

    return res;
}

export type RouteRecord = Omit<RouteObject, 'children' | 'path'> & {
    path: string,
    children?: RouteRecords
}

export type RouteRecords = Record<string, RouteRecord>





export type TRoutes = typeof routes
export type TRoutesNames = GenerateRoutesNames<TRoutes>

export type GenerateRoutesNames<T extends RouteRecords, K = keyof T> =
    K extends string ?
    T[K] extends { children: RouteRecords } ?
    `${K}.${GenerateRoutesNames<T[K]['children']>}` | `${K}`
    : `${K}`
    : never



export function getRouteByName<T extends TRoutesNames>(schema: T): GetRouteByName<TRoutes, T> {
    return schema.split('.').reduce((t: any, k) => {
        return t.children[k]
    }, { children: routes })
}


export type GetRouteByName<O extends RouteRecords, N extends string> =
    N extends `${infer R1}.${infer R2}`
    ? O[R1] extends { children: RouteRecords }
    ? GetRouteByName<O[R1]['children'], R2>
    : never
    : N extends keyof O ?
    O[N] :
    never






