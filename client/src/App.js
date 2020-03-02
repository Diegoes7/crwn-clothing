import React, {useEffect} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component"
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from './redux/user/user.actions'


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()

  }, [checkUserSession])
  
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin"
           render={() => 
           currentUser ?
           (<Redirect to='/'/>) 
          : (<SignInAndSignUpPage/>)} />
        </Switch>
      </div>
    );
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, 
  mapDispatchToProps
  )(App);





/* this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
         setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      }
      
        setCurrentUser(userAuth)
    }) */
  



/* import { Card } from './components/card.component'
import styled from 'styled-components'

const Text = styled.div`
color: red;
font-size: 28px;
border: ${({ isActive }) => isActive ? '1px solid black' : '3px dotted green'};
`;


function App(){
  return (
    <div className="App">
      <Card>
        <Text  isActive={false}>I am a component</Text>
      </Card>
    </div>
  );
};

export default App;
 */