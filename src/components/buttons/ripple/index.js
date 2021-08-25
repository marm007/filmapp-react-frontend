import useRipple from 'useripple'

const RippleButton = ({ onClick, children, className, id }) => {

    const [addRipple, ripples] = useRipple({ background: 'black' })

    return (
        <button id={id ? id : ''} onClick={(e) => {
            onClick(e)
        }}
            onMouseDown={addRipple}
            className={`btn btn-link button-ripple text-dark ${className}`}>
            {children}
            {ripples}
        </button>
    )
}

export default RippleButton