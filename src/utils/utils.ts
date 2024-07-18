import { v4 as uuid } from 'uuid'
import { KeyboardEvent } from 'react'


function generateUID() {
    return uuid()
}

export function generateTaskId() {
    return 'Task_' + generateUID()
}

export function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>, handleInput: Function) {
    if (e.key === 'Enter') {
        handleInput()
    }
}