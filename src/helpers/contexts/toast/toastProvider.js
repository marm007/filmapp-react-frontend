import { useState, useRef } from 'react'
import ToastContext from './toastContext'

const ToastProvider = ({ children }) => {
    const showAnimTimeout = 850
    const hideAnimTimeout = 1500 + showAnimTimeout

    const [toast, setToast] = useState({ header: '', message: '', isPrevoius: false })

    const toastAutoHide = useRef(null)
    const toastShow = useRef(null)

    const createToast = (message, header = 'Playlist') => {
        let toastElement = window.$('#mainToast')

        if (toastAutoHide.current) {
            clearTimeout(toastAutoHide.current)
            toastAutoHide.current = null
        }

        if (toast.isPrevoius) {
            toastElement.toast('hide')

            if (toastShow.current) {
                clearTimeout(toastShow.current)
            }

            toastShow.current = setTimeout(() => {
                toastElement.toast('show')
                setToast({ header: header, message: message, isPrevoius: true })
                toastAutoHide.current = setTimeout(() => {
                    toastElement.toast('hide')
                }, hideAnimTimeout)
            }, showAnimTimeout)

        } else {
            toastElement.toast('show')
            setToast({ header: header, message: message, isPrevoius: true })
            toastShow.current = setTimeout(() => {
                toastElement.toast('hide')
            }, hideAnimTimeout)
        }
    }

    return (
        <ToastContext.Provider value={{ toast, createToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider