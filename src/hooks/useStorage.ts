import { useContext } from "react";
import storeContext from "../context/store";


export default function useStorage() {
    let store = useContext(storeContext)

    if (store === null) {
        throw new Error('Some moron run system without store provider, please check who is it');
    }

    return store

}


