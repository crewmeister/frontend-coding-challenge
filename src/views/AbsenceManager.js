import React, {useEffect,useState} from 'react';
import SearchAbsence from "../components/SearchAbsence";
import AbsencesList from "../components/AbsencesList";
import {withBaseLayout} from '../layouts/Base'
import ErrorBoundary from "../error/Error";
import {useDispatch, useSelector} from 'react-redux';
import Paper from "@material-ui/core/Paper";
import { getAllAbsences } from '../actions/absences'
import Loader from '../components/shared/Loader';
import NoDataFound from '../components/shared/NoDataFound';
import MainHeading from '../components/shared/MainHeading';

function AbsenceManager() {
    const dispatch = useDispatch();

    const absencesList = useSelector((state) => state.absences);

    const [isLoading , setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(getAllAbsences()).then(res => {
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
                <MainHeading title={"Search"} />
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
