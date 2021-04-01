// @flow
import React from 'react';
import {
  usePreloadedQuery,
  useMutation,
} from 'react-relay/hooks';
import List from './List'
import { ApiSkillMutation, FrontEndNameQuery, BackEndNameQuery } from './api'
import { apiBackEndQuery } from "./__generated__/apiBackEndQuery.graphql"
import { apiFrontEndQuery } from "./__generated__/apiFrontEndQuery.graphql"
import { apiSkillMutation } from "./__generated__/apiSkillMutation.graphql"

const FRONT_END_APP_ID = "1";
const BACK_END_APP_ID = "2";

type PropsSub = {
  ref: number,
  fetch: Function,
};

type Props = {
  frontEnd: PropsSub,
  backEnd: PropsSub,
};

function App(props: Props): React$Element<any> {
  const { frontEnd: _frontEnd, backEnd: _backEnd } = props;
  const { current: frontEnd } = React.useRef(_frontEnd);
  const { current: backEnd } = React.useRef(_backEnd);

  const backEndSnap = usePreloadedQuery<apiBackEndQuery>(BackEndNameQuery, backEnd.ref);
  const backEndSkills = backEndSnap.backEnd ? backEndSnap.backEnd.skills.edges : []

  const frontEndSnap = usePreloadedQuery<apiFrontEndQuery>(FrontEndNameQuery, frontEnd.ref);
  const frontEndSkills = frontEndSnap.frontEnd ? frontEndSnap.frontEnd.skills.edges : []

  const [commit, isInFlight] = useMutation<apiSkillMutation>(ApiSkillMutation);

  React.useEffect(() => {
    console.log('rerending')
    if (!isInFlight) {
      frontEnd.fetch()
      backEnd.fetch()
    }
  }, [isInFlight, frontEnd, backEnd])

  return (
    <div className="skill-wrapper">
      <div className="skill-card-wrapper">
        <h1>Back End</h1>
        <List label="back end" items={backEndSkills} onNewItem={(skillName) => commit({
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
        <List label="front end" items={frontEndSkills} onNewItem={(skillName) => commit({
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