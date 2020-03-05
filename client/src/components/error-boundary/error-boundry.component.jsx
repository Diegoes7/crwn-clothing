import React from "react";
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundry.styles";

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false
    };
  }

  static getDerivedStateFromError(error) {
    // process he error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/QIxIKBH.png" />
          <ErrorImageText>
            Unfortunately we went to Ghost mode :)
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
