import React, { useCallback } from 'react';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  loadQuery,
  usePreloadedQuery,
  useMutation,
  useQueryLoader
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import List from './List'
const AppBackEndQuery = require('./__generated__/AppBackEndQuery.graphql');
const AppFrontEndQuery = require('./__generated__/AppFrontEndQuery.graphql');

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

function App({ frontEnd, backEnd }) {
  const backEndSnap = usePreloadedQuery(BackEndNameQuery, backEnd.ref);
  const backEndSkills = backEndSnap.backEnd ? backEndSnap.backEnd.skills.edges : []
  
  const frontEndSnap = usePreloadedQuery(FrontEndNameQuery, frontEnd.ref);
  const frontEndSkills = frontEndSnap.frontEnd ? frontEndSnap.frontEnd.skills.edges : []

  const [commit, isInFlight] = useMutation(graphql`
    mutation AppSkillMutation($input: IntroduceSkillInput!) {
      introduceSkill(input: $input) {
        skill {
          name
          id
        }
      }
    }
  `);
  React.useEffect(() => {
    if(!isInFlight){
      frontEnd.fetch()
      backEnd.fetch()
    }
  }, [isInFlight])
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



function AppWrapper(){
  const [frontEndRef, loadQueryFrontEnd] = useQueryLoader(
    AppFrontEndQuery,
    frontEndPreFetcher
  );
  const [backEndRef, loadQueryBackEnd] = useQueryLoader(
    AppBackEndQuery,
    backEndPrefetcher
  );
  const refreshFrontEnd = (variables) => {
    loadQueryFrontEnd(variables, {fetchPolicy: 'network-only'});
  };
  const refreshBackEnd = (variables) => {
    loadQueryBackEnd(variables, {fetchPolicy: 'network-only'});
  };
  return (
    <React.Suspense fallback="Loading query...">
      <App
        frontEnd={{
          ref: frontEndRef,
          fetch: refreshFrontEnd
        }}
        backEnd={{
          ref: backEndRef,
          fetch: refreshBackEnd
        }}
      />
    </React.Suspense>
  )
}

export default AppWrapper;