import React from "react";

class ErrorButton extends React.Component {
  state = { shouldThrow: false };

  handleThrowError = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error("oops, looks like you made a mistake");
    }
    return (
      <button onClick={this.handleThrowError} className="error-button">
        Throw Error
      </button>
    );
  }
}

export { ErrorButton };
