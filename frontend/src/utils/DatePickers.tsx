/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "react-datepicker";

function CustomDate({ value, onClick }: any) {
  return (
    <div className="input-group">
      <input type="text" className="form-control" placeholder="dd/mm/yyyy" style={{ height: "30px" }} value={value} readOnly />
      <div className="input-group-append" style={{ cursor: "pointer", }}>
        <span className="input-group-text" style={{ height: "30px" }}>
          <i className="fa fa-solid fa-calendar-days" style={{ fontSize: "15px" }} onClick={onClick} ></i>
        </span>
      </div>
    </div>
  )
}

const DatePickers = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <>
      <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} dateFormat="dd/MM/yyyy" customInput={<CustomDate />} />
    </>
  )
}

export default DatePickers