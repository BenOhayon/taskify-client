import { createContext, useContext, useState } from 'react'
import { DialogContextProps } from '../../types/propTypes'
import InfoDialog from '../../dialogs/InfoDialog/InfoDialog'
import ConfirmDialog from '../../dialogs/ConfirmDialog/ConfirmDialog'
import { ConfirmDialogOptions, InfoDialogOptions } from '../../types/types'

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
    showInfoDialog: (_dialogOptions: InfoDialogOptions) => { },
    showConfirmDialog: (_dialogOptions: ConfirmDialogOptions) => { }
})

export function useDialogContext() {
    return useContext(Context)
}

export default function DialogContext({
    children
}: DialogContextProps) {

    const [infoDialogState, setInfoDialogState] = useState(initialInfoDialogState)
    const [confirmDialogState, setConfirmDialogState] = useState({
        ...initialConfirmDialogState,
        leftButtonClickHandler: closeInfoDialog
    })

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

    function showInfoDialog(dialogOptions: InfoDialogOptions) {
        setInfoDialogState({
            isOpen: true,
            handleDialogClose: closeInfoDialog,
            title: dialogOptions.title,
            contentText: dialogOptions.contentText
        })
    }

    function showConfirmDialog(dialogOptions: ConfirmDialogOptions) {
        setConfirmDialogState({
            isOpen: true,
            handleDialogClose: closeConfirmDialog,
            title: dialogOptions.title,
            contentText: dialogOptions.contentText,
            leftButtonText: dialogOptions.leftButtonText,
            leftButtonClickHandler: closeConfirmDialog,
            rightButtonText: dialogOptions.rightButtonText,
            rightButtonClickHandler: dialogOptions.rightButtonClickHandler
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
