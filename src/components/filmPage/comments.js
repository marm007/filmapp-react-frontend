import React, { useState, useEffect } from 'react';

import { Button, Col, Dropdown, DropdownButton, Row, Spinner } from "react-bootstrap";


import TextField from '@material-ui/core/TextField';

function Comments(props) {

    const [comments, setComments] = useState(props.comments || [])
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        setComments(props.comments || [])
    }, [props.comments])

    const addComment = () => {

        let comment = { text: newComment }
    };

    const sortComments = (e) => {
        let path = '';

        switch (e) {
            case 'commentByDate':
                path = 'date';

                break;
            case 'commentByName':
                path = 'author';
                break;
            default:
                break;
        }

        if (path === '')
            return;


    };


    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    const displayDate = (comment) => {
        let date = new Date(Date.parse(comment.createdAt));
        let time =(('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('0' + date.getFullYear()).slice(-2)
        + ' o ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2))
        return time;
    };



    return (

        <Col>
            <Col className="p-0" sm={12}>
                <Row>
                    <Col xs={8} sm={10}>
                        <TextField
                            value={newComment}
                            onChange={handleChange}
                            type="text"
                            id="standard-multiline-flexible"
                            label="Comment"
                            multiline
                            fullWidth
                            maxrow="4"
                        />
                    </Col>
                    <Col xs={2} sm={2}>
                        <Button className="mt-3" variant="primary"
                            onClick={() => addComment()}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col className="p-0 mt-4 mb-4" sm={12}>
                <Row>
                    <Col xs={7} sm={5} md={4}>
                    </Col>
                    <Col xs={2} sm={2}>
                        <DropdownButton
                            alignRight
                            variant="secondary"
                            title="Sort"
                            id="dropdown-button-drop-down"
                            onSelect={k => sortComments(k)}>
                            <Dropdown.Item eventKey="commentByDate">By date</Dropdown.Item>
                            <Dropdown.Item eventKey="commentByName">By author name</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Col>

            {

                comments.map(comment => {
                    return (
                        <Col className="p-0 mt-4" sm={12} key={comment.id}>
                            <Row className="pl-3">

                                <p className="m-0 font-weight-bold">
                                    <small className="m-0 font-weight-bold">{comment.author_name}</small>
                                </p>
                                <p>
                                    <small className="m-0">{displayDate(comment)}</small>
                                </p>
                            </Row>
                            <p>
                                <small>{comment.text}</small>
                            </p>
                        </Col>
                    )
                })


            }

        </Col>

    )
}

export default Comments