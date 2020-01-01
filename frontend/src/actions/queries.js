export const toolsQuery = `
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

export const toolQuery = `
  query fetchTool($id: ID!) {
    tool (id: $id) {
      id
      title
      description
      category
      price
      tool_pictures {
        image
      }
      depot {
        owner_id
      }
    }
  }
`;

export const usersQuery = `
  {
    users {
      first_name
      last_name
      email
      phone_number
      birth_date
      loan_rating
      borrow_rating
      depots {
        address_1
        address_2
        city
        region
        zipcode
        tools {
          title
          category
          description
          price
          tool_pictures {
            image
          }
        }
      }
      rented_tools {
        tool {
          title
          category
          description
          price
          tool_pictures {
            image
          }
        }
      }
      loaned_tools {
        tool {
          title
          category
          description
          price
          tool_pictures {
            image
          }
        }
        start_date
        end_date
      }
    }
  }
`;

export const profileQuery = `
  query getProfle($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      email
      phone_number
      birth_date
      loan_rating
      borrow_rating
      depots {
        id
        address_1
        address_2
        city
        region
        zipcode
        tools {
          id
          title
          category
          description
          price
          tool_pictures {
            image
          }
        }
      }
      rented_tools {
        tool {
          title
          category
          description
          price
          tool_pictures {
            image
          }
        }
      }
      loaned_tools {
        tool {
          title
          category
          description
          price
          tool_pictures {
            image
          }
        }
        start_date
        end_date
      }
      clientRatings {
        id
        rating
      }
      sellerRatings {
        id
        rating
      }
    }
  }
`;
