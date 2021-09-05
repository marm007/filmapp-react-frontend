import { createContext } from 'react'
const RemoveModalContext = createContext({ show: false, isRemoving: false, id: null, type: null, title: '' })
export default RemoveModalContext