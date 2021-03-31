import React from 'react';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  loadQuery,
  usePreloadedQuery,
  useMutation
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

const FRONT_END_APP_ID = "1";
const BACK_END_APP_ID = "2";

function App() {
  const backEndSnap = usePreloadedQuery(BackEndNameQuery, backEndPrefetcher);
  const backEndSkills = backEndSnap.backEnd ? backEndSnap.backEnd.skills.edges : []
  
  const frontEndSnap = usePreloadedQuery(FrontEndNameQuery, frontEndPreFetcher);
  const frontEndSkills = frontEndSnap.frontEnd ? frontEndSnap.frontEnd.skills.edges : []

  const [commit, isInFlight] = useMutation(graphql`
    mutation AppFrontEndMutation($input: IntroduceSkillInput!) {
      introduceSkill(input: $input) {
        skill {
          name
          id
        }
      }
    }
  `);
  return (
    <div className="App">
      <List items={backEndSkills} onNewItem={(skillName) => commit({
        variables: {
          input: {
            skillName,
            areaId: BACK_END_APP_ID
          }
        }
      })}/>
      <List items={frontEndSkills} onNewItem={(skillName) => commit({
        variables: {
          input: {
            skillName,
            areaId: FRONT_END_APP_ID
          }
        }
      })}/>
    </div>
  );
}

export default App;