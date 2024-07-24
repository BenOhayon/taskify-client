import environment from "../config";
import { API_ROUTE, NEW_ROUTE, TASKS_ROUTE, USER_ID_KEY } from "../constants/apis.constants";
import { HttpMethods, Task } from "../types/types";
import { authRequest } from "../utils/apiUtils";

const baseUrl = environment.baseUrl + API_ROUTE + TASKS_ROUTE

export function fetchAllTasks(userId: string): Promise<Task[]> {
    return new Promise((resolve, reject) => {
        const url = baseUrl + `?${USER_ID_KEY}=${userId}`
    
        authRequest(url, HttpMethods.GET, {})
            .then(tasks => {
                resolve(tasks)
            })
            .catch(reject)
    })
}

export function fetchTaskById(taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
        const url = `${baseUrl}/${taskId}`
    
        authRequest(url, HttpMethods.GET, {})
            .then(task => {
                resolve(task)
            })
            .catch(reject)
    })
}

export function updateTaskById(taskId: string, data: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
        const options = {
            body: {
                text: data?.text
            }
        }

        const url = `${baseUrl}/${taskId}`
    
        authRequest(url, HttpMethods.PUT, options)
            .then(task => {
                resolve(task)
            })
            .catch(reject)
    })
}

export function deleteTaskById(taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
        const url = `${baseUrl}/${taskId}`
    
        authRequest(url, HttpMethods.DELETE, {})
            .then(task => {
                resolve(task)
            })
            .catch(reject)
    })
}

export function createNewTask(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
        const options = {
            body: {
                text: task?.text
            }
        }
        const url = `${baseUrl}${NEW_ROUTE}`
    
        authRequest(url, HttpMethods.POST, options)
            .then(newTask => {
                resolve(newTask)
            })
            .catch(reject)
    })
}