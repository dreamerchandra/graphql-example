import React from 'react';
import {
  usePreloadedQuery,
  useMutation,
} from 'react-relay/hooks';
import List from './List'
import { ApiSkillMutation, FrontEndNameQuery, BackEndNameQuery } from './api'

const FRONT_END_APP_ID = "1";
const BACK_END_APP_ID = "2";

function App({ frontEnd, backEnd }) {
  const backEndSnap = usePreloadedQuery(BackEndNameQuery, backEnd.ref);
  const backEndSkills = backEndSnap.backEnd ? backEndSnap.backEnd.skills.edges : []

  const frontEndSnap = usePreloadedQuery(FrontEndNameQuery, frontEnd.ref);
  const frontEndSkills = frontEndSnap.frontEnd ? frontEndSnap.frontEnd.skills.edges : []

  const [commit, isInFlight] = useMutation(ApiSkillMutation);
  React.useEffect(() => {
    if (!isInFlight) {
      frontEnd.fetch()
      backEnd.fetch()
    }
  }, [isInFlight])
  return (
    <div className="skill-wrapper">
      <div className="skill-card-wrapper">
        <h1>Back End</h1>
        <List items={backEndSkills} onNewItem={(skillName) => commit({
          variables: {
            input: {
              skillName,
              areaId: BACK_END_APP_ID
            }
          }
        })} />
      </div>
      <div className="skill-card-wrapper">
        <h1>Front End</h1>
        <List items={frontEndSkills} onNewItem={(skillName) => commit({
          variables: {
            input: {
              skillName,
              areaId: FRONT_END_APP_ID
            }
          }
        })} />
      </div>
    </div>
  );
}

export default App;