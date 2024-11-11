import environment from "../config";
import { API_ROUTE, NEW_ROUTE, TASKS_ROUTE, USER_ID_KEY } from "../constants/apis.constants";
import { HttpMethods, TaskData } from "../types/types";
import { authRequest } from "../utils/apiUtils";

const baseUrl = environment.baseUrl + API_ROUTE + TASKS_ROUTE

export async function fetchAllTasks(userId: string) {
    const url = baseUrl + `?${USER_ID_KEY}=${userId}`
    return await authRequest(url, HttpMethods.GET, {})
}

export async function fetchTaskById(taskId: string) {
    const url = `${baseUrl}/${taskId}`
    return await authRequest(url, HttpMethods.GET, {})
}

export async function updateTaskById(task: TaskData) {
    const options = {
        body: {
            title: task?.title,
            description: task?.description,
            done: task?.done
        }
    }
    const url = `${baseUrl}/${task?.id}`
    return await authRequest(url, HttpMethods.PUT, options)
}

export async function deleteTaskById(taskId: string) {
    const url = `${baseUrl}/${taskId}`
    return await authRequest(url, HttpMethods.DELETE, {})
}

export async function createNewTask(title: string, description: string, userId: string) {
    const options = {
        body: {
            title,
            description,
            userId
        }
    }
    const url = `${baseUrl}${NEW_ROUTE}`
    return await authRequest(url, HttpMethods.POST, options)
}