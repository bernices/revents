import { React, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import { listenToEvents } from "../../eventDashboard/eventActions";
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { categoryData } from "../../../../app/api/categoryOptions";
import MyDateInput from "../../../../app/common/form/MyDateInput";
import {
  addEventToFirestore,
  cancelEventToggle,
  listernToEventFromFirestore,
  updateEventInFirestore,
} from "../../../../app/firestore/firestoreService";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import useFirestoreDoc from "../../../../app/hooks/useFirestoreDoc";
import { toast } from "react-toastify";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const [loadingCancel, setloadingCancel] = useState(false);
  const [confrimOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a description"),
    city: Yup.string().required("You must provide a city"),
    venue: Yup.string().required("You must provide a venue"),
    date: Yup.string().required("You must provide a date"),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setloadingCancel(true);
    try {
      await cancelEventToggle(event);
      setloadingCancel(false);
    } catch (error) {
      setloadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listernToEventFromFirestore(match.params.id),
    data: (selectedEvent) => dispatch(listenToEvents([selectedEvent])),
    deps: [match.params.id],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <MyTextArea name="description" placeholder="Description" rows="3" />
            <Header sub color="teal" content="Event Location Details" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <MyDateInput
              name="date"
              placeholderText="date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate event"
                    : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure?"
            : "This will cancel the event - are you sure?"
        }
        open={confrimOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
