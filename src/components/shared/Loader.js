import React from 'react'
import Paper from "@material-ui/core/Paper";
import { ColorRing } from  'react-loader-spinner'

export default function Loader({title}) {
  return (
    <Paper elevation={3} data-testid="loader" > 
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> {title}
    </Paper>
  )
}
