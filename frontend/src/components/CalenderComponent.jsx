import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default CSS for react-calendar
import './styles/calendar.css'; 
import moment from "moment"
import { useSelector } from 'react-redux';
import { setDate } from '../redux/slices/expense';
import { useNavigate } from 'react-router-dom';
const CalenderComponent = () => {
  
      const navigate = useNavigate();
      const {dates} = useSelector((state)=>state.expense)
      const [selectedDate, setSelectedDate] = useState(new Date);
      
      const handleDateClick = date => {  
        const formattedDate = moment(date).format('MMM Do YY');
        navigate(`/dashboard/${formattedDate}`);
      };
    
      return (
        <div className='d-flex flex-column align-items-center gap-2 w-75'>
          <h2>Calendar</h2>
          <Calendar
            // onChange={handleDateChange}
            value={selectedDate.toDateString()}
            onClickDay={handleDateClick}
            tileClassName={({ date, view }) => {
              if (dates.find((x) => x === moment(date).format("MMM Do YY"))) {
                return "highlight";
              }
            }}
          />
        </div>
      );
}

export default CalenderComponent

