import { Component } from 'react';
// import { withRouter } from 'react-router-dom';

/**
 * REACT-ROUTER Scroll Restoration
 * Most of the time all you need is to “scroll to the top”
 * because you have a long content page, that when navigated to,
 * stays scrolled down. This is straightforward to handle with a <ScrollToTop>
 * component that will scroll the window up on every navigation, make sure to
 * wrap it in withRouter to give it access to the router’s props
 */

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
