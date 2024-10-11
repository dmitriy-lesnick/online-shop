import { GetRouteByName, RouteRecord, TRoutes, TRoutesNames } from "../router/libs";

export type InferRouteParams<N extends TRoutesNames, R = GetRouteByName<TRoutes, N>> =
    R extends RouteRecord
    ? SplitRoutePathToParams<R['path']>
    : never

export type ValidRouteParam = string | number;


type SplitRoutePathToParams<P extends string> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    P extends `${infer _R1}:${infer R2}`
    ? [ValidRouteParam, ...SplitRoutePathToParams<R2>]
    : []





