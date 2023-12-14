/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "react-datepicker";

function CustomDate({ value, onClick, setSelectDate }: any) {
  setSelectDate(value)
  return (
    <div className="input-group">
      <input type="text" className="form-control" placeholder="yyyy-mm-dd" style={{ height: "30px" }} value={value} readOnly />
      <div className="input-group-append" style={{ cursor: "pointer", }} onClick={onClick} >
        <span className="input-group-text" style={{ height: "30px" }}>
          <i className="fa fa-solid fa-calendar-days" style={{ fontSize: "15px" }}></i>
        </span>
      </div>
    </div>
  )
}

const DatePickers = (props: any) => {
  const [startDate, setStartDate] = useState(null);
  const {setSelectDate} = props

  return (
    <>
      <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} dateFormat="yyyy-MM-dd" customInput={<CustomDate setSelectDate={setSelectDate}/>} />
    </>
  )
}

export default DatePickers