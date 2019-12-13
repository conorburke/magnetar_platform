import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { user } from "../types";

const users = gql`
  query {
    users {
      id
      email
      birth_date
      first_name
      depots {
        id
        address_1
      }
    }
  }
`;

const Users: React.FC = () => {
  const { loading, error, data } = useQuery(users);

  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <header className="App-header">
      {data.users.map((user: user) => (
        <div key={user.id}>
          <p>{user.email}</p>
        </div>
      ))}
    </header>
  );
};

export default Users;
