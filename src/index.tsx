import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ParticipantsTabs from "./components/participants_tabs/participants_tabs";
import 'bootstrap/dist/css/bootstrap.min.css';
import {questions} from "./data/question_data";
import {arcana_categories} from "./data/catagory_data";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <div className="App">
          <ParticipantsTabs questions={questions} categories={arcana_categories} participants={22} />
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
