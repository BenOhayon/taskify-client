
export default class LocalStorage {

    static getItem(key: string): string | null {
        return localStorage.getItem(key)
    }

    static setItem(key: string, value: any) {
        localStorage.setItem(key, value)
    }

    static removeItem(key: string) {
        localStorage.removeItem(key)
    }

    static clearLocalStorage() {
        localStorage.clear()
    }
}