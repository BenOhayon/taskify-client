import { RawTask, RawUser, Task } from "../types/types";

export function parseTask(task: RawTask): Task {
    return {
        id: task?.id ?? "",
        text: task?.text ?? ""
    }
}

export function parseUser(user: RawUser) {
    return {
        id: user?.id ?? "",
        createdAt: user?.created_at ?? new Date().getTime(),
        username: user?.username ?? "",
        email: user?.email ?? ""
    }
}