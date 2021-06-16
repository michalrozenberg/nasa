import React from "react";
import { connect } from 'react-redux';
import { actions } from '../Redux/action'
import { loginUser, idUser } from '../Services/service-user';
import { Form, Button, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './Style/login-style.css'
import './Style/style.css'
import firebase from "firebase/app";
import logo from '../images/logo.gif';


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setId: (id) => dispatch(actions.setId(id)),
    setName: (name) => dispatch(actions.setName(name)),
    setEmail: (email) => dispatch(actions.setEmail(email)),
    setPassword: (password) => dispatch(actions.setPassword(password)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Login(props) {

    const { user, setEmail, setPassword, setName, setId } = props
    const { Text, Group, Label, Control } = Form;
    const { Body, Header } = Card;

    function sendDetails() {
        if (!user.email || !user.password) {
            alert('error, enter details')
        }
        else {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                (data) => {
                    loginUser({ email: user.email, password: user.password });
                    setId(idUser);
                    props.history.push('/apod')
                }
            ).catch(
                (err) => {
                    alert(err)
                })
        }
    }

    function moveRegister() {
        return props.history.push('/signup')
    }
    return (
        <>
            <Card className="center">
                <Header>
                    <img src={logo} alt='logo' width={3} ></img>
                    Login
                </Header>
                <Body>
                    <Form>
                        <Group controlId="formBasicEmail">
                            <Label>
                                Email:
                            </Label>
                            <Control
                                placeholder="Enter email"
                                value={user.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Text className="text-muted">
                            </Text>
                        </Group>
                        <Group controlId="formBasicPassword">
                            <Label>
                                Password:
                            </Label>
                            <Control
                                type="password"
                                placeholder="Enter password"
                                value={user.password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={moveRegister} className='m-3' variant="light" style={{ color: "black" }}><small>You do not have an account , create an account</small></Button>
                        </Group>
                        <Button
                            variant="light"
                            onClick={sendDetails}>
                            Login
                        </Button>
                    </Form>
                </Body>
            </Card>
        </>

    )
}))
