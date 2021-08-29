import { useState } from "react"
import UpdateContext from "./updateContext"

const UpdateProvider = ({ children }) => {

    const [updateResource, setUpdateResource] = useState({ isPlaylist: null, resource: null })

    const setToUpdate = (isPlaylist, resource) => {
        setUpdateResource({
            isPlaylist,
            resource
        })
    }

    const clearToUpdate = () => {
        setUpdateResource({ isPlaylist: null, resource: null })
    }

    return (
        <UpdateContext.Provider value={{ setToUpdate, clearToUpdate, updateResource }}>
            {children}
        </UpdateContext.Provider>
    )
}

export default UpdateProvider