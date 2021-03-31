import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

export default function ProfileScreen({ history }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userDetails);

  const { userToken } = useSelector((state) => state.userLogin);

  const { success, failure } = useSelector((state) => state.userUpdateProfile);

  // Fetching user details
  useEffect(() => {
    if (!userToken) {
      history.push('/login');
    } else {
      dispatch(getUserDetails(userToken));
    }
  }, [dispatch, history, userToken]);

  // Populating the form with user details
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile(userToken, { id: userInfo._id, name, email, password })
      );
    }
  }

  return (
    <FormContainer>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {failure && <Message variant='danger'>Profile Update Failed</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}
