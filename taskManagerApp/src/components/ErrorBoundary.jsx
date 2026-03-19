import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasherror: true };
  }

  componentDidCatch(error, info) {
    console.error(error);
    console.info(info);
  }

  handleReset = () => {
    this.setState({ hashError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong</Text>
          <Button title="Retry" onPress={this.handleReset} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
