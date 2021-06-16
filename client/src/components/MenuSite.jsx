
import React from "react";
import {
    BrowserRouter as Router, Link, Route, Switch, withRouter
} from 'react-router-dom'
import { Navbar, Nav, Form } from 'react-bootstrap';
import Apod from "./Apod";
import Login from "./Login";
import './Style/menuStyle.css'
import firebase from "firebase/app";
import Register from "./Register";
import logo from "../images/logo.gif";


function MenuSite(props) {

    const handleLogout = () => {
        firebase.auth().signOut();
        localStorage.clear("token");
    }

    return (
        <>
            <Router>
                <div className="flex-row">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#apod"></Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        <Form inline>
                            <Link className="stylebtn btn btn-outline m-2" to="/logout" onClick={() => handleLogout()} >Logout</Link>
                            <Link className="stylebtn btn btn-outline m-2" to="/login">Login</Link>
                        </Form>
                    </Navbar>
                </div>

                <Switch>
                    <Route path="/apod">
                        <Apod />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Register />
                    </Route>
                    <Route path='/addImage'>
                        <Apod />
                    </Route>
                    <Route path="/">
                        <img className='m-5' src={logo} alt="logo of nasa apod"></img>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default MenuSite;

