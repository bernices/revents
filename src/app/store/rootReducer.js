import {combineReducers} from 'redux';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventDashboard/eventreducer';
import testReducer from '../../features/sandbox/testReducer';
import modalReducer from '../common/modals/modelReducer';
import asyncReducer from '../async/asyncReducer';
import profileReducer from '../../features/profiles/profileReducer';
import {connectRouter} from 'connected-react-router';
const rootReducer =(history) =>combineReducers({
    test: testReducer,
    event : eventReducer,
    modals : modalReducer,
    auth:authReducer,
    async:asyncReducer,
    profile:profileReducer,
    router:connectRouter(history)
})

export default rootReducer;