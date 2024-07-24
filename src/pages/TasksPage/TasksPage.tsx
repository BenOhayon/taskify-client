import { useEffect, useState } from 'react'
import './TasksPage.css'
import { Task } from '../../types/types'
import TaskComp from '../../components/TaskComp/TaskComp'
import { deleteTaskById, fetchAllTasks, updateTaskById } from '../../api/tasks'
import Loader from '../../components/Loader/Loader'
import { IconButton } from '@mui/material'
import { FiPlusCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { RootState } from '../../context/store'

export default function TasksPage() {
	const user = useSelector((state: RootState) => state.user)
	const [tasks, setTasks] = useState<Task[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchAllTasks(user.id)
			.then(tasks => setTasks(tasks))
			.catch(console.log)
			.finally(() => setIsLoading(false))
	}, [])

	function deleteTask(id: string) {
		deleteTaskById(id)
		setTasks(prev => prev.filter(task => task?.id !== id))
	}

	function editTask(id: string, newContent: string) {
		const updatedTaskData = {
			id: '',
			text: newContent
		}
		updateTaskById(id, updatedTaskData)
		const updatedTasks = [...tasks]
		const updatedTaskIndex = updatedTasks.findIndex(task => task?.id === id)
		const updatedTask = updatedTasks[updatedTaskIndex]
		if (updatedTask) {
			updatedTask.text = newContent
			updatedTasks.splice(updatedTaskIndex, 1, updatedTask)
			setTasks(updatedTasks)
		}
	}

	return (
		<div className='tasks-page-container'>
			{
				isLoading ? <div className='tasks-page-loader-container'>
					<Loader
						widthPx={40}
						heightPx={40}
					/>
				</div> : <>
					{
						tasks.length === 0 ? <div className="tasks-page-no-tasks">
							<h1 className="tasks-page-no-tasks-title">You have no tasks yet</h1>
							<div className="tasks-page-no-tasks-content">
								<div className="tasks-page-no-tasks-content-text">Click on the '+' to create your first task.</div>
								<IconButton onClick={() => { }}>
									<FiPlusCircle className='tasks-page-no-tasks-content-create-task-button' />
								</IconButton>
							</div>
						</div> : <>
							<div className="tasks-page-filter-section">

							</div>
							<div className="tasks-list">
								{
									tasks.map(task => <TaskComp
										key={task?.id}
										id={task?.id}
										content={task?.text}
										onDelete={deleteTask}
										onEdit={editTask}
									/>)
								}
							</div>
						</>
					}
				</>
			}
		</div>
	)
}
