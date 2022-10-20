import * as React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import {Button, Grid, TextField} from '@material-ui/core';



import { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import moment from "moment";



import { getFilteredAbsences } from '../actions/absences'

export default function SearchAbsence({showLoaderHandler}) {

  const dispatch = useDispatch();

  const {register, handleSubmit} = useForm();

  // states
  const [value, setValue] = React.useState(null);

  // handlers
  const handleSearchForm = (formData) => {

    showLoaderHandler(true)

    const filters = {};
    if(value){
        const formated = moment(new Date(value)).format("YYYY-MM-DD");
        filters.date = formated;
    }
    if(formData.type)
        filters.type = formData.type.trim();
    dispatch(getFilteredAbsences(filters)).then(res => setTimeout(()=>{showLoaderHandler(false)},1000))
  }


  return (
    <div className="form-wrapper">
        <form onSubmit={handleSubmit(handleSearchForm)}>
            <Grid container spacing={3}>
                <Grid item sm={3}>
                    <TextField 
                        {...register("type")} 
                        autoFocus 
                        type="text" 
                        id="type"  
                        placeholder="Type" 
                        label="Type" 
                        variant="outlined" 
                        inputProps={{ maxLength: 50 }}
                    />
                </Grid>
                <Grid item sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item sm={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        startIcon={<SearchIcon />}
                        style={{marginTop:"17px"}}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>
    </div>
  )
}
