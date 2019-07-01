import React, {Component} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Spinner} from 'react-bootstrap';

import {config} from "../../config";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import connect from "react-redux/es/connect/connect";
import {PlaylistAddButtonComponent} from "../Playlist/PlaylistAddButtonComponent";
import Snackbar from '@material-ui/core/Snackbar';
import TextTruncate from "react-text-truncate";
import {isMobile} from 'react-device-detect'
import ImageBlurredComponent from "../ImageBlurred/ImageBlurredComponent";

const pathName = config.pathName;

class HomeComponent extends Component {


    constructor(props) {
        super(props);

        this.state = {
            films: [],
            addOpenedIndex: -1,

            error: false,
            hasMore: true,
            isLoading: true,
            isMounted: false,

            filmsPreviewLoaded: 0,

            scroll: {},
            windowWidth: window.innerWidth,

            openSnackbar: false,
            note: ''
        };

    }

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);

        this.setState({
            scroll: {
                scrollTop: window.pageYOffset,
                offsetHeight: document.documentElement.offsetHeight,
                innerHeight: window.innerHeight
            }
        });


        this.setState({isLoading: true}, () => {
            let limit = 3;
            const {windowWidth} = this.state;

            if (windowWidth <= 576)
                limit = 1.3;
            else if (windowWidth > 1920)
                limit = 6;
            else if (windowWidth > 1422)
                limit = 5;

            axios.get(`${config.apiUrl}films`, {params: {start: 0, limit: Math.ceil(6 * limit)}})
                .then(response => {

                    let films = response.data;

                    films.forEach(film => {
                        film.add = false;
                        film.img = `${config.apiUrl}films/${film.id}/thumbnail/${film.thumbnail._id}?width=preview`

                    });
                    this.setState({
                        hasMore: films.length >= Math.ceil(6 * limit),
                        films: films,
                        isLoading: false,
                        isMounted: true
                    });
                });
        });


    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }


    handleScroll = () => {
        if (this.state.addOpenedIndex >= 0 && !isMobile) {
            let array = this.state.films;
            array[this.state.addOpenedIndex].add = false;

            this.setState({films: array, addOpenedIndex: -1});
        }

        this.setState({
            scroll: {
                scrollTop: window.pageYOffset,
                offsetHeight: document.documentElement.offsetHeight,
                innerHeight: window.innerHeight
            }
        });

        const {
            loadData,
            state: {
                error,
                isLoading,
                hasMore
            }
        } = this;

        if (error || isLoading || !hasMore) return;
        // alert("innerHeight = " + window.innerHeight + " scrollTop = " +
        //     document.documentElement.scrollTop + " offsetHeight = " + document.body.offsetHeight
        // + " pageOffset " + window.pageYOffset);
        // alert("innerHeight = " + window.innerHeight + " scrollTop = " + document.documentElement.scrollTop + " documentElementoffsetHeight = " + document.documentElement.offsetHeight);
        if ((window.innerHeight +  window.pageYOffset) >= (document.body.offsetHeight - 400)) {
            loadData();
        }
    };

    handleResize = () => {
        this.setState({windowWidth: window.innerWidth});
    };

    handlePlaylistOperation = (message) => {
        if (this.state.addOpenedIndex >= 0) {
            let array = this.state.films;
            array.forEach((film) => {
                film.add = false;

            });
            this.setState({films: array, addOpenedIndex: -1})
        }

        this.setState({openSnackbar: true, note: message});
    };

    handleClickOutside = (index) => {
        if (this.state.addOpenedIndex >= 0) {
            let array = this.state.films;
            array.forEach((film) => {
                film.add = false;
            });
            this.setState({films: array, addOpenedIndex: index})
        }
    };

    handleCreatePlaylistClick = () => {
        this.setState({addOpenedIndex: -1});
    };

    handleAddPlaylistButtonClick = (index) => {
        let array = this.state.films;
        array[index].add = !array[index].add;

        this.setState({films: array, addOpenedIndex: index})

    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSnackbar: false});
    };


    loadData = () => {
        this.setState({isLoading: true}, () => {
            axios.get(`${config.apiUrl}films`, {params: {start: this.state.films.length, limit: 6}})
                .then(response => {

                    let films = response.data;

                    films.forEach(film => {
                        film.add = false;
                        film.img = `${config.apiUrl}films/${film.id}/thumbnail/${film.thumbnail._id}?width=preview`
                    });

                    this.setState({
                        hasMore: (films.length === 6),
                        isLoading: false,
                        films: [
                            ...this.state.films,
                            ...films]
                    });

                })
                .catch((err) => {
                    this.setState({
                        error: err.message,
                        isLoading: false
                    })
                });
        })
    };

    setRedirect = (filmID) => {
        this.props.history.push(`${pathName}film/` + filmID);
    };


    render() {
        const {isLoading} = this.state;
        const {scroll} = this.state;
        let films = this.state.films.map(a => Object.assign({}, a));

        return (
            <Col>


                <Row className="mt-5">

                    {

                        films.map((film, index) => {

                            const filmID = film.id;


                            return <Col className="mb-5 film-preview-holder" xs={6} sm={4} md={3} lg={2} key={film.id}>
                                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half container">
                                    {

                                        <ImageBlurredComponent
                                            image={film.img}
                                            setRedirect={() => this.setRedirect(filmID)}/>
                                    }
                                    <FontAwesomeIcon className="middle" icon="play"
                                                     onClick={() => this.setRedirect(filmID)}/>

                                </div>

                                <Row className="m-0 mt-1">
                                    <Col xs={10} sm={10} className="p-0">

                                        <TextTruncate line={2} text={film.title}
                                                      id="s-c-2"
                                                      className="mb-1 mt-1 title "/>

                                    </Col>
                                    <Col xs={2} sm={2} className="p-0" style={{position: 'absolute', right: 0}}>
                                        <PlaylistAddButtonComponent
                                            parentName="home"
                                            filmID={film.id}
                                            show={film.add} index={index}
                                            handleAddPlaylistButtonClick={this.handleAddPlaylistButtonClick}
                                            handleClick={this.handleCreatePlaylistClick}
                                            handleClickOutside={this.handleClickOutside}
                                            handlePlaylistOperation={this.handlePlaylistOperation}/>
                                    </Col>
                                </Row>
                                <p className="mb-0 author-nick">
                                    <small>{film.author_name}</small>
                                </p>
                                <p className="mb-0 film-views">
                                    <small>{film.views} views</small>
                                </p>

                            </Col>

                        })

                    }

                </Row>
                {
                    ((scroll.scrollTop === 0 || scroll.offsetHeight <= scroll.innerHeight) && this.state.hasMore && this.state.isMounted) &&
                    <Col sm={12} className="text-center">
                        <Button
                            className="button-my"
                            variant="contained"
                            disabled={isLoading}
                            onClick={!isLoading ? this.loadData : null}
                        >
                            {isLoading ? 'Loading…' : 'Click to load'}
                        </Button>
                    </Col>


                }
                {

                    this.state.hasMore &&
                    <Col style={{height: 40}} sm={12} className="text-center">
                        {(!(scroll.scrollTop === 0 || scroll.offsetHeight <= scroll.innerHeight) || !this.state.isMounted) &&
                        this.state.isLoading &&
                        <Spinner animation="border"/>
                        }
                    </Col>
                }

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={1500}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.note}</span>}
                />
            </Col>

        )
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.auth;
    return {
        loggedIn
    };
}

const connectedHomePage = connect(mapStateToProps)(HomeComponent);


export {connectedHomePage as HomeComponent};
