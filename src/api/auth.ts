import environment from "../config";
import { API_ROUTE, AUTH_ROUTE, FORGOT_PASSWORD_RESET_ROUTE, LOGIN_ROUTE, PASSWORD_RESET_ROUTE, REGISTER_ROUTE } from "../constants/apis.constants";
import { parseUser } from "../parsers/data.parsers";
import { HttpMethods, UserLoginResponse } from "../types/types";
import { request } from "../utils/apiUtils";

const baseUrl = environment.baseUrl + API_ROUTE + AUTH_ROUTE

export async function loginUser(username: string, password: string): Promise<UserLoginResponse> {
    const options = {
        body: {
            username,
            password
        }
    }
    const url = `${baseUrl}${LOGIN_ROUTE}`

    const response = await request(url, HttpMethods.POST, options)
    response.user = parseUser(response.user)
    return response
}

export async function registerUser(username: string, password: string): Promise<UserLoginResponse> {
    const options = {
        body: {
            username,
            password
        }
    }
    const url = `${baseUrl}${REGISTER_ROUTE}`

    const response = await request(url, HttpMethods.POST, options)
    response.user = parseUser(response.user)
    return response
}

export async function requestPasswordReset(email: string) {
    const options = {
        body: {
            email
        }
    }

    const url = `${baseUrl}${FORGOT_PASSWORD_RESET_ROUTE}`

    return await request(url, HttpMethods.POST, options)
}

export async function resetPassword(email: string, newPassword: string) {
    const options = {
        body: {
            email,
            newPassword
        }
    }

    const url = `${baseUrl}${PASSWORD_RESET_ROUTE}`

    return await request(url, HttpMethods.PUT, options)
}