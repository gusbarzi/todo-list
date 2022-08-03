import * as React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Box, Button, CardActions, CardContent, Card, Typography } from '@mui/material';
import Link from 'next/link';

type UserType = {
  id: number,
  email: string,
  name: string,
}

const useStyles = makeStyles((theme) => ({
  container: {
   justifyContent: 'center',
   alignItems: 'center',
   display: 'flex',
   marginTop: 30,
   marginLeft: 350,
  }
}))


const User = ({ id: ide, email, name }: UserType) => {
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <Card sx={{ minWidth: 400, boxShadow: 8}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${ide} - ${name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Email: ${email}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/users/${ide}`}>
            <Button size="small">View tasks</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  )
}

export default User