import { LoaderButtonProps } from '../../types/propTypes'
import Loader from '../Loader/Loader'
import './LoaderButton.css'

export default function LoaderButton({
    text,
    className = '',
    isDisabled = false,
    isLoading = false,
    loaderArchColor = 'white',
    renderAsButton = false,
    onClick = () => { }
}: LoaderButtonProps) {
    return (
        <>
            {
                renderAsButton ? <button className={`loader-button ${className} ${(isDisabled || isLoading) ? 'disabled' : ''}`} onClick={onClick}>
                    {
                        isLoading ? <div className='loader-button-loader-container'>
                            <Loader
                                loaderArchColor={loaderArchColor}
                            />
                        </div> : <>{text}</>
                    }
                </button> : <div className={`loader-button ${className} ${(isDisabled || isLoading) ? 'disabled' : ''}`} onClick={onClick}>
                    {
                        isLoading ? <div className='loader-button-loader-container'>
                            <Loader
                                loaderArchColor={loaderArchColor}
                            />
                        </div> : <>{text}</>
                    }
                </div>
            }
        </>

    )
}