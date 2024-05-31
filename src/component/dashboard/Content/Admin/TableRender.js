import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getProductForAdmin, getUserForAdmin } from "@/api/userService";
import { formatString, getAllKeys } from "@/util/arrayUtil";

function TableRender(props) {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchData() {
      try {
        let fetchedData = [];
        if (props.name === "User") {
          fetchedData = await getUserForAdmin().then((res) => res.data); // Ensure you await the async function
          setLabels(getAllKeys(fetchedData[0]));
        } else if (props.name === "Product") {
          fetchedData = await getProductForAdmin().then((res) => res.data);
          setLabels(getAllKeys(fetchedData[0]));
        } else {
          console.log("Write order api");
          // Call your order API here and set fetchedData and labels accordingly
        }
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setData([])
        setLabels([])
      }
    }
    fetchData();
  }, [props.name]);

  return (
    <div className="outerTable">
      <table className="table">
        <thead>
          <tr>
            {labels?.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rIndex) => (
            <tr key={rIndex}>
              {labels.map((label, index) => (
                <td key={rIndex + index}>
                  {row[label] ? formatString(row[label], 24) : "null"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableRender.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TableRender;
