import { MdEdit } from 'react-icons/md'
import { TaskProps } from '../../types/propTypes'
import './TaskComp.css'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useRef, useState } from 'react'
import { handleEnterKeyDown } from '../../utils/utils'
import { KeyboardEvent } from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'


export default function TaskComp({
    id,
    content,
    onDelete = () => { },
    onEdit = () => { }
}: TaskProps) {
    const [isEditing, setIsEditing] = useState(false)

    const editInputRef = useRef<HTMLInputElement>(null)

    function handleEditInput(e: KeyboardEvent<HTMLInputElement>) {
        if (editInputRef?.current && editInputRef?.current?.value !== '') {
            handleEnterKeyDown(e, applyEdit)
        }
    }

    function applyEdit() {
        if (editInputRef?.current) {
            onEdit(id, editInputRef?.current?.value)
        }
        setIsEditing(false)
    }

    return (
        <div className='task-container'>
            {
                isEditing ? <input ref={editInputRef} className='task-edit-input' type="text" defaultValue={content} onKeyDown={handleEditInput} /> : <div className="task-content">{content}</div>
            }
            <div className="task-operations">
                {
                    isEditing ? <IoCheckmarkCircleOutline className='task-apply-edit-button-image' onClick={applyEdit} /> : <>
                        <MdEdit className='task-button-image' onClick={() => setIsEditing(true)} />
                        <RiDeleteBin6Line className='task-button-image' onClick={() => onDelete(id)} />
                    </>
                }
            </div>
        </div>
    )
}