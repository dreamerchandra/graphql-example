
import graphql from 'babel-plugin-relay/macro';

const BackEndNameQuery: graphql.GraphQLTaggedNode = graphql`
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

const FrontEndNameQuery: graphql.GraphQLTaggedNode = graphql`
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

const ApiSkillMutation: graphql.GraphQLTaggedNode = graphql`
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