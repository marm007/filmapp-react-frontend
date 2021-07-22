import { useState } from 'react'
import ToastContext from './toastContext'

const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ isOpen: false, message: '', isPrevoius: false })

    const createToast = (message) => {
        if (toast.isPrevoius) {
            setToast({ isOpen: false, message: '', isPrevoius: true })
            setTimeout(() => setToast({ isOpen: true, message: message, isPrevoius: true }), 850)
        } else {
            setToast({ isOpen: true, message: message, isPrevoius: true })
        }
    }

    const clearToast = () => {
        setToast({ isOpen: false, message: '', isPrevoius: false })
    }

    return (
        <ToastContext.Provider value={{ toast, createToast, clearToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider