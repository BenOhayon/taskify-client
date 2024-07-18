import { ChangeEvent, RefObject, ReactNode } from "react"
import { AuthTypes, InputType } from "./types"

interface HasChildren {
    children?: React.ReactNode
}

export interface TaskProps {
    id: string,
    content: string,
    onDelete?: (id: string) => void,
    onEdit?: (id: string, newValue: string) => void
}

export interface PageWrapperProps {
    page: React.FC,
    layout?: React.FC<{
        children?: React.ReactNode
    }>
}

export interface SideBarLayoutProps extends HasChildren {}
export interface BaseLayoutProps extends HasChildren {}
export interface AuthLayoutProps extends HasChildren {}

export interface CardProps extends HasChildren {}

export interface SideBarProps {
    isMinimized: boolean,
    toggleSidebarMinimize?: () => void
}

export interface TaskifyInputFieldProps {
    id?: string,
    name?: string,
    label: string,
    type?: InputType,
    isDisabled?: boolean,
    inputRef?: RefObject<HTMLInputElement> | null,
    value?: any,
    isError?: boolean,
    helperText?: string,
    stretch?: boolean,
    onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface LoaderButtonProps {
    className?: string,
    text: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    loaderArchColor?: string,
    renderAsButton?: boolean,
    onClick: () => void
}

export interface LoaderProps {
    widthPx?: number,
    heightPx?: number,
    loaderArchColor?: string,
    loaderColor?: string
}

export type AuthPageProps = {
    authType: AuthTypes
}

export type BaseDialogProps = {
    title: string,
    isOpen: boolean,
    handleDialogClose: () => void
}

export type InfoDialogProps = BaseDialogProps & {
    contentText: string
}

export type ConfirmDialogProps = BaseDialogProps & {
    contentText: string,
    leftButtonText: string,
    leftButtonClickHandler: () => void,
    rightButtonText: string,
    rightButtonClickHandler: () => void,
}

export type TaskifyDialogProps = BaseDialogProps & {
    title?: string,
    contentText?: string,
    leftActionButtonText?: string,
    rightActionButtonText?: string,
    leftActionButtonClickHandler?: () => void,
    rightActionButtonClickHandler?: () => void,
    dialogLayout?: ReactNode
}

export type DialogContextProps = HasChildren