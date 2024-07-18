import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import styles from './DatePicker.module.css';

const MyDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy/MM/dd"
      // minDate={new Date()}
      // maxDate={new Date().setMonth(new Date().getMonth() + 1)}
      // showTimeSelect
      // timeFormat="HH:mm"
      // timeIntervals={15}
      // timeCaption="time"
      // dateFormat="Pp"
      // className={styles.datePicker}
    />
  );
};

export default MyDatePicker;
