import React from 'react'
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import NotInterestedIcon from '@material-ui/icons/NotInterested';

export default function NoDataFound({title}) {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      data-testid="no_data"
    >
      <Grid item>
          <Paper elevation={3} > <NotInterestedIcon/> {title} </Paper>
      </Grid>
    </Grid>
  )
}
