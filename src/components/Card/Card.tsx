import { CardProps } from "../../types/propTypes";
import './Card.css'

export default function Card({
    children
}: CardProps) {
    return (
        <div className='card'>
            {children}
        </div>
    )
}