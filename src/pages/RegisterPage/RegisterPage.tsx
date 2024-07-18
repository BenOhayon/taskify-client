import { AuthTypes } from '../../types/types'
import AuthPage from '../AuthPage/AuthPage'

export default function RegisterPage() {
    return (
        <AuthPage authType={AuthTypes.REGISTER} />
    )
}
