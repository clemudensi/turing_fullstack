import React, { useState } from 'react';
import {Container, Menu, Image, Button, Dropdown} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import TShirtShop from '../../assets/img/tshirtshop.png';
import PopupCart from '../popup/PopupCart';
import validateToken from '../../util/validateToken';
import {connect} from 'react-redux';

const trigger = (
  <span>
    <Image avatar spaced='right' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
  </span>
);

const HeaderMenu = (props) => {
  const {
    cart,
    handleRemoveFromCart,
    tokenValid,
    logOut,
    user_login,
    signup
  } = props;
  const [ state, setState ] = useState({ activeItem: '', fixed: ''});
  const [activeItem, setActiveItem] = useState('');

  const { fixed } = state;

  const handleChange = (event, { name, value }) => {
    event.persist();
    setState( { ...state, [name]: value });
  };

  return(
    <Menu
      // fixed="top"
      borderless
      fluid
      size='huge'
      style={{ padding: '1.1em' }}
    >
      <Container>
        <Menu.Item>
          <a href="/">
            <Image size="small" src={TShirtShop} />
          </a>
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown item text='Products' as='ul' name='products' onClick={handleChange}>
            <Dropdown.Menu className="sb-menu-item">

              {/*Product Category Menu*/}
              <Dropdown.Header>Products Category</Dropdown.Header>

              {/*Start Regional Menu*/}
              <Menu.Item>
                <Dropdown text='Regional' pointing='left' >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <NavLink to={'/regional/italian?page=1'}>Italian</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink to={'/regional/french?page=1'}>French</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink to={'/regional/irish?page=1'}>Irish</NavLink>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              {/*End Regional Menu*/}

              {/*Start Natural Menu*/}
              <Menu.Item>
                <Dropdown text='Natural' pointing='left' >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <NavLink to={'/natural/animal?page=1'}>Animal</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink to={'/natural/flower?page=1'}>Flower</NavLink>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              {/*End Natural Menu*/}

              {/*Start Seasonal Menu*/}
              <Menu.Item>
                <Dropdown text='Seasonal' pointing='left' >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <NavLink to={'/seasonal/christmas?page=1'}>Christmas</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink to={'/seasonal/valentine?page=1'}>Valentine</NavLink>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              {/*End Seasonal Menu*/}
            </Dropdown.Menu>
          </Dropdown>


          <Menu.Item as="ul" name='about' active={activeItem === 'about'} onClick={handleChange}>
            <NavLink to="/about">About</NavLink>
          </Menu.Item>
          <Menu.Item as="ul" name='contact' active={activeItem === 'contact'} onClick={handleChange}>
            <NavLink to="/contact">Contact</NavLink>
          </Menu.Item>
          {/*Shopping cart*/}
          <Menu.Item className="padding-right">
            <PopupCart cart={cart} handleRemoveFromCart={handleRemoveFromCart}/>
          </Menu.Item>

          {
            validateToken(user_login.token || signup.token) || tokenValid ?
              <Dropdown item trigger={trigger} as='ul' name='products' textalign="right">
                <Dropdown.Menu className="sb-menu-item">
                  <Dropdown.Item >
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item >
                    <NavLink to={'#'} onClick={logOut}>Log-Out</NavLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> :
              <div>
                <Button inverted style={{ marginLeft: '0.5em' }} color="pink">
                  <NavLink to={'/login'}>Log in</NavLink>
                </Button>
                <Button inverted style={{ marginLeft: '0.5em' }} color="pink">
                  <NavLink to={'/signup'}>Sign Up</NavLink>
                </Button>
              </div>
          }
          {/*End Auth Menu*/}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    user_login: state.user_login,
    signup: state.signup
  };
};

export default connect(
  mapStateToProps,
  null
)(HeaderMenu);

