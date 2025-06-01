import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function CustomersTable({ rows }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Customers
      </Typography>
      <Table sx={{ minHeight: '300px' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '16px' }}>ID</TableCell>
            <TableCell sx={{ fontSize: '16px' }}>Name</TableCell>
            <TableCell sx={{ fontSize: '16px' }}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="body1" color="textSecondary">
                  No customers found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomersTable;