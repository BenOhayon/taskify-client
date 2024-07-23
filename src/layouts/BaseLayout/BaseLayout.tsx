import { AUTH_PAGE, PAGES_CONFIG } from '../../constants/general.constants'
import { CREATE_NEW_PASSWORD_PAGE_ROUTE, FORGOT_PASSWORD_PAGE_ROUTE, LOGIN_PAGE_ROUTE, REGISTER_PAGE_ROUTE } from '../../constants/routes.constants'
import { BaseLayoutProps } from '../../types/propTypes'
import './BaseLayout.css'

export default function BaseLayout({
    children
}: BaseLayoutProps) {

    function normalizePathname(pathname: string) {
        switch (pathname) {
            case LOGIN_PAGE_ROUTE:
            case REGISTER_PAGE_ROUTE:
            case FORGOT_PASSWORD_PAGE_ROUTE:
            case CREATE_NEW_PASSWORD_PAGE_ROUTE:
                return AUTH_PAGE

            default: return pathname
        }
    }

    return (
        <div className='base-layout' style={PAGES_CONFIG[normalizePathname(window.location.pathname)].styles}>
            {children}
        </div>
    )
}