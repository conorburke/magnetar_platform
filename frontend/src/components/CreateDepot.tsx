import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import url from '../utils';

const regions = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    backgroundColor: 'red',
    opacity: 0.7,
    padding: '5px',
    borderRadius: '10px'
  },
  errorHide: {
    padding: '0px'
  }
}));

const createDepot = `
  mutation CreateDepot($address1: String, $address2: String, $city: String, $region: String, $zipcode: Int, $ownerId: ID) {
    addDepot(address_1: $address1, address_2: $address2, city: $city, region: $region, zipcode: $zipcode, owner_id: $ownerId) {
      id
      address_1
    }
  }
`;

const CreateDepot: React.FC = () => {
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [zipcode, setZipcode] = React.useState(0);
  const [updated, setUpdated] = React.useState(false);

  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  // const handleChange = (name: keyof typeof state) => (
  //   event: React.ChangeEvent<{ value: unknown }>,
  // ) => {
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };

  const profile = useSelector((state: any) => state.profile);

  const handleAddress1Change = React.useCallback(e => {
    setAddress1(e.target.value);
  }, []);

  const handleAddress2Change = React.useCallback(e => {
    setAddress2(e.target.value);
  }, []);

  const handleCityChange = React.useCallback(e => {
    setCity(e.target.value);
  }, []);

  const handleRegionChange = React.useCallback(e => {
    setRegion(e.target.value);
  }, []);

  const handleZipcodeChange = React.useCallback(e => {
    setZipcode(e.target.value);
  }, []);

  const handleCreateDepot = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url.api}/oracle`, {
        query: createDepot,
        variables: {
          address1: address1,
          address2: address2,
          city: city,
          region: region,
          zipcode: zipcode,
          ownerId: profile.id
        }
      })
      .then(() => {
        setUpdated(true);
      })
      .catch((err: any) => {
        console.log('update profile error', err);
      });
  };

  if (updated) {
    return <Redirect to="/mydepots" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h3">
          Create Depot
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleCreateDepot}>
          <Typography variant="h6" component="h6" gutterBottom>
            Address Line 1
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address1"
            label="Address Line 1"
            name="address1"
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            required
            value={address1}
            onChange={handleAddress1Change}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            Address Line 2
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address2"
            label="Address Line 2"
            name="address2"
            InputLabelProps={{
              shrink: true
            }}
            value={address2}
            onChange={handleAddress2Change}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            City
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="city"
            label="City"
            name="city"
            InputLabelProps={{
              shrink: true
            }}
            value={city}
            onChange={handleCityChange}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            State or Region
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              State or Region
            </InputLabel>
            <Select
              native
              value={region}
              onChange={handleRegionChange}
              labelWidth={labelWidth}
            >
              <option value="" />
              {regions.map((e: string) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <Typography variant="h6" component="h6" gutterBottom>
            Zipcode
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="zipcode"
            label="Zipcode"
            name="zipcode"
            InputLabelProps={{
              shrink: true
            }}
            value={zipcode}
            onChange={handleZipcodeChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Depot
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateDepot;
