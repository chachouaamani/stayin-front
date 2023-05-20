import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css'; // Import the theme

const DateRangePickerComponent = () => {
  const [selectedRange, setSelectedRange] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
  };

  return (
    <div>
      <DateRangePicker
        ranges={[selectedRange]}
        onChange={handleSelect}
      />
    </div>
  );
};

export default DateRangePickerComponent;
