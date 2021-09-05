import { useEffect, useRef } from "react"

const Input = ({ isInvalid, onChange, type, name, value, placeholder = '' }) => {

    const inputRef = useRef(null)

    useEffect(() => {
        let ref = inputRef.current
        if (ref) {
            if (isInvalid) inputRef.current.classList.add('is-invalid')
            else inputRef.current.classList.remove('is-invalid')
        }
    }, [isInvalid])

    return type === 'textarea' ?
        <textarea ref={inputRef} className="form-control"
            placeholder={placeholder}
            type={type} name={name}
            value={value} onChange={onChange} rows={8}/> :
        <input ref={inputRef} className="form-control"
            placeholder={placeholder}
            type={type} name={name}
            value={value} onChange={onChange} />


}

export default Input