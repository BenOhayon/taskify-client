import { useEffect, useState } from 'react'
import './TasksPage.css'
import { Task, TaskFormType } from '../../types/types'
import TaskComp from '../../components/TaskComp/TaskComp'
import { deleteTaskById, fetchAllTasks, updateTaskById } from '../../api/tasks'
import Loader from '../../components/Loader/Loader'
import { IconButton } from '@mui/material'
import { FiPlusCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { RootState } from '../../context/store'
import TaskFormDialog from '../../dialogs/TaskFormDialog/TaskFormDialog'

export default function TasksPage() {
	const user = useSelector((state: RootState) => state.user)
	const [tasks, setTasks] = useState<Task[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [taskFormDialogState, setTaskFormDialogState] = useState({
		isOpen: false,
		handleDialogClose: hideTaskFormDialog,
		task: {
			id: '', 
			title: '', 
			description: '', 
			createdAt: -1,
			userId: '',
			done: false
		},
		mode: TaskFormType.CREATE
	})

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

	function showTaskFormDialog(task: Task, mode: TaskFormType) {
		setTaskFormDialogState({
			isOpen: true,
			handleDialogClose: hideTaskFormDialog,
			task,
			mode
		})
	}

	function hideTaskFormDialog() {
		setTaskFormDialogState(prev => ({
			...prev,
			isOpen: false
		}))
	}

	// function editTask(
	// 	id: string,
	// 	title: string,
	// 	description: string,
	// 	done: boolean
	// ) {
	// 	const updatedTaskData = {
	// 		id,
	// 		title,
	// 		description,
	// 		done
	// 	}
	// 	updateTaskById(id, updatedTaskData)
	// 	const updatedTasks = [...tasks]
	// 	const updatedTaskIndex = updatedTasks.findIndex(task => task?.id === id)
	// 	const updatedTask = updatedTasks[updatedTaskIndex]
	// 	if (updatedTask) {
	// 		updatedTask.title = title
	// 		updatedTask.description = description
	// 		updatedTask.done = done
	// 		updatedTasks.splice(updatedTaskIndex, 1, updatedTask)
	// 		setTasks(updatedTasks)
	// 	}
	// }

	return (
		<>
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
											task={task}
											onDelete={deleteTask}
											onEdit={task => showTaskFormDialog(task, TaskFormType.EDIT)}
										/>)
									}
								</div>
							</>
						}
					</>
				}
			</div>
			<TaskFormDialog 
				isOpen={taskFormDialogState.isOpen} 
				handleDialogClose={taskFormDialogState.handleDialogClose} 
				mode={taskFormDialogState.mode} 
				task={taskFormDialogState.task}		
			/>
		</>
	)
}
