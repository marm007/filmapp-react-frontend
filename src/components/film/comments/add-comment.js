import { useState } from "react";
import { create } from '../../../services/commentService'

export default function AddComment({ filmId, dispatch }) {
    const [comment, setComment] = useState('')
    const [isAdding, setIsAdding] = useState(false)

    const handleAddComment = (event) => {
        event.preventDefault()

        setIsAdding(true)
        dispatch({ type: 'add' })

        return create(filmId, { text: comment })
            .then(res => {
                setComment('')
                setIsAdding(false)
                dispatch({
                    type: 'add-success',
                    payload: res.data
                })
            })
            .catch(err => {
                setComment('')
                setIsAdding(false)
                dispatch({
                    type: 'error',
                    payload: err.response.status
                })
            })
    }
    return (
        <>
            <form onSubmit={(event) => (comment && !isAdding) ? handleAddComment(event) : null}>
                <div id="fiordur">
                    <input type="text" placeholder="Comment" value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                </div>
                <div className="col d-flex justify-content-end" >
                    <button disabled={isAdding || !comment}
                        type="submit"
                        className="btn btn-primary mt-3">
                        Submit
                    </button>
                </div>
            </form>

            {
                isAdding && <div style={{ height: 32 + 'px' }} className="d-flex justify-content-center">
                    <div className="spinner-border" />
                </div>
            }
        </>
    )
}