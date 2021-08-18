import { useEffect, useRef } from "react"

const Input = ({ isInvalid, onChange, type, name, value }) => {

    const inputRef = useRef(null)

    useEffect(() => {
        let ref = inputRef.current
        if (ref) {
            if (isInvalid) inputRef.current.classList.add('is-invalid')
            else inputRef.current.classList.remove('is-invalid')
        }
    }, [isInvalid])

    return (
        <input ref={inputRef} className="form-control"
            type={type} name={name}
            value={value} onChange={onChange} />
    )
}

export default Input