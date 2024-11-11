import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { TaskifyDialogProps } from '../../types/propTypes'
import { DIALOG_TRANSITION_DURATION_MILLISECONDS } from '../../constants/general.constants'
import './TaskifyDialog.css'

export default function TaskifyDialog({
    isOpen,
    handleDialogClose = () => { },
    title = '',
    contentText = '',
    leftActionButtonText = '',
    rightActionButtonText = '',
    leftActionButtonClickHandler = () => { },
    rightActionButtonClickHandler = () => { },
    dialogLayout = null
}: TaskifyDialogProps) {

    function onLeftButtonClick() {
        leftActionButtonClickHandler()
        handleDialogClose()
    }

    function onRightButtonClick() {
        rightActionButtonClickHandler()
        handleDialogClose()
    }

    return (
        <Dialog
            onClose={handleDialogClose}
            open={isOpen}
            transitionDuration={DIALOG_TRANSITION_DURATION_MILLISECONDS}
            maxWidth={false}
        >
            <div className="taskify-dialog">
                {
                    dialogLayout ?? <>
                        {title && <DialogTitle align='center'>{title}</DialogTitle>}
                        {contentText && <DialogContent><p>{contentText}</p></DialogContent>}
                        {
                            (leftActionButtonText || rightActionButtonText) && <DialogActions>
                                {leftActionButtonText && <Button onClick={onLeftButtonClick}>{leftActionButtonText}</Button>}
                                {rightActionButtonText && <Button onClick={onRightButtonClick}>{rightActionButtonText}</Button>}
                            </DialogActions>
                        }
                    </>
                }
            </div>
        </Dialog>
    )
}
