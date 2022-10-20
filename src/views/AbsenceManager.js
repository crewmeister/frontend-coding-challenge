import React, {useEffect,useState} from 'react';
import SearchAbsence from "../components/SearchAbsence";
import AbsenceList from "../components/AbsenceList";
import {withBaseLayout} from '../layouts/Base'
import ErrorBoundary from "../error/Error";
import {useDispatch, useSelector} from 'react-redux';
import Paper from "@material-ui/core/Paper";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import {Grid} from "@material-ui/core";

import { getAllAbsences } from '../actions/absences'
import { ColorRing } from  'react-loader-spinner'

function AbsenceManager() {
    const dispatch = useDispatch();

    const absencesList = useSelector((state) => state.absences);

    const [isLoading , setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(getAllAbsences()).then(res => {
            // just to show loader
            setTimeout(() =>{
                setLoading(false)
            },1000)
        })
    },[dispatch])

    const showLoader = (flag) => {
        setLoading(flag)
    }
    

    return (
        <ErrorBoundary>
            <Paper style={{margin: "16px 0"}}>
                <h5>Search Here</h5>
                <SearchAbsence showLoaderHandler={showLoader} />
            </Paper>
            <Paper className='mt-3'>
                <h5 className="mb-3">Absences</h5>

                {
                    isLoading ? (
                        <Paper elevation={3} > 
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /> Loading... 
                        </Paper>  
                    ) : absencesList.length === 0 ? (
                        <Grid
                            container
                            spacing={2}
                            direction="column"
                            alignItems="center"

                        >
                            <Grid item>
                                <Paper elevation={3} > <NotInterestedIcon/> No records found </Paper>
                            </Grid>

                        </Grid>
                    ):<AbsenceList list={absencesList} />
                }
            </Paper>
        </ErrorBoundary>
    )
}

export default withBaseLayout(AbsenceManager)
