'use client'
import React from 'react';
import { Card, AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Dashboard_navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Website
          </Typography>
          <Typography variant="body1" className={classes.title}>
            Home
          </Typography>
          <Typography variant="body1" className={classes.title}>
            About
          </Typography>
          <Typography variant="body1" className={classes.title}>
            Contact
          </Typography>
          <Card>

          </Card>
        </Toolbar>
      </AppBar>
    </div>
  );
}
