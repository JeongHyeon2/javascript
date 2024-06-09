import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function SiteDetail() {
  const [site, setSite] = useState(null);
  const [reservation, setReservation] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adult, setAdult] = useState();
  const [child, setChild] = useState();
  const location = useLocation();
  const today = new Date();
  const navigate = useNavigate();
  useEffect(() => {
    const site_id = location.state.site_id;
    console.log(site_id);
    axios.get(`${process.env.REACT_APP_MY_IP}/site/${site_id}`).then((res) => {
      console.log(res.data[0]);
      setSite(res.data[0]);
    });
    axios
      .get(`${process.env.REACT_APP_MY_IP}/reservation/${site_id}`)
      .then((res) => {
        console.log(res.data);
        setReservation(res.data);
      });
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const disabledDates = reservation.map((res) => {
    const checkOutDate = new Date(res.checkout);
    checkOutDate.setDate(checkOutDate.getDate() - 1); // Subtract one day from the checkout date
    return checkOutDate;
  });
  const makeReservation = () => {
    const body = {
      siteId: location.state.site_id,
      userNum: localStorage.getItem("user_num"),
      adult: adult,
      child: child,
      checkIn: startDate,
      checkOut: endDate,
    };
    console.log(body);
    axios
      .post(`${process.env.REACT_APP_MY_IP}/reservation`, body)
      .then((res) => {
        alert("예약 성공");
        navigate("/main-page");
      });
  };

  return (
    <div>
      {site && (
        <div>
          <img
            className="registered_img"
            src={`${process.env.REACT_APP_MY_IP}/${site.site_photo_url}`}
            alt="site"
          ></img>
          <div>카테고리: {site.category}</div>
          <div>이름: {site.site_name}</div>
          <div>요금: {site.charge}</div>
          <div>인원수: {site.capacity}</div>
          <div>
            <label>시작 날짜: </label>
            <ReactDatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={today}
              excludeDates={disabledDates}
            />
          </div>
          <div>
            <label>끝 날짜: </label>
            <ReactDatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || today}
              excludeDates={disabledDates}
            />
          </div>
          <label>
            어른{" "}
            <input
              onChange={(e) => {
                setAdult(e.target.value);
              }}
            ></input>
          </label>
          <label>
            아이{" "}
            <input
              onChange={(e) => {
                setChild(e.target.value);
              }}
            ></input>
          </label>
          <button onClick={makeReservation}>요청</button>
        </div>
      )}
    </div>
  );
}
