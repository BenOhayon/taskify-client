import { MdEdit } from 'react-icons/md'
import { TaskProps } from '../../types/propTypes'
import './TaskComp.css'
import { RiDeleteBin6Line } from 'react-icons/ri'
import TaskifyCheckbox from '../TaskifyCheckbox/TaskifyCheckbox'
import { useState } from 'react'
import { IconButton } from '@mui/material'

export default function TaskComp({
    id,
    title,
    description,
    createdAt,
    done,
    onDelete = () => { },
    onEdit = () => { }
}: TaskProps) {

    const [isTaskDone, setIsTaskDone] = useState(done)

    function formatCreationDate() {
        return new Intl.DateTimeFormat('en-US').format(createdAt)
    }

    return (
        <div className={`task-container ${isTaskDone ? 'done' : ''}`}>
            <div className="task-upper-container">
                <div className="task-titles-container">
                    <div className="task-title">{title}</div>
                    <div className="task-created-at">Created at: {formatCreationDate()}</div>
                </div>
                <TaskifyCheckbox 
                    checked={isTaskDone}
                    setChecked={setIsTaskDone}
                />
            </div>
            <p className="task-description">{description}</p>
            <div className="task-operations">
                <IconButton onClick={() => onEdit(id)}>
                    <MdEdit className='task-button-image' />
                </IconButton>
                <IconButton onClick={() => onDelete(id)}>
                    <RiDeleteBin6Line className='task-button-image' />
                </IconButton>
            </div>
        </div>
    )
}