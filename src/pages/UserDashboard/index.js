import React from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4 }}>
        User Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          aria-label="dashboard tabs"
        >
          <Tab label="My Automations" />
          <Tab label="My Templates" />
        </Tabs>
      </Box>

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 250 }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton>
            <ViewColumnIcon />
          </IconButton>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Scheduled For (UTC)</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Latest Run</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
                  No results.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }}>
        <Typography variant="body2" color="text.secondary">
          0 of 0 row(s) selected.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Rows per page: 10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Page 1 of 1
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
