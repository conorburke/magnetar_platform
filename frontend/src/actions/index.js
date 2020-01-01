// import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
  // AUTH_USER,
  AUTHORIZE_USER,
  CREATE_PROFILE,
  // DELETE_TOOL,
  FETCH_TOOL,
  FETCH_TOOLS,
  FETCH_USER_TOOLS,
  FETCH_USERS,
  FILTER_TOOLS,
  FILTER_USERS,
  // SET_PHONE_NUMBER,
  SET_EMAIL,
  SET_PROFILE,
  SET_RENT_END_DATE,
  SET_RENT_START_DATE
} from './types';
import url from '../utils';
import { profileQuery, toolQuery, toolsQuery, usersQuery } from './queries';

export const setEmail = email => {
  return { type: SET_EMAIL, payload: email };
};

export const setProfile = profile => {
  return { type: SET_PROFILE, payload: profile };
};

export const setRentEndDate = date => {
  return { type: SET_RENT_END_DATE, payload: date };
};

export const setRentStartDate = date => {
  return { type: SET_RENT_START_DATE, payload: date };
};

export const fetchProfile = profileId => {
  return function(dispatch) {
    // fetch(`${url.api}/oracle`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     query: profileQuery,
    //     variables: { id: profileId }
    //   })
    // }).then(res => {
    //   dispatch({ type: SET_PROFILE, payload: res.data.data.user });
    // });
    axios
      .post(`${url.api}/oracle`, {
        query: profileQuery,
        variables: { id: profileId }
      })
      .then(res => {
        dispatch({ type: SET_PROFILE, payload: res.data.data.user });
      });
  };
};

export const authorizeUser = () => {
  let token = localStorage.getItem('magnetar_token');
  if (!token) {
    token = sessionStorage.getItem('magnetar_token');
  }

  return function(dispatch) {
    if (token) {
      axios
        .post(`${url.api}/verify`, token, { headers: { Authorization: token } })
        .then(res => {
          if (res.status === 200) {
            dispatch({ type: AUTHORIZE_USER, payload: true });
          }
        })
        .catch(err => console.log(err));
    }
  };
};

export const unauthorizeUser = () => {
  return function(dispatch) {
    sessionStorage.removeItem('magnetar_token');
    localStorage.removeItem('magnetar_token');
    dispatch({ type: AUTHORIZE_USER, payload: false });
  };
};

// for legacy RN app
// export const authUser = token => {
//   return function(dispatch) {
//     if (token) {
//       AsyncStorage.setItem("auth_token", token);
//       dispatch({ type: AUTH_USER, payload: token });
//     } else {
//       AsyncStorage.getItem("auth_token").then(res => {
//         if (res) {
//           dispatch({ type: AUTH_USER, payload: res });
//         } else {
//         }
//       });
//     }
//   };
// };

export const filterTools = text => {
  return { type: FILTER_TOOLS, payload: text };
};

export const filterUsers = text => {
  return { type: FILTER_USERS, payload: text };
};

export const deleteTool = id => {
  return function(dispatch) {
    axios
      .delete(`${url.api}/tools/${id}`)
      .then(res => console.log('delete response', res))
      .then(() =>
        axios
          .get(`${url.api}/tools`)
          .then(res => dispatch({ type: FETCH_TOOLS, payload: res.data }))
      );
  };
};

export const createProfile = profile => {
  return function(dispatch) {
    // AsyncStorage.setItem('auth_token', profile.token.toString());
    dispatch({ type: CREATE_PROFILE, payload: profile });
  };
};

export const fetchTools = () => {
  //return function to have redux-thunk use dispact function
  //normally would just return object, but thunk will see function
  //and apply middleware
  return function(dispatch) {
    axios
      .post(`${url.api}/oracle`, { query: toolsQuery })
      .then(res => dispatch({ type: FETCH_TOOLS, payload: res.data }));
  };
};

export const fetchUsers = () => {
  // return function(dispatch) {
  //   axios.get(`${url.api}/users`).then(res => {
  //     window.console.log('lasjflajsfjsaf', res);
  //     dispatch({ type: FETCH_USERS, payload: res.data });
  //   });
  // };
  return function(dispatch) {
    axios.post(`${url.api}/oracle`, { query: usersQuery }).then(res => {
      dispatch({ type: FETCH_USERS, payload: res.data });
    });
  };
};

export const fetchTool = id => {
  return function(dispatch) {
    axios
      .post(`${url.api}/oracle`, {
        query: toolQuery,
        variables: { id }
      })
      .then(res => dispatch({ type: FETCH_TOOL, payload: res.data }));
  };
};

export const fetchUserTools = id => {
  return function(dispatch) {
    axios
      .get(`${url.api}/users/${id}/tools`)
      .then(res => dispatch({ type: FETCH_USER_TOOLS, payload: res.data }));
  };
};
