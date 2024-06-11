import React, { useState } from 'react';
import './CampFilter.css';

const CampFilter = ({ show, onClose }) => {
    const [region, setRegion] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    if (!show) {
        return null;
    }

    function handleCheckboxChange(e) {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedOptions(prevOptions => [...prevOptions, value]);
        } else {
            setSelectedOptions(prevOptions => prevOptions.filter(option => option !== value));
        }
    }

    function handleConfirm() {
        // 입력된 값을 저장
        // sessionStorage.setItem('region', region);
        // sessionStorage.setItem('checkInDate', checkInDate);
        // sessionStorage.setItem('checkOutDate', checkOutDate);
        // sessionStorage.setItem('selectedOptions', selectedOptions.join(',')); // 각 텍스트를 쉼표로 구분하여 문자열로 저장

        sessionStorage.setItem('filterOption',region + ","+checkInDate +","+ checkOutDate +","+ selectedOptions)


        onClose();

    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                <div className="modal-body">
                    <div className="checkbox-container">
                        <label><input type="checkbox" value="캠핑" onChange={handleCheckboxChange} /> 캠핑</label>
                        <label><input type="checkbox" value="글램핑" onChange={handleCheckboxChange} /> 글램핑</label>
                        <label><input type="checkbox" value="카라반" onChange={handleCheckboxChange} /> 카라반</label>
                        <label><input type="checkbox" value="펜션" onChange={handleCheckboxChange} /> 펜션</label>
                    </div>
                    <div className="input-container">
                        <label>지역</label>
                        <input type="text" placeholder="입력 1" value={region} onChange={(e) => setRegion(e.target.value)} />
                        <label>입실일</label>
                        <input type="date" placeholder="입력 2" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                        <label>퇴실일</label>
                        <input type="date" placeholder="입력 3" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                    </div>
                    <button onClick={handleConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default CampFilter;
