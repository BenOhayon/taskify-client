import { AuthTypes } from "../../types/types";
import AuthPage from "../AuthPage/AuthPage";

export default function LoginPage() {
    return (
        <AuthPage authType={AuthTypes.LOGIN} />
    )
}