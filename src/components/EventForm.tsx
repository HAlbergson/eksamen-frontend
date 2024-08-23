import React, { Component } from "react";
import { createEvent, updateEvent, fetchEventById } from "../services/EventService"; 
import { EventCreatePayload, Event } from "../services/EventService"; 

interface EventFormProps {
  eventId?: number;
  onSave: (event: Event) => void;
}

interface EventFormState {
  formData: EventCreatePayload;
}

class EventForm extends Component<EventFormProps, EventFormState> {
  constructor(props: EventFormProps) {
    super(props);
    this.state = {
      formData: {
        minimumDuration: "",
        maximumParticipants: 0,
        participantGender: "",
        participantAgeGroup: "",
        timeSlot: { id: 0 },
        track: { id: 0 },
        discipline: { id: 0 },
      },
    };
  }

  componentDidMount() {
    const { eventId } = this.props;
    if (eventId) {
      fetchEventById(eventId).then((event) => {
        this.setState({
          formData: {
            minimumDuration: event.minimumDuration,
            maximumParticipants: event.maximumParticipants,
            participantGender: event.participantGender,
            participantAgeGroup: event.participantAgeGroup,
            timeSlot: { id: event.timeSlot.id },
            track: { id: event.track.id },
            discipline: { id: event.discipline.id },
          },
        });
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EventCreatePayload) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [field]: { id: Number(value) } as any,
      },
    }));
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { eventId, onSave } = this.props;
    const { formData } = this.state;

    try {
      let savedEvent;
      if (eventId) {
        savedEvent = await updateEvent(eventId, formData);
      } else {
        savedEvent = await createEvent(formData);
      }
      onSave(savedEvent);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  render() {
    const { eventId } = this.props;
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Minimum Duration:</label>
          <input type="text" name="minimumDuration" value={formData.minimumDuration} onChange={this.handleChange} required />
        </div>
        <div>
          <label>Maximum Participants:</label>
          <input type="number" name="maximumParticipants" value={formData.maximumParticipants} onChange={this.handleChange} required />
        </div>
        <div>
          <label>Participant Gender:</label>
          <input type="text" name="participantGender" value={formData.participantGender} onChange={this.handleChange} required />
        </div>
        <div>
          <label>Participant Age Group:</label>
          <input type="text" name="participantAgeGroup" value={formData.participantAgeGroup} onChange={this.handleChange} required />
        </div>
        <div>
          <label>Time Slot ID:</label>
          <input type="number" name="timeSlot" value={formData.timeSlot.id} onChange={(e) => this.handleNumberChange(e, "timeSlot")} required />
        </div>
        <div>
          <label>Track ID:</label>
          <input type="number" name="track" value={formData.track.id} onChange={(e) => this.handleNumberChange(e, "track")} required />
        </div>
        <div>
          <label>Discipline ID:</label>
          <input type="number" name="discipline" value={formData.discipline.id} onChange={(e) => this.handleNumberChange(e, "discipline")} required />
        </div>
        <button type="submit">{eventId ? "Update Event" : "Create Event"}</button>
      </form>
    );
  }
}

export default EventForm;
