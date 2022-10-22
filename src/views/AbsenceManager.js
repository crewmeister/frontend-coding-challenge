import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Paper} from "@material-ui/core";
import SearchAbsence from "../components/SearchAbsence";
import AbsencesList from "../components/AbsencesList";
import {withBaseLayout} from '../layouts/Base'
import ErrorBoundary from "../error/Error";
import Loader from '../components/shared/Loader';
import NoDataFound from '../components/shared/NoDataFound';
import MainHeading from '../components/shared/MainHeading';
import { getAllAbsences } from '../actions/absences'

function AbsenceManager() {
    const dispatch = useDispatch();
    // get absences from store
    const absencesList = useSelector((state) => state.absences);
    // states
    const [isLoading , setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(getAllAbsences()).then(res => {
            // just to exibit loader
            setTimeout(() =>{
                setLoading(false)
            },1000)
        })
    },[dispatch])

    // handlers
    const showLoader = (flag) => {
        setLoading(flag)
    }
    
    // html
    return (
        <ErrorBoundary>
            <Paper style={{margin: "16px 0"}}>
                <SearchAbsence showLoaderHandler={showLoader} />
            </Paper>
            <Paper className='mt-3'>
                <MainHeading title={"Absences List"} />
                {
                    isLoading ? (
                        <Loader title={"Loading..."}/>
                    ) : absencesList.length === 0 ? (
                        <NoDataFound title="No Record Found" />
                    ):<AbsencesList list={absencesList} />
                }
            </Paper>
        </ErrorBoundary>
    )
}

export default withBaseLayout(AbsenceManager)
