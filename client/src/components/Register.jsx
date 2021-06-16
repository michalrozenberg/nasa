import React from "react";
import { connect } from 'react-redux';
import { actions } from '../Redux/action';
import { createUser, idUser } from '../Services/service-user';
import { Form, Button, Card } from 'react-bootstrap';
import { Redirect, withRouter } from 'react-router-dom';
import './Style/login-style.css'
import './Style/style.css'
import firebase from "firebase/app";
import logo from '../images/logo.gif';



function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    };
}

const mapDispatchToProps = (dispatch) => ({
    setId: (id) => dispatch(actions.setId(id)),
    setName: (name) => dispatch(actions.setName(name)),
    setPassword: (password) => dispatch(actions.setPassword(password)),
    setEmail: (email) => dispatch(actions.setEmail(email))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Register(props) {

    const { user, setName, setPassword, setEmail, setId } = props
    const { Text, Group, Label, Control } = Form;
    const { Body, Header } = Card;

    function sendDetails() {
        if (!user.email && !user.password && !user.name) {
            alert('No details were entered');
            return <Redirect to='/signup'></Redirect>
        }
        else if (!user.email || !user.name || !user.password) {
            alert('Missing one or more of your details');
            return <Redirect to='/signup'></Redirect>
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                (data) => {
                    createUser({ name: user.name, password: user.password, email: user.email });
                    setId(idUser);
                    props.history.push('/apod')
                }
            ).catch(
                (err) => {
                    alert(err)
                })
        }
    }
    return (
        <>
            <Card className="center">
                <Header>
                    <img src={logo} alt='logo' width={3} ></img>
                    Signup
                </Header>
                <Body>
                    <Form>
                        <Group controlId="formBasicName">
                            <Label>
                                Name:
                            </Label>
                            <Control
                                className="input"
                                type="text"
                                placeholder="Enter name"
                                value={user.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Text className="text-muted">
                            </Text>
                        </Group>
                        <Group controlId="formBasicPassword">
                            <Label>
                                Password:
                            </Label>
                            <Control
                                className="input"
                                type="password"
                                placeholder="Enter password"
                                value={user.password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Group>
                        <Group controlId="formBasicEmail">
                            <Label>
                                email:
                            </Label>
                            <Control
                                className="input"
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Group>
                        <Button
                            variant="light"
                            onClick={sendDetails}>
                            Signup
                        </Button>
                    </Form>
                </Body>
            </Card>
        </>
    )
}))

