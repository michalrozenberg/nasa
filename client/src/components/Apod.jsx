import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { actions } from "../Redux/action";
import { Card, Button } from 'react-bootstrap';
import { Redirect, useParams, withRouter } from 'react-router-dom'
import { listImg, getImgOfUser, addImgBySite } from "../Services/service-img";
import { idUser } from '../Services/service-user';
import Add from "./Add";
import CardDeck from 'react-bootstrap/Card';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        image: state.imageReducer.image
    };
}

const mapDispatchToProps = (dispatch) => ({

    setId: (id) => dispatch(actions.setId(id)),
    setTitle: (title) => dispatch(actions.setTitle(title)),
    setUrl: (url) => dispatch(actions.setUrl(url)),
    setMediaType: (mediaType) => dispatch(actions.setMediaType(mediaType)),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Apod(props) {

    const { user, image, setTitle, setUrl, setMediaType, setId } = props
    const [click, setClick] = useState(false)
    const [list, setList] = useState()
    const [explain, setExplain] = useState()

    function addImage() {
        setClick(true);
        props.history.push('/addImage')

    }
    async function getImg() {
        await getImgOfUser();
        console.log("list-in-apod", listImg);
        setList(listImg);
    }
        const getSrc = async () => {
        const res = await fetch("https://api.nasa.gov/planetary/apod/?api_key=yclABgZaBHdA1PlXEgl88puv6bIjkeatrwDS4dMY");
        const data = await res.json();
        setUrl(data.url);
        console.log(data.url);
        setTitle(data.title);
        console.log(data.title)
        setMediaType(data.media_type);
        console.log(data.media_type);
        setId(idUser);
        addImgBySite(idUser)
    }

    useEffect(() => {
        if (!localStorage.getItem("token"))
            props.history.push("/login")
        getSrc()
    }, [])

    return (
        <>
            <div className="container m-3">
                <div className="row">
                    <div className="col-3">
                        {click && <Add />}
                        <button className="btn btn-outline-success" onClick={addImage}>{<small>  Choose images </small>}</button>

                    </div>
                    <div className="col-8" style={{ color: "white" }}>
                       
                        <h6>The image shown is APOD: Astronomy picture of the day - NASA</h6>
                        <h5 className="m-3">Title: {image.title}</h5>
                        {image.media_type === 'image' ?
                            <img src={image.url}
                                className='m-5'
                                width="auto" height="auto"
                                alt="APOD: Astronomy picture of the day"
                            ></img> :
                            <iframe src={image.url}
                                width="510" height="420"
                                alt="APOD: Astronomy picture of the day"
                            >
                            </iframe>
                        }
                    </div>
                    <div className="col-1">
                        <div className="Img">
                            <div>
                                <Button variant="success" className="m-4" onClick={getImg}><small>History images</small></Button>
                                <div className="row">

                                    {
                                        list && list.map((item, index) =>
                                            <CardDeck key={index}>
                                                <Card className="p-3" variant="top" style={{ width: '18rem' }}>
                                                    <Card.Text>{item.url}</Card.Text>
                                                    <hr></hr>
                                                    <Card.Text>{item.title}</Card.Text>
                                                </Card>
                                            </CardDeck>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}))

