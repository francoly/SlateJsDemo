import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>SF 富文本编辑器 </h1>
     <Main/>
    </div>
  );
}

export default App;
