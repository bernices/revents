import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Label } from "semantic-ui-react";

export default function EventDetailedSideBar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length > 1 ? "People" : "Person"} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id} style={{ position: "relative" }}>
              {hostUid === attendee.id && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                  content="Host"
                />
              )}
              <Item.Image
                size="tiny"
                src={attendee.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
