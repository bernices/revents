import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../../app/async/asyncReducer';
import {CLEAR_EVENTS, CREATE_EVENT,DELETE_EVENT,FETCH_EVENTS,LISTEN_TO_EVENT_CAHT,LISTEN_TO_SELECTED_EVENT,UPDATE_EVENT} from './eventConstants';
import {dataFromSnapshot, fetchEventsFromFirestore} from '../../../app/firestore/firestoreService'
export function createEvent(event){
    return{
        type:CREATE_EVENT,
        payload:event

    }
}

export function updateEvent(event){
    return{
        type:UPDATE_EVENT,
        payload:event

    }
}

export function deleteEvent(eventId){
    return{
        type:DELETE_EVENT,
        payload:eventId

    }
}
export function fetchEvents(predicate,limit,lastDocSnapshot){
    return async function (dispatch){
        dispatch(asyncActionStart())
        try{
            const snapshot = await fetchEventsFromFirestore(predicate,limit,lastDocSnapshot).get();
            const lastVisible = snapshot.docs[snapshot.docs.length-1];
            const moreEvents = snapshot.docs.length >= limit;
            const events = snapshot.docs.map(doc => dataFromSnapshot(doc));
            dispatch({type:FETCH_EVENTS,payload:{events,moreEvents}});
            dispatch(asyncActionFinish());
            return lastVisible;
        }catch(error){
            dispatch(asyncActionError(error));
        }
    }
}

export function listenToSelectedEvents(events){
    return{
        type:LISTEN_TO_SELECTED_EVENT,
        payload:events

    }
}

export function listenToEventChat(comments){
    return{
        type:LISTEN_TO_EVENT_CAHT,
        payload:comments
    }
}

export function clearEvents(){
    return{
        type:CLEAR_EVENTS,
    }
}