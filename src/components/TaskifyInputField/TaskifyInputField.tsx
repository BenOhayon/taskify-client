import { TextField } from "@mui/material";
import { TaskifyInputFieldProps } from "../../types/propTypes";
import { InputType } from "../../types/types";

export default function TaskifyInputField({
    id,
    name,
    label,
    inputRef = null,
    value = "",
    isDisabled = false,
    type = InputType.TEXT,
    isError = false,
    helperText = "",
    stretch = true,
    onInputChange = () => { }
}: TaskifyInputFieldProps) {
    return (
        <TextField
            inputRef={inputRef}
            id={id}
            name={name}
            error={isError}
            label={label}
            type={type}
            helperText={helperText}
            disabled={isDisabled}
            value={value}
            sx={{
                width: stretch ? '100%' : 'initial'
            }}
            onChange={onInputChange}
        />
    )
}