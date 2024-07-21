import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';

const ToolbarSorter = () => {
  const selectRef = useRef(null);

  useEffect(() => {
    // Khởi tạo bootstrap-select sau khi component được render
    if (selectRef.current) {
      $(selectRef.current).selectpicker();
    }

    // Cleanup: Hủy khởi tạo bootstrap-select khi component unmount
    return () => {
      if (selectRef.current) {
        $(selectRef.current).selectpicker('destroy');
      }
    };
  }, []);

  return (
    <div className="toolbar-sorter-right">
      <span>Sort by </span>
      <select
        id="basic"
        className="selectpicker show-tick form-control"
        data-placeholder="$ USD"
        ref={selectRef}
      >
        <option data-display="Select">Nothing</option>
        <option value={1}>Popularity</option>
        <option value={2}>High Price → High Price</option>
        <option value={3}>Low Price → High Price</option>
        <option value={4}>Best Selling</option>
      </select>
    </div>
  );
};

export default ToolbarSorter;