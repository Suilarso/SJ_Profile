import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


export default function LoginScreen({ history })
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error, userToken } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userToken)
    {
      history.push('/')
    }
  }, [history, userToken]);

  function submitHandler(e)
  {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <FormContainer>
      <h4 className='py-2'>Log in to Suilarso's Profile</h4>
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Log in
          </Button>
        </Form>
      )}

      <Row className='py-3 text-center'>
        <Col>
          <Link to='/register'>Sign Up</Link> for an account 
        </Col>
      </Row>
    </FormContainer>
  )
}
