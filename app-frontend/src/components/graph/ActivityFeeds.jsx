import { List, ListItem, ListItemText, Typography } from '@mui/material';

function ActivityFeed({ activities }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <List sx={{ minHeight: '200px' }}>
        {activities.length === 0 ? (
          <ListItem>
            <ListItemText primary="No recent activities." secondary="" />
          </ListItem>
        ) : (
          activities.map(activity => (
            <ListItem key={activity.id}>
              <ListItemText primary={activity.description} secondary={activity.timestamp} />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}

export default ActivityFeed;