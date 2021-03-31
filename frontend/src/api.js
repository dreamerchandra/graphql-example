
import graphql from 'babel-plugin-relay/macro';

const BackEndNameQuery = graphql`
  query apiBackEndQuery {
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
  query apiFrontEndQuery {
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

const ApiSkillMutation = graphql`
    mutation apiSkillMutation($input: IntroduceSkillInput!) {
      introduceSkill(input: $input) {
        skill {
          name
          id
        }
      }
    }
  `

export {
  BackEndNameQuery,
  FrontEndNameQuery,
  ApiSkillMutation,
}