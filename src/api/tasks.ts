import environment from "../config";
import { API_ROUTE, NEW_ROUTE, TASKS_ROUTE } from "../constants/apis.constants";
import { parseTask } from "../parsers/data.parsers";
import { HttpMethods, RawTask, Task } from "../types/types";
import { authRequest } from "../utils/apiUtils";

const baseUrl = environment.baseUrl + API_ROUTE + TASKS_ROUTE

export function fetchAllTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
        const url = baseUrl
    
        authRequest(url, HttpMethods.GET, {})
            .then(tasks => {
                resolve(tasks.map((task: RawTask) => parseTask(task)))
            })
            .catch(reject)
    })
}

export function fetchTaskById(taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
        const url = `${baseUrl}/${taskId}`
    
        authRequest(url, HttpMethods.GET, {})
            .then(task => {
                resolve(parseTask(task))
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
                resolve(parseTask(task))
            })
            .catch(reject)
    })
}

export function deleteTaskById(taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
        const url = `${baseUrl}/${taskId}`
    
        authRequest(url, HttpMethods.DELETE, {})
            .then(task => {
                resolve(parseTask(task))
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
                resolve(parseTask(newTask))
            })
            .catch(reject)
    })
}