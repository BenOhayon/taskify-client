import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TasksPage from './pages/TasksPage/TasksPage'
import SideBarLayout from './layouts/SideBarLayout/SideBarLayout'
import {
	FORGOT_PASSWORD_PAGE_ROUTE,
	HOME_PAGE_ROUTE,
	LOGIN_PAGE_ROUTE,
	REGISTER_PAGE_ROUTE,
	SETTINGS_PAGE_ROUTE,
	TASKS_PAGE_ROUTE
} from './constants/routes.constants'
import HomePage from './pages/HomePage/HomePage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import BaseLayout from './layouts/BaseLayout/BaseLayout'
import PageWrapper from './components/PageWrapper/PageWrapper'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import { Provider } from 'react-redux'
import { store } from './context/store'
import DialogContext from './context/DialogContext/DialogContext'

export default function App() {
	return (
		<Provider store={store}>
			<DialogContext>
				<BrowserRouter>
					{/* TODO Replace Route element with RouteWrapper element. */}
					<Routes>
						<Route
							path={HOME_PAGE_ROUTE}
							element={
								<PageWrapper
									page={HomePage}
									layout={SideBarLayout}
								/>
							}
						/>
						<Route
							path={SETTINGS_PAGE_ROUTE}
							element={
								<PageWrapper
									page={SettingsPage}
									layout={SideBarLayout}
								/>
							}
						/>
						<Route
							path={TASKS_PAGE_ROUTE}
							element={
								<PageWrapper
									page={TasksPage}
									layout={SideBarLayout}
								/>
							}
						/>
						<Route
							path={LOGIN_PAGE_ROUTE}
							element={
								<PageWrapper
									page={LoginPage}
									layout={BaseLayout}
								/>
							}
						/>
						<Route
							path={REGISTER_PAGE_ROUTE}
							element={
								<PageWrapper
									page={RegisterPage}
									layout={BaseLayout}
								/>
							}
						/>
						<Route
							path={FORGOT_PASSWORD_PAGE_ROUTE}
							element={
								<PageWrapper
									page={ForgotPasswordPage}
									layout={BaseLayout}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</DialogContext>
		</Provider>
	)
}