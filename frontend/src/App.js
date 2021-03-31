import React from 'react';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import List from './List'

const BackEndNameQuery = graphql`
  query AppBackEndQuery {
    backEnd {
      id
      name
      skills{
        edges {
          node {
            id
            name
          }
        }
      }
    } 
  }
`;

const FrontEndNameQuery = graphql`
  query AppFrontEndQuery {
    frontEnd {
      id
      name
      skills{
        edges {
          node {
            id
            name
          }
        }
      }
    } 
  }
`;

const backEndPrefetcher = loadQuery(RelayEnvironment, BackEndNameQuery);
const frontEndPreFetcher = loadQuery(RelayEnvironment, FrontEndNameQuery);

function App() {
  const backEndSnap = usePreloadedQuery(BackEndNameQuery, backEndPrefetcher);
  const backEndSkills = backEndSnap.backEnd ? backEndSnap.backEnd.skills.edges : []
  const frontEndSnap = usePreloadedQuery(FrontEndNameQuery, frontEndPreFetcher);
  const frontEndSkills = frontEndSnap.frontEnd ? frontEndSnap.frontEnd.skills.edges : []
  return (
    <div className="App">
      <List items={backEndSkills} onNewItem={(newVal) => console.log(newVal)}/>
      <List items={frontEndSkills} onNewItem={(newVal) => console.log(newVal)}/>
    </div>
  );
}

export default App;