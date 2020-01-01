import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ToolCard from './ToolCard';
import { tool } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 400
      }
    }
  })
);

interface ToolsProps {
  data: Array<tool>;
}

const Tools: React.FC<ToolsProps> = props => {
  const [toolType, setToolType] = React.useState('');
  const classes = useStyles();

  const handleSetToolTypeChange = React.useCallback(e => {
    setToolType(e.target.value);
  }, []);

  function filterTools(input: string, data: tool) {
    if (toolType === '') {
      return true;
    }
    input = input.toLowerCase().trim();
    const title = data.title.toLowerCase();
    const category = data.category.toLowerCase();
    const description = data.description.toLowerCase();

    if (
      title.includes(input) ||
      category.includes(input) ||
      description.includes(input)
    ) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        Tools
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Keyword Search"
          value={toolType}
          onChange={handleSetToolTypeChange}
        />
      </form>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}
      >
        {props.data.map((tool: any) => {
          if (filterTools(toolType, tool)) {
            return <ToolCard key={tool.id} data={tool} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tools;
