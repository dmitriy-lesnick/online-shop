import axios from "axios";


function createHttpPlagin(baseURL: string) {
    const http = axios.create({
        baseURL,
        timeout: 10000
    })
    return http;
}

export default createHttpPlagin;






