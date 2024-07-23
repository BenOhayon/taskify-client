import './SideBar.css'
import { LuLayoutDashboard } from 'react-icons/lu'
import { GrTask } from 'react-icons/gr'
import { IoMdSettings } from 'react-icons/io'
import projectJson from '../../../package.json'
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, SETTINGS_PAGE_ROUTE, TASKS_PAGE_ROUTE } from '../../constants/routes.constants'
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5'
import { SideBarProps } from '../../types/propTypes'
import { SIDEBAR_MINIMIZED_WIDTH_PX, SIDEBAR_WIDTH_PX } from '../../constants/general.constants'
import { useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { TOKEN_KEY } from '../../constants/storage.constants'
import { useDialogContext } from '../../context/DialogContext/DialogContext'
import { useDispatch } from 'react-redux'
import { resetUserData } from '../../context/userSlice'

export default function SideBar({
    isMinimized,
    toggleSidebarMinimize
}: SideBarProps) {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const {
        showConfirmDialog
    } = useDialogContext()

    function logout() {
        dispatch(resetUserData())
        localStorage.removeItem(TOKEN_KEY)
        navigate(LOGIN_PAGE_ROUTE, { replace: true })
    }

    function onLoginButtonClick() {
        showConfirmDialog({
            title: "Are you sure?", 
            contentText: "Are you sure you want to logout?",
            rightButtonText: "Yes",
            rightButtonClickHandler: logout,
            leftButtonText: "No"
        })
    }

    return (
        <div className='sidebar-container' style={{ width: isMinimized ? SIDEBAR_MINIMIZED_WIDTH_PX : SIDEBAR_WIDTH_PX }}>
            {
                isMinimized ? <IoChevronForwardOutline className='sidebar-expand-minimize-button' onClick={toggleSidebarMinimize} /> : <IoChevronBack className='sidebar-expand-minimize-button' onClick={toggleSidebarMinimize} />
            }
            <div className="sidebar-upper">
                <div className={`sidebar-title ${isMinimized ? 'minimized' : ''}`}>{isMinimized ? 'T' : 'Taskify'}</div>
                <div className={`sidebar-buttons ${isMinimized ? 'minimized' : ''}`}>
                    <div className={`sidebar-button ${window.location.pathname === HOME_PAGE_ROUTE ? 'selected' : ''}`} onClick={() => navigate(HOME_PAGE_ROUTE)}>
                        <LuLayoutDashboard className='sidebar-button-image' />
                        {!isMinimized && <div className="sidebar-button-text">Home</div>}
                    </div>
                    <div className={`sidebar-button ${window.location.pathname === TASKS_PAGE_ROUTE ? 'selected' : ''}`} onClick={() => navigate(TASKS_PAGE_ROUTE)}>
                        <GrTask className='sidebar-button-image' />
                        {!isMinimized && <div className="sidebar-button-text">Tasks</div>}
                    </div>
                </div>
            </div>
            <div className="sidebar-lower">
                <div className={`sidebar-buttons lower-sidebar-buttons ${isMinimized ? 'minimized' : ''}`}>
                    <div className={`sidebar-button settings-sidebar-button ${window.location.pathname === SETTINGS_PAGE_ROUTE ? 'selected' : ''}`} onClick={() => navigate(SETTINGS_PAGE_ROUTE)}>
                        <IoMdSettings className='sidebar-button-image' />
                        {!isMinimized && <div className="sidebar-button-text">Settings</div>}
                    </div>
                    <div className={`sidebar-button settings-sidebar-button`} onClick={onLoginButtonClick}>
                        <BiLogOut className='sidebar-button-image' />
                        {!isMinimized && <div className="sidebar-button-text">Logout</div>}
                    </div>
                </div>
                <div className={`app-version-number ${isMinimized ? 'minimized' : ''}`}>{`v${projectJson.version}`}</div>
            </div>
        </div>
    )
}