import { Card, CardContent, Typography } from '@mui/material';

function StatCard({ title, value }) {
  return (
    <Card sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 1 }}>
      <CardContent sx={{ padding: '20px' }}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" color="textPrimary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;