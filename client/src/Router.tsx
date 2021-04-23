// imports
import { Router } from 'react-typesafe-routes';
import { HomePage, AbsenceListPage } from './pages';

export const router = Router(route => ({
    home: route('/', {
        component: HomePage,
    }),
    absenceList: route('absenceList', {
        component: AbsenceListPage,
    }),
}));
