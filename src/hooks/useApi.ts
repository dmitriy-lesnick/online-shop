import { useContext, useEffect, useState } from "react"
import apiContext from "../context/api"
import { TApiInstance, TApiInstanceKeys } from "../api"
import { getByDotKey, GetByDotKey, runFnWithTuple } from "../types/utility/objects";
import { TApiRequest } from "./types";



function useApi<T extends TApiInstanceKeys>(schema: T, ...args: Parameters<GetByDotKey<TApiInstance, T>>) {

    const api = useContext(apiContext);

    if (api === null) {
        throw new Error('Some moron run system without store provider, please check who is it');
    }

    const fn = getByDotKey(api, schema);

    type Res = Awaited<ReturnType<typeof fn>>;


    const [result, setResult] = useState<TApiRequest<Res>>({
        done: false,
        success: false,
        data: null,
        error: null
    });

    useEffect(() => {
        if (!result.done) {
            runFnWithTuple(fn, args)
                .then(data => setResult({
                    done: true,
                    success: true,
                    data: data as Res,
                    error: null
                }))
                .catch((e: Error) => setResult({
                    done: true,
                    success: false,
                    data: null,
                    error: e
                }))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return result;
}

export default useApi;