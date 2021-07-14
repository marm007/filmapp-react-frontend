import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddFilmComponent.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowsWidth from '../../helpers/useWindowsWidth'

const CHOOSE_FILM = `Choose a film `;
const CHOOSE_THUMBNAIL = `Choose a thumbnail `;

function AddFilm() {

    const onSmallScreen = useWindowsWidth();

    let history = useHistory()

    const filmInputRef = useRef(null)
    const thumbnailInputRef = useRef(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const [film, setFilm] = useState(null)
    const [filmName, setFilmName] = useState(CHOOSE_FILM)
    const [filmPreview, setFilmPreview] = useState(null)

    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailName, setThumbnailName] = useState(CHOOSE_THUMBNAIL)
    const [thumbnailPreview, setThumbnailPreview] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [alert, setAlert] = useState({ type: "", message: "" })

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        setAlert({ type: "", message: "" });

        if (!localStorage.getItem('user')) {
            history.push(`${process.env.REACT_APP_PATH_NAME}add/login`);
            return;
        }

        let filmData = new FormData();
        filmData.set('title', title);
        filmData.set('description', description);
        filmData.set('file', film);
        filmData.set('thumbnail', thumbnail);

        /*   this.setState({isLoading: true}, () =>
              axios.post(`${process.env.REACT_APP_API_URL}films`,
                  film, requestOptions)
  
                  .then((response) => {
                      this.props.history.push(`${pathName}film/${response.data.id}`);
  
                  })
                  .catch((error) => {
                      console.log(error);
                      console.log(JSON.stringify(error));
                      if (error.response && error.response.data && error.response.data.error) {
                          this.setState({
                              isLoading: false,
                              alert: {type: "alert-danger", message: error.response.data.error}
                          });
                          if (error.response.status === 422) {
                              this.setState({
                                  film: null,
                                  filmName: CHOOSE_FILM,
                                  filmPreview: null,
  
                                  thumbnail: null,
                                  thumbnailName: CHOOSE_THUMBNAIL,
                                  thumbnailPreview: null,
                              })
                          }
                      } else if (error.response && error.response.data && error.response.data.errors) {
                          if (error.response.data.errors.description)
                              this.setState({
                                  isLoading: false,
                                  alert: {type: "alert-danger", message: error.response.data.errors.description.message}
                              });
                          else if (error.response.data.errors.title)
                              this.setState({
                                  isLoading: false,
                                  alert: {type: "alert-danger", message: error.response.data.errors.title.message}
                              })
                      }
  
                  })); */

    }

    const handleFileChoose = (event, type) => {
        event.preventDefault();
        setAlert({ type: "", message: "" });

        switch (type) {
            case 'film':
                setFilm(filmInputRef.current.files[0])
                setFilmName(filmInputRef.current.files[0].name)
                setFilmPreview(URL.createObjectURL(event.target.files[0]))
                break;

            case 'thumbnail':
                setThumbnail(thumbnailInputRef.current.files[0])
                setThumbnailName(thumbnailInputRef.current.files[0].name)
                setThumbnailPreview(URL.createObjectURL(event.target.files[0]))
                break;
            default:
                break;
        }
    }

    return (
        <Row className="mt-4 mr-2 ml-2" sm={12}>
            <Col className="mb-4" sm={6} lg={5}>

                <Col className="mb-4 ml-auto mr-auto" xs={10} sm={12} lg={10} >
                    <div
                        className="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <div 
                            className="justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload">
                            <input id="film" accept="video/mp4, video/ogg"
                                onChange={event => handleFileChoose(event, 'film')}
                                type="file" ref={filmInputRef} className="inputfile" />
                            <label htmlFor="film" >

                                {
                                    filmName === CHOOSE_FILM &&
                                    <span>{filmName}</span>
                                }
                            </label>

                            {
                                filmPreview &&
                                <video muted={true} autoPlay={true} className="embed-responsive-item " loop={true}
                                    src={filmPreview}>
                                </video>
                            }

                            {
                                filmPreview &&
                                <Col style={{ left: 0, top: 0, position: 'absolute', width: 100 + '%', height: 100 + '%' }} className="add-item-opacity" />
                            }

                            {
                                filmPreview &&
                                <FontAwesomeIcon className="add-item-middle fa-3x" style={{ color: "#ffffff" }} icon="times"
                                    onClick={() => {
                                        setFilmName(CHOOSE_FILM)
                                        setFilmPreview(null)
                                    }} />
                            }

                        </div>
                    </div>
                </Col>
                <Col className="ml-auto mr-auto" xs={10} sm={12} lg={10}>
                    <div
                        className="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <div 
                            className="justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload">
                            <input id="thumbnail" accept="image/jpg, image/png, image/jpeg"
                                onChange={event => handleFileChoose(event, 'thumbnail')}
                                type="file" ref={thumbnailInputRef} className=" inputfile" />
                            <label htmlFor="thumbnail">

                                {
                                    thumbnailName === CHOOSE_THUMBNAIL &&
                                    <span>{thumbnailName}</span>
                                }
                            </label>

                            {
                                thumbnailPreview &&
                                <img alt=""
                                    className="embed-responsive-item"
                                    src={thumbnailPreview} />
                            }

                            {
                                thumbnailPreview &&
                                <Col style={{ left: 0, top: 0, position: 'absolute', width: 100 + '%', height: 100 + '%' }} className="add-item-opacity" />
                            }

                            {
                                thumbnailPreview &&
                                <FontAwesomeIcon className="add-item-middle fa-3x" style={{ color: "#ffffff" }} icon="times"
                                    onClick={() => {
                                        setThumbnailName(CHOOSE_THUMBNAIL)
                                        setThumbnailPreview(null)
                                    }} />
                            }
                        </div>
                    </div>

                </Col>
            </Col>
            <Col className="mb-2" sm={6} lg={5}>

                <Col className="mb-3" sm={12}>
                    <FormControl
                        placeholder="Title"
                        aria-label="Title"
                        aria-describedby="basic-addon1"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                </Col>

                <Col className="mb-3" sm={12}>
                    <FormControl
                        placeholder="Description"
                        as="textarea" aria-label="With textarea"
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Col>

                <Col className="mb-3" sm={12}>
                    <Form.Group>
                        <Button variant="primary"
                            disabled={isLoading}
                            onClick={!isLoading ? handleSubmit : null}
                        >
                            {isLoading ? 'Loading…' : 'Add'}
                        </Button>

                        {
                            isLoading &&
                            <img alt="loading..." className="pl-2"
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

                        }
                    </Form.Group>
                </Col>
                {alert.message &&
                    <Col className={`alert ${alert.type}`}>{alert.message}</Col>
                }
            </Col>


        </Row>
    )
}

export default AddFilm
