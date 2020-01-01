import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import Camera from './Camera';
import url from '../utils';
import { fetchProfile } from '../actions';

const categories = [
  'Power Tools',
  'Hand Tools',
  'Lighting',
  'Safety',
  'Automotive',
  'Compressors',
  'Cleaning',
  'Electrical',
  'Excavation',
  'Generators',
  'Heaters',
  'Gardening',
  'Material Handling',
  'Towing',
  'Winches'
];
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  },
  paper: {
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
  cameraButton: {
    margin: theme.spacing(1)
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

const createTool = `
  mutation AddTool($title: String, $category: String, $description: String, $price: Float, $depot_id: ID) {
    addTool(title: $title, category: $category, description: $description, price: $price, depot_id: $depot_id) {
      title
      category
    }
  }
`;

interface depotMicro {
  id: string;
  address_1: string;
}

const CreateTool: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [depot, setDepot] = React.useState(0);
  const [updated, setUpdated] = React.useState(false);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [cardImage, setCardImage] = React.useState();

  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);

  const profileId = useSelector((state: any) => state.profile.id);
  const depotList = useSelector((state: any) => state.profile.depots);

  const dispatch = useDispatch();

  const handleTitleChange = React.useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const handleCategoryChange = React.useCallback(e => {
    setCategory(e.target.value);
  }, []);

  const handleDescriptionChange = React.useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const handlePriceChange = React.useCallback(e => {
    setPrice(e.target.value);
  }, []);

  const handleDepotChange = React.useCallback(e => {
    setDepot(e.target.value);
  }, []);

  const handleCreateTool = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url.api}/oracle`, {
        query: createTool,
        variables: {
          title: title,
          category: category,
          description: description,
          price: Number(price),
          depot_id: depot
        }
      })
      .then((res: any) => {
        let bodyFormData = new FormData();
        const currentDate = Date.now();
        const imageFile = new File(
          [cardImage],
          `${currentDate}_tool_for_user_${profileId}.png`
        );
        bodyFormData.append('image', imageFile);
        bodyFormData.append('depotId', depot.toString());
        axios({
          method: 'post',
          url: `${url.api}/createtoolpicture`,
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res: any) => res);
        dispatch(fetchProfile(profileId));
        setUpdated(true);
      })
      .catch((err: any) => console.log('update profile error', err));
  };

  if (updated) {
    return <Redirect to="/mytools" />;
  }

  if (!depotList || depotList.length === 0) {
    return (
      <div className={classes.paper}>
        <Typography component="h5" variant="h5">
          You must create a Depot before creating any tools.
        </Typography>
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h3">
          Create Tool
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleCreateTool}>
          <Typography variant="h6" component="h6" gutterBottom>
            Title
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Title"
            label="Title"
            name="Title"
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            required
            value={title}
            onChange={handleTitleChange}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            Category
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Category
            </InputLabel>
            <Select
              native
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="" />
              {categories.map((e: string) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          {isCameraOpen ? (
            <Camera
              onCapture={(blob: any) => setCardImage(blob)}
              onClear={() => setCardImage(false)}
            />
          ) : null}
          {!isCameraOpen ? (
            <Button
              onClick={() => setIsCameraOpen(true)}
              variant="contained"
              color="primary"
              className={classes.cameraButton}
            >
              Open Camera
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsCameraOpen(false);
                setCardImage(false);
              }}
              variant="contained"
              color="primary"
              className={classes.cameraButton}
            >
              Close Camera
            </Button>
          )}
          <Typography variant="h6" component="h6" gutterBottom>
            Description
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Description"
            label="Description"
            name="Description"
            InputLabelProps={{
              shrink: true
            }}
            value={description}
            onChange={handleDescriptionChange}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            Price (per day)
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="price"
            label="Price"
            name="price"
            InputLabelProps={{
              shrink: true
            }}
            value={price}
            onChange={handlePriceChange}
            required
          />
          <Typography variant="h6" component="h6" gutterBottom>
            Depot
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Depot
            </InputLabel>
            <Select native value={depot} onChange={handleDepotChange}>
              <option value="" />
              {depotList ? (
                depotList.map((d: depotMicro) => {
                  return (
                    <option key={d.id} value={d.id}>
                      {d.address_1}
                    </option>
                  );
                })
              ) : (
                <option value="" />
              )}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Tool
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateTool;
