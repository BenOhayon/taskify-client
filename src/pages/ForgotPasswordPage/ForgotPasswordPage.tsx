import { AuthTypes } from "../../types/types";
import AuthPage from "../AuthPage/AuthPage";

export default function ForgotPasswordPage() {
    return (
        <AuthPage authType={AuthTypes.FORGOT_PASSWORD} />
    )
}