import React, { Component } from "react";
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import '../Calendar/react-big-calendar.css';
import dates from '../Calendar/dates'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [] };
      }
    
      //Fetch trainings
      componentDidMount() {
        this.loadTrainings();
      }
    
      loadTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
          .then(response => response.json())
          .then(jsondata => this.setState({ trainings: jsondata.content }))
          .catch(err => console.error(err));
          console.log(this.state.trainings);
      };

    render() {
        const now = new Date()
        const events = [
            //Test
            {
                id: 0,
                title: 'activity',
                start: now,
                end: now,
              },
        ]
        
        return (
            <div>
                <BigCalendar
                    events={events}
                    views={allViews}
                    step={60}
                    showMultiDayTimes
                    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                    defaultDate={new Date(2015, 3, 1)}
                    localizer={localizer}
                 />
            </div>
        );
    }
}

export default Calendar;
