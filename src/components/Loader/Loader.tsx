import {
    LOADER_DEFAULT_HEIGHT_PX,
    LOADER_DEFAULT_WIDTH_PX
} from '../../constants/general.constants'
import { LoaderProps } from '../../types/propTypes'
import './Loader.css'

export default function Loader({
    widthPx = LOADER_DEFAULT_WIDTH_PX,
    heightPx = LOADER_DEFAULT_HEIGHT_PX,
    loaderArchColor = 'black',
    loaderColor = '#bcbcbc'
}: LoaderProps) {

    const loaderStyles = {
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        borderColor: loaderColor,
        borderTopColor: loaderArchColor
    }

    return (
        <div className='loader' style={loaderStyles}></div>
    )
}