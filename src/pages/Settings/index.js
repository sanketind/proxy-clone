import React from 'react';
import {
  Box,
  Typography,
  Switch,
  Button,
  Paper,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
}));

const SettingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const Settings = () => {
  const [storeCookies, setStoreCookies] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Section>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Browser Cookies
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Enabling Cookies via Proxy is safe. We use industry-standard encryption to protect your data.{' '}
          <Link href="#" color="primary">
            Read more
          </Link>
        </Typography>

        <SettingRow>
          <Typography variant="body1">Store Cookies</Typography>
          <Switch
            checked={storeCookies}
            onChange={(e) => setStoreCookies(e.target.checked)}
            color="primary"
          />
        </SettingRow>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setStoreCookies(false)}
          sx={{ mt: 2 }}
        >
          Clear Cookies
        </Button>
      </Section>

      <Section>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Notifications
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Keep up to date with your tasks and automations.
        </Typography>

        <SettingRow>
          <Box>
            <Typography variant="body1">Emails from Proxy</Typography>
            <Typography variant="body2" color="text.secondary">
              sanket2531997@gmail.com
            </Typography>
          </Box>
          <Box sx={{ 
            backgroundColor: notifications ? 'primary.light' : '#F1F3F5',
            padding: '4px 12px',
            borderRadius: '16px',
          }}>
            <Typography variant="body2" color={notifications ? 'primary.main' : 'text.secondary'}>
              {notifications ? 'Enabled' : 'Disabled'}
            </Typography>
          </Box>
        </SettingRow>
      </Section>
    </Box>
  );
};

export default Settings;
