import React from 'react';
import Navigation from './src/Navigation';
import {Provider} from 'react-redux';
import {store, persister} from './src/store/Store';
import {PersistGate} from 'redux-persist/es/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
