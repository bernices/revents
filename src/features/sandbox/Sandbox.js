import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modelReducer';
import { increment,decrement} from './testReducer';

export default function Sandbox(){
    const data = useSelector(state => state.test.data)
    const dispatch = useDispatch();
    return (
        <>
            <h1>Testing 123</h1>
            <h3>The data is: {data} </h3>
            <Button onClick={ ()=> dispatch(increment(20)) } content='Increment' color='green'/>
            <Button onClick={ ()=> dispatch(decrement(5)) } content='Decrement' color='red'/>
            <Button onClick={ ()=> dispatch(openModal({modalType:"TestModal",modalProps:{data}})) } content='Open Modal' color='teal'/>
        </>
    )

}