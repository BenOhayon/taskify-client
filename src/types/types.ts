
export interface Task {
    id: string,
    text: string
}

export interface RawTask {
    id: string,
    text: string
}

export interface RawUser {
    id: string,
    username: string,
    password?: string,
    created_at?: number,
    email: string
}

export type User = {
    id: string,
    username: string,
    password?: string,
    createdAt?: number,
    email: string
}

export type UserSliceData = Omit<User, 'password'>

export interface EnvironmentConfiguration {
    baseUrl?: string
}

export interface RequestOptions {
    headers?: object,
    body?: object,
    queryParams?: object
}

export interface PageConfigMapper {
    [key: string]: PageConfig
}

export interface PageConfig {
    styles: object
}

export interface UserLoginResponse {
    token: string,
    user: User
}

export enum HttpMethods { GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE' }

export enum InputType {
    TEXT = 'text',
    PASSWORD = 'password',
    DATE = 'date',
    TIME = 'time',
    NUMBER = 'number',
    EMAIL = 'email'
}

export enum AuthTypes { REGISTER, LOGIN, FORGOT_PASSWORD, CREATE_NEW_PASSWORD }

export type InfoDialogOptions = {
    title: string,
    contentText: string
}

export type ConfirmDialogOptions = InfoDialogOptions & {
    rightButtonText: string,
    leftButtonText: string,
    rightButtonClickHandler: () => void,
    leftButtonClickHandler?: () => void
}