import { Checkbox } from "@mui/material";
import { TaskifyCheckboxProps } from "../../types/propTypes";

export default function TaskifyCheckbox({
    checked,
    setChecked,
    label
}: TaskifyCheckboxProps) {
    return (
        <div className="taskify-checkbox">
            <Checkbox
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
            />
            {label && <div className="taskify-checkbox-label">{label}</div>}
        </div>
    )
}