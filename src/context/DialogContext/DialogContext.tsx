import { createContext, useContext, useState } from 'react'
import { DialogContextProps } from '../../types/propTypes'
import InfoDialog from '../../dialogs/InfoDialog/InfoDialog'
import ConfirmDialog from '../../dialogs/ConfirmDialog/ConfirmDialog'

const initialInfoDialogState = {
    title: "",
    isOpen: false,
    contentText: "",
    handleDialogClose: () => { }
}

const initialConfirmDialogState = {
    title: "",
    isOpen: false,
    contentText: "",
    handleDialogClose: () => { },
    leftButtonText: "",
    leftButtonClickHandler: () => { },
    rightButtonText: "",
    rightButtonClickHandler: () => { }
}

const Context = createContext({
    showInfoDialog: (_title: string, _contentText: string) => { },
    showConfirmDialog: (_title: string, _contentText: string, _rightButtonText: string, _rightButtonClickHandler: () => void, _leftButtonText: string, _leftButtonClickHandler?: () => void) => { }
})

export function useDialogContext() {
    return useContext(Context)
}

export default function DialogContext({
    children
}: DialogContextProps) {

    const [infoDialogState, setInfoDialogState] = useState(initialInfoDialogState)
    const [confirmDialogState, setConfirmDialogState] = useState(initialConfirmDialogState)

    function closeInfoDialog() {
        setInfoDialogState(prev => ({
            ...prev,
            isOpen: false
        }))
    }

    function closeConfirmDialog() {
        setConfirmDialogState(prev => ({
            ...prev,
            isOpen: false
        }))
    }

    function showInfoDialog(
        title: string,
        contentText: string
    ) {
        setInfoDialogState({
            isOpen: true,
            handleDialogClose: closeInfoDialog,
            title,
            contentText
        })
    }

    function showConfirmDialog(
        title: string,
        contentText: string,
        rightButtonText: string,
        rightButtonClickHandler: () => void,
        leftButtonText: string,
        leftButtonClickHandler: () => void = closeConfirmDialog,
    ) {
        setConfirmDialogState({
            isOpen: true,
            handleDialogClose: closeConfirmDialog,
            title,
            contentText,
            leftButtonText,
            leftButtonClickHandler,
            rightButtonText,
            rightButtonClickHandler
        })
    }

    return (
        <Context.Provider value={{ showInfoDialog, showConfirmDialog }}>
            <InfoDialog
                title={infoDialogState.title}
                isOpen={infoDialogState.isOpen}
                handleDialogClose={closeInfoDialog}
                contentText={infoDialogState.contentText}
            />

            <ConfirmDialog
                title={confirmDialogState.title}
                isOpen={confirmDialogState.isOpen}
                handleDialogClose={closeConfirmDialog}
                contentText={confirmDialogState.contentText}
                leftButtonText={confirmDialogState.leftButtonText}
                leftButtonClickHandler={confirmDialogState.leftButtonClickHandler}
                rightButtonText={confirmDialogState.rightButtonText}
                rightButtonClickHandler={confirmDialogState.rightButtonClickHandler}
            />
            {children}
        </Context.Provider>
    )
}
