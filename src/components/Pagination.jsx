import React from "react";

const Pagination = ({
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
  warning,
  setWarning,
}) => {
  const handleLimitChange = (e) => {
    let value = Number(e.target.value);
    if (value > 10) {
      setWarning("Maximum limit is 10. Resetting to 10.");
      value = 10;
    } else if (value < 5) {
      setWarning("Minimum limit is 5. Resetting to 5.");
      value = 5;
    } else {
      setWarning("");
    }
    setLimit(value);
  };

  return (
    <div className="pagination-container">
      <div className="">
        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className={`pagination-button ${page === 1 ? "disabled" : ""}`}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <div className="">
        <span>Limit</span>
        <input
          type="number"
          min="5"
          max="10"
          value={limit}
          onChange={handleLimitChange}
          className="limit-input"
        />
        {warning && <div className="warning">{warning}</div>}
      </div>
    </div>
  );
};

export default Pagination;
