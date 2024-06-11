import axios from "axios";
import "./SiteDetail.css";
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
    axios.get(`${process.env.REACT_APP_MY_IP}/site/${site_id}`).then((res) => {
      setSite(res.data[0]);
    });
    axios
      .get(`${process.env.REACT_APP_MY_IP}/reservation/${site_id}`)
      .then((res) => {
        setReservation(res.data);
        console.log(res.data);
      });
  }, [location.state.site_id]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const isValidDate = (date) => {
    for (let res of reservation) {
      const resStartDate = new Date(res.check_in);
      const resEndDate = new Date(res.check_out);

      if (
        (startDate >= resStartDate && startDate <= resEndDate) ||
        (startDate >= resStartDate && date <= resEndDate) ||
        (startDate <= resStartDate && date >= resEndDate) ||
        (startDate <= resStartDate && date >= resEndDate)
      ) {
        return false; // 날짜가 겹침
      }
    }
    return true; // 날짜가 겹치지 않음
  };

  const handleEndDateChange = (date) => {
    setEndDate(() => date);
    if (!isValidDate(date)) {
      alert("잘못된 날짜입니다");
      setEndDate(() => null);
    }
  };

  const makeReservation = () => {
    const body = {
      siteId: location.state.site_id,
      userNum: localStorage.getItem("user_num"),
      adult: adult,
      child: child,
      checkIn: startDate,
      checkOut: endDate,
    };
    axios
      .post(`${process.env.REACT_APP_MY_IP}/reservation`, body)
      .then((res) => {
        alert("예약 성공");
        navigate("/main-page");
      });
  };

  const getReservedDates = () => {
    return reservation.flatMap((res) => {
      const checkInDate = new Date(res.check_in);
      const checkOutDate = new Date(res.check_out);
      const dates = [];
      for (
        let d = new Date(checkInDate);
        d <= checkOutDate;
        d.setDate(d.getDate() + 1)
      ) {
        dates.push(new Date(d));
      }
      return dates;
    });
  };

  const reservedDates = getReservedDates();

  const renderDayContents = (day, date) => {
    var s = "대기";
    const isReserved = reservedDates.some((reservedDate) => {
      if (
        reservedDate.getFullYear() === date.getFullYear() &&
        reservedDate.getMonth() === date.getMonth() &&
        reservedDate.getDate() === date.getDate()
      ) {
        reservation.map((res) => {
          const d1 = new Date(res.check_in);

          const d2 = new Date(res.check_out);

          if (
            d1.toDateString() === reservedDate.toDateString() ||
            d2.toDateString() === reservedDate.toDateString()
          ) {
            if (res.approval == "approve") {
              s = "";
            }
          }
        });
        return true;
      }
    });
    return (
      <div>
        <span>{day}</span>
        {isReserved && <div className="reserved">{s}</div>}
      </div>
    );
  };

  return (
    <div>
      {site && (
        <div className="SiteDetailContainer">
          <img
            className="registered_img"
            src={`${process.env.REACT_APP_MY_IP}/${site.site_photo_url}`}
            alt="site"
          />
          <div>카테고리: {site.category}</div>
          <div>이름: {site.site_name}</div>
          <div>요금: {site.charge}</div>
          <div>인원수: {site.capacity}</div>
          <div>
            <label>시작 날짜: </label>
            <ReactDatePicker
              className="datepicker"
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={today}
              excludeDates={reservedDates}
              renderDayContents={renderDayContents}
            />
          </div>
          <div>
            <label>끝 날짜: </label>
            <ReactDatePicker
              className="datepicker"
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || today}
              excludeDates={reservedDates}
              renderDayContents={renderDayContents}
            />
          </div>
          <label>
            어른{" "}
            <input
              type="number"
              onChange={(e) => {
                setAdult(e.target.value);
              }}
            />
          </label>
          <label>
            아이{" "}
            <input
              type="number"
              onChange={(e) => {
                setChild(e.target.value);
              }}
            />
          </label>
          <button onClick={makeReservation}>요청</button>
        </div>
      )}
    </div>
  );
}
