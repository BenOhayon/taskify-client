import TaskifyDialog from '../TaskifyDialog/TaskifyDialog'
import { TaskFormDialogProps } from '../../types/propTypes'
import { TaskFormType } from '../../types/types'
import TaskifyInputField from '../../components/TaskifyInputField/TaskifyInputField'
import { ChangeEvent, useState } from 'react'
import './TaskFormDialog.css'

export default function TaskFormDialog({
    isOpen,
    handleDialogClose = () => { },
    mode,
    task
}: TaskFormDialogProps) {
    const [taskFormState, setTaskFormState] = useState({
        title: mode === TaskFormType.CREATE ? '' : task?.title,
        description: mode === TaskFormType.CREATE ? '' : task?.description,
    })

    function changeTaskFormInput(e: ChangeEvent<HTMLInputElement>) {
        setTaskFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <TaskifyDialog
            isOpen={isOpen}
            handleDialogClose={handleDialogClose}
            dialogLayout={
                <div className='task-form-dialog'>
                    <div className="task-form-dialog-title">{mode === TaskFormType.CREATE ? "Create" : "Edit"} a task</div>
                    <div className='task-form'>
                        <TaskifyInputField
                            label="Title"
                            value={taskFormState.title}
                            onInputChange={changeTaskFormInput}
                        />
                        <TaskifyInputField
                            label="Description"
                            multiline={true}
                            value={taskFormState.description}
                            onInputChange={changeTaskFormInput}
                        />
                    </div>
                    <div className="task-form-actions">
                        <div  className="task-form-save-button task-form-button task-primary-form-button">{mode === TaskFormType.CREATE ? 'Create' : 'Save'}</div>
                        <div onClick={handleDialogClose} className="task-form-cancel-button task-form-button task-secondary-form-button">Cancel</div>
                    </div>
                </div>
            }
        />
    )
}
