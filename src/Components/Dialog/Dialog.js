/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';

class Dialog extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // array of dialog boxes
  static modals = [];

  static open = (id) => (e) => {
    e.preventDefault();

    // open modal specified by the id
    const modal = Dialog.modals.find((x) => x.props.id === id);
    modal.setState({ isOpen: true });
  };

  static close = (id) => (e) => {
    e.preventDefault();
    const modal = Dialog.modals.find((x) => x.props.id === id);
    modal.setState({ isOpen: false });
  };

  componentDidMount() {
    // add this modal instance to the modal service so it's accessible from other components
    Dialog.modals.push(this);
  }

  componentWillUnmount() {
    // remove this modal instance from modal service
    // eslint-disable-next-line react/destructuring-assignment
    Dialog.modals = Dialog.modals.filter(({ props: { id } }) => id !== this.props.id);
    this.element.remove();
  }

  handleClick(e) {
    // close modal on background click
    if (e.target.className === 'jw-modal') {
    // eslint-disable-next-line react/destructuring-assignment
      Dialog.close(this.props.id)(e);
    }
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        style={{ display: +isOpen ? '' : 'none' }}
        onClick={this.handleClick}
        role="dialog"
        id="dialog-box"
        onKeyPress={(event) => console.log(event)}
        ref={(el) => { (this.element = el); }}
      >
        <div className="jw-modal">
          <div className="jw-modal-body">{children}</div>
        </div>
        <div
          className="jw-modal-background"
          onKeyPress={(event) => console.log(event)}
          role="dialog"
          onClick={() => console.log('clicked')}
        />
      </div>
    );
  }
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
};

export default Dialog;
