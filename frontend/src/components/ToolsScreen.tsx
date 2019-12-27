import React from 'react';
import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';

import Tools from './Tools';

const tools = gql`
  {
    tools {
      id
      title
      category
      description
      price
      depot {
        id
        owner_id
        owner {
          id
          first_name
          last_name
          loan_rating
        }
      }
      tool_pictures {
        tool_id
        image
      }
    }
  }
`;

const ToolsScreen: React.FC = () => {
  // const { loading, error, data } = useQuery(tools);
  const { loading, error, data } = useSubscription(tools);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <Tools data={data.tools} />;
};

export default ToolsScreen;
