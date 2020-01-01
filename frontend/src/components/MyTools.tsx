import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import MyToolCard from './MyToolCard';

const MyTools: React.FC = () => {
  const profile = useSelector((state: any) => state.profile);

  function flattenTools(profile: any) {
    if (profile.depots && profile.depots.length > 0) {
      return profile.depots
        .map((depot: any) => {
          return depot.tools.map((tool: any) => tool);
        })
        .flat();
    }
    return [];
  }

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        My Tools
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}
      >
        {profile.depots && profile.depots.length > 0 ? (
          flattenTools(profile).map((tool: any) => {
            return (
              <MyToolCard key={tool.id} data={tool} profileId={profile.id} />
            );
          })
        ) : (
          <Typography variant="h6" component="h6" gutterBottom>
            You haven't created any tools.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MyTools;
