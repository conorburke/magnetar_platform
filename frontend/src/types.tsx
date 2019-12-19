import { number, string, any } from 'prop-types';

export interface user {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  depots: Array<any>;
}

export interface tool {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  depot: any;
  tool_pictures: any;
}
