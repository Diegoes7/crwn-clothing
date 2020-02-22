import React from "react";
import { auth }  from '../../firebase/firebase.util'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsConstainer, OptionLink} from './header.styles'

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsConstainer>
    <OptionLink to='/shop'>SHOP</OptionLink>
    <OptionLink to='/shop'>CONTACTS</OptionLink>
      {
        currentUser ? 
        (<OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT</OptionLink>)
        : (<OptionLink to='/signin'>
          SIGN IN
        </OptionLink>
        )}
      <CartIcon />
    </OptionsConstainer>
    {
      hidden ? null : <CartDropdown />
    }
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)