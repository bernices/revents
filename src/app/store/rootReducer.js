import {combineReducers} from 'redux';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventDashboard/eventreducer';
import testReducer from '../../features/sandbox/testReducer';
import modalReducer from '../common/modals/modelReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
    test: testReducer,
    event : eventReducer,
    modals : modalReducer,
    auth:authReducer,
    async:asyncReducer
})

export default rootReducer;