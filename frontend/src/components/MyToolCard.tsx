import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { tool } from '../types';
import clawHammer from '../images/claw_hammer.jpg';
import sawzall from '../images/sawzall.jpg';
import url from '../utils';
import { ToolCardProps } from './ToolCard';
import { fetchProfile } from '../actions';

const deleteTool = `
  mutation DeleteTool($id: ID) {
    deleteTool(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  card: {
    maxWidth: '28%',
    minWidth: '300px',
    margin: 20,
    border: '2px solid whitesmoke',
    borderRadius: '10px'
  },
  delete: {
    color: 'red'
  }
});

interface MyToolCardProps extends ToolCardProps {
  profileId: string | number;
}

const MyToolCard: React.FC<MyToolCardProps> = ({
  data,
  profileId
}: {
  data: tool;
  profileId: string | number;
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  function handleDelete(id: string | number, title: string) {
    axios
      .post(`${url.api}/oracle`, {
        query: deleteTool,
        variables: {
          id
        }
      })
      .then((res: any) => {
        alert(`Deleted Tool: ${title}`);
        dispatch(fetchProfile(profileId));
      });
  }

  return (
    <Card className={`${classes.card} project-card`}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          width="100%"
          image={
            data.tool_pictures[0]
              ? data.tool_pictures[0].image
              : data.title.toLowerCase().includes('saw')
                ? sawzall
                : clawHammer
          }
          title={data.title || 'Tool'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Cost: $${data.price} per day `}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardActions>
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
        <CardActions>
          <Button
            size="small"
            onClick={handleDelete.bind(data, data.id, data.title)}
          >
            <DeleteForeverIcon className={classes.delete} />
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default MyToolCard;
