import Button from 'react-bootstrap/Button'
import useRipple from 'useripple'

const RippleButton = ({ onClick, children, className }) => {

    const [addRipple, ripples] = useRipple({ background: 'black' })

    return (
        <Button variant="link" onClick={(e) => {
            addRipple(e)
            onClick(e)
        }}
            className={`button-ripple ${className}`}>
            {children}
            {ripples}
        </Button>
    )
}

export default RippleButton