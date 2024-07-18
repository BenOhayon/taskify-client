import { Navigate } from "react-router-dom";
import { AuthLayoutProps } from "../../types/propTypes";
import { TOKEN_KEY } from "../../constants/storage.constants";
import { LOGIN_PAGE_ROUTE } from "../../constants/routes.constants";

export default function AuthLayout({
    children
}: AuthLayoutProps) {

    if (!localStorage.getItem(TOKEN_KEY)) {
        return <Navigate to={LOGIN_PAGE_ROUTE} />
    }

    return (
        <>
            {children}
        </>
    )
}