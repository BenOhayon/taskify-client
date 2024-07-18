import { PAGES_CONFIG } from '../../constants/general.constants'
import { BaseLayoutProps } from '../../types/propTypes'
import './BaseLayout.css'

export default function BaseLayout({
    children
}: BaseLayoutProps) {
    return (
        <div className='base-layout' style={PAGES_CONFIG[window.location.pathname].styles}>
            {children}
        </div>
    )
}