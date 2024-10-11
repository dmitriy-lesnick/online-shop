import { createContext } from "react";
import { RootStorage } from "../storage";


const storeContext = createContext<RootStorage | null>(null)

export default storeContext