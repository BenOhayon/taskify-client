import axios from "axios";
import { HttpMethods, RequestOptions } from "../types/types";
import { TOKEN_KEY } from "../constants/storage.constants";

export function request(url: string, method: HttpMethods, options: RequestOptions): Promise<any> {
    function getQueryParamsString() {
        if (!options?.queryParams) {
            return ''
        }

        let queryParamsString = '?'
        Object.entries(options.queryParams).forEach(([key, value]) => {
            queryParamsString += `${key}=${value}&`
        })
        return queryParamsString.slice(0, queryParamsString.length - 1)
    }

    return new Promise((resolve, reject) => {
        axios.request({
            url: url + getQueryParamsString(),
            method,
            data: options?.body,
            headers: options?.headers
        })
            .then(axiosResponse => {
                const response = axiosResponse.data
                if (response?.status) {
                    resolve(response?.data)
                } else {
                    reject(response?.errorMessage)
                }
            })
            .catch(reject)
    })
}

export function authRequest(url: string, method: HttpMethods, options: RequestOptions) {
    const token = localStorage.getItem(TOKEN_KEY)
    options.headers = {
        'Authorization': `Bearer ${token}`
    }
    return request(url, method, options)
}