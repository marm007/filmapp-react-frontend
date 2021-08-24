import { useState, useRef } from 'react'
import ToastContext from './toastContext'
import $ from 'jquery'

const ToastProvider = ({ children }) => {
    const showAnimTimeout = 850
    const hideAnimTimeout = 1500 + showAnimTimeout

    const [toast, setToast] = useState({ header: '', message: '', isPrevoius: false })

    const toastAutoHide = useRef(null)
    const toastShow = useRef(null)

    const createToast = (message, header = 'Playlist') => {
        let toastElement = $('#mainToast')

        if (toastAutoHide.current) {
            console.log('hide', toastAutoHide.current)
            clearTimeout(toastAutoHide.current)
            toastAutoHide.current = null
        }

        if (toast.isPrevoius) {
            toastElement.hide()

            if (toastShow.current) {
                console.log('toastShow', toastAutoHide.current)

                clearTimeout(toastShow.current)
            }

            toastShow.current = setTimeout(() => {
                console.log('ladladll')
                toastElement.show()
                setToast({ header: header, message: message, isPrevoius: true })
                toastAutoHide.current = setTimeout(() => {
                    console.log('ccsda')
                    toastElement.hide()
                }, hideAnimTimeout)
            }, showAnimTimeout)

        } else {
            toastElement.show()
            setToast({ header: header, message: message, isPrevoius: true })
            toastShow.current = setTimeout(() => {
                toastElement.hide()
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