import AuthPage from '../AuthPage/AuthPage'
import { AuthTypes } from '../../types/types'

export default function CreateNewPasswordPage() {
    return (
        <AuthPage authType={AuthTypes.CREATE_NEW_PASSWORD} />
    )
}
