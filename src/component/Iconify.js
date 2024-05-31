import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

const Iconify = ({ icon, sx, ...other }) => {
  return <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', ...sx }} {...other}><Icon icon={icon} /></Box>;
};

const FormIconify = ({ icon, sx, ...other }) => {
  return (
    <Box 
      component="span" 
      sx={{border: 1, borderRadius:'50px', width: '35px', height: '35px',marginTop: '10px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }} 
      {...other}
    >
        <Icon icon={icon} />
    </Box>
  );
};

export { Iconify, FormIconify };
