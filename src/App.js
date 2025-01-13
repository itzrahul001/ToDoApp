import React from 'react';
import './App.css'; // Global styles
import DataTable from './components/DataTable'; // Importing the DataTable component

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Task Manager</h1>
      <DataTable />
    </div>
  );
}

export default App;
