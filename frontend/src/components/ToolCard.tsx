import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { tool } from '../types';
import clawHammer from '../images/claw_hammer.jpg';
import sawzall from '../images/sawzall.jpg';

const useStyles = makeStyles({
  card: {
    maxWidth: '28%',
    minWidth: '300px',
    margin: 20,
    border: '2px solid whitesmoke',
    borderRadius: '10px'
  }
});

interface ToolCardProps {
  data: tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ data }: { data: tool }) => {
  const classes = useStyles();

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
      <CardActions>
        <Button size="small" color="primary">
          <a href="#" rel="noopener noreferrer">
            Details
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ToolCard;
