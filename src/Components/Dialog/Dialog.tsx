import React, { Component } from 'react';
import './Dialog.css';

class Dialog extends Component<IProps, IState> {

  // array of dialog boxes
  static modals: Array<Dialog> = [];
  

  static open = (id: string) => (e: any) => {
    e.preventDefault();

    // open modal specified by the id
    const modal = Dialog.modals.find((x) => x.props.id === id);
    if (modal) {
      modal.setState({ isOpen: true });
    }
  };

  static close = (id: string) => (e: any) => {
    e.preventDefault();
    const modal = Dialog.modals.find((x) => x.props.id === id);
    if (modal) {
      modal.setState({ isOpen: false });
    }
  };

  element!: HTMLDivElement | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // add this modal instance to the modal service so it's accessible from other components
    Dialog.modals.push(this);
  }

  componentWillUnmount() {
    // remove this modal instance from modal service
    // eslint-disable-next-line react/destructuring-assignment
    Dialog.modals = Dialog.modals.filter(
      ({ props: { id } }) => id !== this.props.id);
    if (this.element) {
      this.element.remove();
    }
  }

  handleClick(e: any) {
    // close modal on background click
    if (e && e.target && e.target.className === 'jw-modal-background') {
    // eslint-disable-next-line react/destructuring-assignment
      Dialog.close(this.props.id)(e);
    }
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        style={{ display: isOpen ? '' : 'none' }}
        role="dialog"
        id="dialog-box"
        ref={(el) => { (this.element = el); }}
      >
        <div className="jw-modal">
          <div className="jw-modal-body">{children}</div>
        </div>
        <div
          className="jw-modal-background"
          onKeyPress={(event) => this.handleClick(event)}
          role="presentation"
          onClick={(event) => this.handleClick(event)}
        />
      </div>
    );
  }
}


interface IProps {
  id: string;
}

interface IState {
  isOpen: boolean;
}

export default Dialog;
