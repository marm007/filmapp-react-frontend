import { useState, useRef } from 'react'
import RemoveModalContext from './removeModalContext'

const RemoveModalProvider = ({ children }) => {

    const [removeModalData, setRemoveModalData] = useState({ show: false, isRemoving: false, id: null, type: null, title: '' })
    const modal = useRef()
    const showModal = (id, type, title) => {
        setRemoveModalData({ show: true, isRemoving: false, id: id, type: type, title: title })
    }

    const remove = () => {
        setRemoveModalData(prevState => {
            return { ...prevState, show: false, isRemoving: true }
        })
    }

    const clear = () => {
        setRemoveModalData({ show: false, isRemoving: false, id: null, type: null, title: '' })
    }

    return (
        <RemoveModalContext.Provider value={{ showModal, removeModalData, remove, clear }} >
            {children}
        </RemoveModalContext.Provider>
    )
}

export default RemoveModalProvider