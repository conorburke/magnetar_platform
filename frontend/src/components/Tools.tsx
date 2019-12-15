import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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
        }
      }
    }
  }
`;

const Tools: React.FC = () => {
  const { loading, error, data } = useQuery(tools);

  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <header className="App-header">
      {data.tools.map((tool: any) => (
        <div key={tool.id}>
          <p>{tool.title}</p>
        </div>
      ))}
    </header>
  );
};

export default Tools;
