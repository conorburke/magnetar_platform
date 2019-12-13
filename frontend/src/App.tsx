import React from "react";
import "./App.css";

// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter, Route } from "react-router-dom";

// import { user } from './types';
import Header from "./components/Header";
import Home from "./components/Home";
import Users from "./components/Users";

// const users = gql`
//   query {
//     users (last: 10) {
//       id
//       email
//       birth_date
//       first_name
//       depots {
//         id
//         address_1
//       }
//     }
//   }
// `;

const App: React.FC = () => {
  // const { loading, error, data } = useQuery(users);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        {/* <header className="App-header">
          {data.users.map((user:user) => (
            <div key={user.id}>
              <p>
                {user.email}
              </p>
            </div>
          ))}
        </header> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
