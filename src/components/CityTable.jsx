import { FLAGURL } from "../../constants";

const CityTable = ({ data, loading, query }) => {
  return (
    <div className="city-table-container">
      {loading && <div className="loader">Loading...</div>}
      <table className="city-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {!query ? (
            <tr>
              <td colSpan="3">Start searching....</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="3">No result found</td>
            </tr>
          ) : (
            
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  {item.country}{" "}
                  <img
                    src={`${FLAGURL}/${item.countryCode}/flat/16.png`}
                    alt="flag"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
