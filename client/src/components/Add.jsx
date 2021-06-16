import React from 'react';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';

import { addImageComputer } from "../Services/service-img"
import { idUser } from "../Services/service-user";


export default function Add() {

    const titleRef = useRef();
    const fileRef = useRef();
    function updateImage(e) {
        if (titleRef.current.value && fileRef.current.value) {
            addImageComputer({ title: titleRef.current.value, url: fileRef.current.value, media_type: "image", userId: idUser })
            titleRef.current.value = null
            fileRef.current.value = null
            alert('The file was successfully updated...')
        }
        else {
            alert('Oops, you forgot to select an image')
        }
    }

    return (
        <>
            <form>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input className="custom-file-input" type='file' accept="image/png, image/jpeg" ref={fileRef} name='fileImage'></input>
                        <label className="custom-file-label">choose picture</label>
                    </div>
                </div>
                <div className="form-group">
                    <input className="form-control" type='text' placeholder='Title' ref={titleRef}></input>
                </div>
                <Button style={{border: 'none', background:'none', color:'white'}} onClick={(e) => updateImage(e)}>Continue</Button>
                
            </form>
        </>
    );
}

