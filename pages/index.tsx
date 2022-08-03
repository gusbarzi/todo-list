import axios from 'axios'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import User from './components/User';

type CrudUser = {
  id: number;
  name: string;
  email: string;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data)
      })
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 10 }}>
        {
          users.map((user: CrudUser, id) => (
            <Grid item xs={2} sm={4} md={4} key={id}>
              <Link href={`/users/${user.id}`} passHref>
                <a>
                  <User id={user.id} name={user.name} email={user.email} />
                </a>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

export default Home
