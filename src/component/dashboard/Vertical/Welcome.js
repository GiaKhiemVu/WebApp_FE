import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, Typography } from '@mui/material';

function Welcome(props) {
  const [user, setUser] = useState(props.user)

  useEffect(() => {
    setUser(props.user);
  }, [props.user])

  return (
    <div style={{flexGrow: 0}}>
      <Typography variant="h6">Welcome {user?.FirstName}</Typography>
      <Divider/>
    </div>
  );
}

Welcome.propTypes = {}

export default Welcome
