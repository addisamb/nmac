import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {NavigationService} from '../../config';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

/**
 * App-wide safety net. Previously any unhandled exception during a screen's
 * render/lifecycle (e.g. reading a field off undefined API data) crashed the
 * whole app with no message — users just saw it "quit by itself". This boundary
 * catches those errors, keeps the app alive, shows a recoverable screen, and
 * surfaces the error text so the exact failing screen can be identified.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, info: any) {
    // Kept for crash visibility in logs / future crash-reporter integration.
    console.error('[ErrorBoundary] caught a crash:', error, info?.componentStack);
  }

  handleGoBack = () => {
    this.setState({hasError: false, error: null});
    // Pop the crashing screen so we re-render the previous (working) one instead
    // of immediately re-mounting the screen that just threw.
    try {
      NavigationService.goBack();
    } catch (e) {
      // no-op: if there is nothing to go back to, clearing the error is enough.
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: 8,
              textAlign: 'center',
            }}>
            Something went wrong
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#555',
              marginBottom: 16,
              textAlign: 'center',
            }}>
            This screen ran into a problem. You can go back and keep using the app.
          </Text>
          <ScrollView
            style={{maxHeight: 160, alignSelf: 'stretch', marginBottom: 20}}
            contentContainerStyle={{padding: 12}}>
            <Text style={{fontSize: 12, color: '#933'}} selectable>
              {this.state.error?.message || 'Unknown error'}
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={this.handleGoBack}
            style={{
              backgroundColor: '#2e7d5b',
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 8,
            }}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
