import React, {PureComponent, Fragment} from 'react'
import {Container, Menu, Dropdown, Image, Button} from 'semantic-ui-react';
import LoginModal from "../auth/LoginModal";
import SignUp from "../auth/SignUpModal";
import PopupCart from '../popup/PopupCart';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import validateToken from '../../util/validateToken'

const trigger = (
  <span>
    <Image avatar spaced='right' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
  </span>
);

class HeaderMenu extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'home',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  handleChange = (e, { name, value}) => this.setState({ [name]: value });

  render() {
    const {
      activeItem,
      fixed,
      email,
      password
    } = this.state;

    const {
      cart,
      handleRemoveFromCart,
      tokenValid,
      logOut,
      user_login,
      signup
    } = this.props;

    return (
      <Fragment>
        <Menu
          fixed={fixed ? 'top' : null}
          // className="App-header"
          secondary
          fluid
          color="white"
          size='huge'
        >
          <Container>
            <Menu.Item as="ul" name='home' active={activeItem === 'home'} onClick={this.handleChange}>
              <NavLink to={'/'}>Home</NavLink>
            </Menu.Item>
            <Dropdown item text='Products' as='ul' name='products' onClick={this.handleChange}>
              <Dropdown.Menu className="sb-menu-item">

                {/*Product Category Menu*/}
                <Dropdown.Header>Products Category</Dropdown.Header>
                <Menu.Item onClick={this.handleChange}>

                  {/*Start Regional Menu*/}
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
                  {/*End Regional Menu*/}
                </Menu.Item>

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


            <Menu.Item as="ul" name='contact' active={activeItem === 'contact'} onClick={this.handleChange}>
              <a href={'/contact'}>Contact Us</a>
            </Menu.Item>
            <Menu.Item name='careers' active={activeItem === 'careers'} onClick={this.handleChange}>Careers</Menu.Item>

            {/*Start Auth Menu*/}
            <Menu.Item position='right' textalign="right">

              {/*Shopping cart*/}
              <Menu.Item >
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
            </Menu.Item>
          </Container>
        </Menu>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_login: state.user_login,
    signup: state.signup
  };
};

export default connect(
  mapStateToProps,
  null
)(HeaderMenu)