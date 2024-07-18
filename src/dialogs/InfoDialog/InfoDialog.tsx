import { InfoDialogProps } from "../../types/propTypes";
import TaskifyDialog from "../TaskifyDialog/TaskifyDialog";

export default function InfoDialog({
    title,
    isOpen,
    handleDialogClose = () => { },
    contentText = ''
}: InfoDialogProps) {
    return (
        <TaskifyDialog
            isOpen={isOpen}
            title={title}
            handleDialogClose={handleDialogClose}
            contentText={contentText}
            rightActionButtonText="OK"
            rightActionButtonClickHandler={() => handleDialogClose}
        />
    )
}
