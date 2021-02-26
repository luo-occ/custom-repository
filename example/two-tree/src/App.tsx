import React from 'react';
import ModelTree from './trees/modelTree'
import StateTree from './trees/stateTree'
import './App.css';

function App() {
  return (
    <div className="App">
      <ModelTree/>
      <StateTree/>
    </div>
  );
}

export default App;
