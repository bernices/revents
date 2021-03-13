import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function EventFilters(){
    return (
        <>
            <Menu vertical size='large' style={{width:'100%'}}>
                <Header icon='filter' attached color='teal' content='Filter'/>
                <Menu.Item content='All Event'/>
                <Menu.Item content="I'm going"/>
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header icon='calendar' attached color='teal' content='Select date'/>
            <Calendar/>
        </>

    )


}