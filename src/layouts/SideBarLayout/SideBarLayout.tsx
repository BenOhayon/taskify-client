import { useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { PAGES_CONFIG, SIDEBAR_MINIMIZED_WIDTH_PX, SIDEBAR_WIDTH_PX } from '../../constants/general.constants'
import { SideBarLayoutProps } from '../../types/propTypes'
import './SideBarLayout.css'
import AuthLayout from '../AuthLayout/AuthLayout'

export default function SideBarLayout({
    children
}: SideBarLayoutProps) {
    const [isMinimized, setIsMinimized] = useState(false)
    
    function toggleSidebarMinimize() {
        setIsMinimized(prev => !prev)
    }

    return (
        <AuthLayout>
            <div className='sidebar-layout'>
                <SideBar
                    isMinimized={isMinimized}
                    toggleSidebarMinimize={toggleSidebarMinimize}
                />
                <div className="sidebar-layout-content" style={{
                    ...PAGES_CONFIG[window.location.pathname].styles,
                    width: `calc(${window.innerWidth} - ${isMinimized ? SIDEBAR_MINIMIZED_WIDTH_PX : SIDEBAR_WIDTH_PX}px)`
                }}>
                    {children}
                </div>
            </div>
        </AuthLayout>
    )
}