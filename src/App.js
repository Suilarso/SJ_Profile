import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'


//<img src={logo} className="App-logo" alt="logo" />
function App()
{
  return (
    <BrowserRouter>
      <Header />
      <main className='py-5'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          {/* <Route path='/additem' component={AddItemsScreen} exact /> */}
          {/* <Route path='/items' component={ItemMgmtScreen} exact /> */}
        </Container>
      </main>
    </BrowserRouter>
  )
}

export default App;



