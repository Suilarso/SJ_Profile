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
  const [password, setPassword] = useState(' ');

  const dispatch = useDispatch();

  const { loading, error, userAuth } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userAuth)
    {
      history.push('/')
    }
  }, [history, userAuth]);

  function submitHandler(e)
  {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <FormContainer>
      <h2 className='py-2'>Log in to DoneDeals</h2>
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
          Need an account? <Link to='/register'>Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
