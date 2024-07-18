import Card from "../../components/Card/Card";
import './AuthPage.css'
import TaskifyInputField from "../../components/TaskifyInputField/TaskifyInputField";
import { AuthTypes, InputType, UserLoginResponse } from "../../types/types";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { ChangeEvent, useEffect, useState } from "react";
import { loginUser, registerUser, requestPasswordReset } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD_PAGE_ROUTE, TASKS_PAGE_ROUTE } from "../../constants/routes.constants";
import { TOKEN_KEY } from "../../constants/storage.constants";
import { AuthPageProps } from "../../types/propTypes";
import { EMAIL_REGEX } from "../../constants/regex.constants";
import { useDispatch } from "react-redux";
import { setUserData } from "../../context/userSlice";

export default function AuthPage({
    authType
}: AuthPageProps) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [inProgress, setInProgress] = useState(false)
    const [canLogin, setCanLogin] = useState(false)
    const [inputState, setInputState] = useState({
        username: {
            value: "",
            helperText: ""
        },
        password: {
            value: "",
            helperText: ""
        },
        email: {
            value: "",
            helperText: ""
        }
    })
    const [authPageData, setAuthPageData] = useState({
        title: '',
        haveAccountText: '',
        haveAccountButton: '',
        authButtonText: ''
    })

    useEffect(() => {
        if (authType !== null) {
            switch (authType) {
                case AuthTypes.LOGIN: {
                    setAuthPageData({
                        title: 'Login',
                        haveAccountText: "Don't have an account?",
                        haveAccountButton: "Register",
                        authButtonText: "Login"
                    })
                    break
                }

                case AuthTypes.REGISTER: {
                    setAuthPageData({
                        title: 'Create an Account',
                        haveAccountText: "Already have an account?",
                        haveAccountButton: "Login",
                        authButtonText: "Register"
                    })
                    break
                }

                case AuthTypes.FORGOT_PASSWORD: {
                    setAuthPageData({
                        title: 'Forgot Password',
                        haveAccountText: '',
                        haveAccountButton: 'Back',
                        authButtonText: 'Reset Password'
                    })
                    break
                }

                default: {
                    setAuthPageData({
                        title: 'Create New Password',
                        haveAccountText: '',
                        haveAccountButton: 'Back',
                        authButtonText: 'Create Password'
                    })
                }
            }
        }
    }, [authType])

    useEffect(() => {
        setCanLogin(
            (inputState.username.value !== "" && inputState.password.value !== "") ||
            (inputState.email.value !== "" && EMAIL_REGEX.test(inputState.email.value))
        )
    }, [inputState.username.value, inputState.password.value, inputState.email.value])

    async function authButtonClick() {
        async function getAuthRequest(): Promise<UserLoginResponse> {
            switch (authType) {
                case AuthTypes.LOGIN: return await loginUser(inputState.username.value, inputState.password.value)
                case AuthTypes.REGISTER: return await registerUser(inputState.username.value, inputState.password.value)
                case AuthTypes.FORGOT_PASSWORD: return await requestPasswordReset(inputState.email.value)
                default: return new Promise((_resolve, _reject) => {  })
            }
        }

        function performAuthSuccess(response: UserLoginResponse) {
            switch (authType) {
                case AuthTypes.LOGIN:
                case AuthTypes.REGISTER: {
                    const { id, username, createdAt, email } = response.user
                    dispatch(setUserData({ id, username, createdAt, email }))
                    localStorage.setItem(TOKEN_KEY, response.token)
                    navigate(TASKS_PAGE_ROUTE)
                    break
                }
                case AuthTypes.FORGOT_PASSWORD: {
                    setAuthPageData({
                        title: 'Check your email',
                        haveAccountText: '',
                        haveAccountButton: '',
                        authButtonText: 'Back'
                    })
                    break
                }
                default: return new Promise((_resolve, _reject) => { })
            }
        }

        setInProgress(true)
        try {
            const response = await getAuthRequest()
            performAuthSuccess(response)
        } catch (error) {
            console.log(error)
        } finally {
            setInProgress(false)
        }
    }

    function handleInputValueChange(event: ChangeEvent<HTMLInputElement>) {
        setInputState(prev => ({
            ...prev,
            [event.target.name]: {
                helperText: "",
                value: event.target.value
            }
        }))
    }

    function renderForm() {
        switch (authType) {
            case AuthTypes.LOGIN:
            case AuthTypes.REGISTER: {
                return <>
                    <div className="auth-form-username-field">
                        <TaskifyInputField
                            value={inputState.username.value}
                            id="username"
                            name="username"
                            label="Username"
                            type={InputType.TEXT}
                            isError={inputState.username.helperText !== ""}
                            helperText={inputState.username.helperText}
                            onInputChange={handleInputValueChange}
                        />
                        {authType === AuthTypes.LOGIN && <div onClick={() => navigate(FORGOT_PASSWORD_PAGE_ROUTE)} className="auth-form-forgot-password">Forgot Password?</div>}
                    </div>
                    <TaskifyInputField
                        value={inputState.password.value}
                        id="password"
                        name="password"
                        label="Password"
                        type={InputType.PASSWORD}
                        isError={inputState.password.helperText !== ""}
                        helperText={inputState.password.helperText}
                        onInputChange={handleInputValueChange}
                    />
                </>
            }

            case AuthTypes.FORGOT_PASSWORD: {
                return <>
                    <p className="forgot-password-description">
                        Enter your password to receive a reset password link to your email
                    </p>
                    <TaskifyInputField
                        value={inputState.email.value}
                        id="email"
                        name="email"
                        label="Email"
                        type={InputType.EMAIL}
                        isError={inputState.email.helperText !== ""}
                        helperText={inputState.email.helperText}
                        onInputChange={handleInputValueChange}
                    />
                </>
            }
        }
    }

    function getHaveAccountButtonClickHandler() {
        if (authType === AuthTypes.REGISTER || authType === AuthTypes.LOGIN) {
            return () => navigate(authType === AuthTypes.REGISTER ? "/login" : '/register')
        }

        return () => navigate(-1)
    }

    return (
        <div className="auth-page-container">
            <Card>
                <div className="auth-card">
                    <div className="auth-title">{authPageData.title}</div>
                    <form onSubmit={e => e.preventDefault()} className="auth-form">
                        {renderForm()}
                        <div className="auth-page-have-account-button">
                            <div className="auth-page-have-account-button-label">
                                {authPageData.haveAccountText}
                            </div>
                            <div onClick={getHaveAccountButtonClickHandler()} className="auth-page-have-account-button-button">
                                {authPageData.haveAccountButton}
                            </div>
                        </div>

                        <LoaderButton
                            className="auth-button"
                            text={authPageData.authButtonText}
                            isLoading={inProgress}
                            onClick={authButtonClick}
                            renderAsButton={true}
                            isDisabled={!canLogin}
                        />
                    </form>
                </div>
            </Card>
        </div>
    )
}