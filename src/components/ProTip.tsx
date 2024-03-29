import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import LightBulbIcon from 'svg-icons/LightBulbIcon';


export default function ProTip() {
  return (
    <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary" align="center">
      <LightBulbIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
      Pro tip: See more <Link href="https://mui.com/getting-started/templates/">templates</Link> on
      the MUI documentation.
    </Typography>
  );
}
