import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import {USER_UPDATE_RESET} from '../constants/userConstants'

function UserEditScreen() {
  const { id } = useParams();
  const userId = id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate;

  useEffect(() => {
    if(successUpdate) {
      dispatch({type: USER_UPDATE_RESET})
      navigate('/admin/userlist')
    } else {
          if (!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId));
          } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
          }
    }
  }, [user, userId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id:user._id,
      name:name,
      email:email,
      isAdmin:isAdmin
    }))
  };
  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>
      <FormContainer>
        <h1>Edit User: {user.name}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          (<Loader />)
        ) : (error ? (
          (<Message variant="danger">{error}</Message>)
        ) : (
          <Form onSubmit={submitHandler} noValidate>
            <Form.Group className="py-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="py-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="py-3" controlId="isAdmin">
              <Form.Check
                required
                type="checkbox"
                label="Is Admin?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button className="py-3" type="submit" variant="primary">
              Update User
            </Button>
          </Form>
        ))}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
