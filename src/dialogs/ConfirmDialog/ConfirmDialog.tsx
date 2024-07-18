import { DIALOG_TRANSITION_DURATION_MILLISECONDS } from "../../constants/general.constants";
import { ConfirmDialogProps } from "../../types/propTypes";
import TaskifyDialog from "../TaskifyDialog/TaskifyDialog";

export default function ConfirmDialog({
    isOpen,
    title,
    handleDialogClose = () => { },
    contentText,
    leftButtonText,
    rightButtonText,
    leftButtonClickHandler = () => { },
    rightButtonClickHandler = () => { }
}: ConfirmDialogProps) {

    function onRightButtonClick() {
        setTimeout(() => {
            rightButtonClickHandler()
        }, DIALOG_TRANSITION_DURATION_MILLISECONDS)
    }

    return (
        <TaskifyDialog
            isOpen={isOpen}
            title={title}
            handleDialogClose={handleDialogClose}
            contentText={contentText}
            leftActionButtonText={leftButtonText}
            leftActionButtonClickHandler={leftButtonClickHandler}
            rightActionButtonText={rightButtonText}
            rightActionButtonClickHandler={onRightButtonClick}
        />
    )
}
