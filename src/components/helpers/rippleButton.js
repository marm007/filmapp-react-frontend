import useRipple from 'useripple'

const RippleButton = ({ onClick, children, className }) => {

    const [addRipple, ripples] = useRipple({ background: 'black' })

    return (
        <button style={{ color: 'black' }} onClick={(e) => {
            onClick(e)
        }}
            onMouseDown={addRipple}
            className={`btn btn-link button-ripple ${className}`}>
            {children}
            {ripples}
        </button>
    )
}

export default RippleButton