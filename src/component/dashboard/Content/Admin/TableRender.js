import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserForAdmin } from "@/api/userService";
import {
  DataComparator,
  formatString,
  getAllKeys,
} from "@/util/arrayUtil";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import { labelException, labelRequired } from "@/util/labelHandle";
import { getProductForAdmin, getCategoryForAdmin, updateProduct } from "@/api/productService";

const compareObject = new DataComparator();

function TableRender(props) {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [editableCell, setEditableCell] = useState(null);
  const [showSaveInfo, setShowSaveInfo] = useState(null);
  const [labelProhibition, setLabelProhibition] = useState(null)
  const [labelRequire, setLabelRequire] = useState(null)

  const saveAlert = (message) => {
    setShowSaveInfo(message);

    setTimeout(() => {
      setShowSaveInfo(null);
    }, 3000);
  };

  const updateRow = (e, rIndex, label) => {
    const newData = [...data];
    if (e.target.value !== "null") {
      newData[rIndex][label] = e.target.value;
    } else {
      newData[rIndex][label] = null;
    }
    setData(newData);
  };

  const deleteRow = (item) => {
    const updatedData = data.filter((row) => row !== item);
    setData(updatedData);
  };

  const addRow = () => {
    const updatedData = [...data];
    let rowData = {};
    for (let index in labels) {
      rowData[labels[index]] = null;
    }
    updatedData.push(rowData);
    setData(updatedData);
  };

  const save = async () => {
    if (compareObject.isSameData(data)) {
      saveAlert("Dont have any changes to save!");
      return;
    }
    for (let row of data) {
      for (let label of labelRequire) {
        if (!row[label]) {
          saveAlert(`Error: ${label} is required.`);
          return;
        }
      }
    }

    try {
      await updateProduct(compareObject.compare(data));
      compareObject.loadOriginData(data)
      saveAlert("Data saved successfully");
      compareObject.loadOriginData(data);
    } catch (error) {
      saveAlert("Error saving data");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let fetchedData = [];
        if (props.name === "User") {
          fetchedData = await getUserForAdmin().then((res) => res.data);
          setLabels(getAllKeys(fetchedData[0]));
          setLabelProhibition(labelException.user);
          setLabelRequire(labelRequired.user)
        } else if (props.name === "Product") {
          fetchedData = await getProductForAdmin().then((res) => res.data);
          setLabels(getAllKeys(fetchedData[0]));
          setLabelProhibition(labelException.product);
          setLabelRequire(labelRequired.product);
        } else if(props.name === "Category"){
          fetchedData = await getCategoryForAdmin().then((res) => res.data);
          setLabels(getAllKeys(fetchedData[0]));
          setLabelProhibition(labelException.category);
          setLabelRequire(labelRequired.category);
        }else {
          console.log("Write order api");
          // Call your order API here and set fetchedData and labels accordingly
        }
        compareObject.loadOriginData(fetchedData);
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setData([]);
        setLabels([]);
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
              <th key={index} className="tableHeader" scope="col">
                {label}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rIndex) => (
            <tr key={rIndex} className="tableRow" scope="row">
              {labels.map((label, index) => (
                <td
                  key={rIndex + index}
                  className={"tableCell"}
                  style={{
                    ...(label && labelProhibition.includes(label)
                      ? { backgroundColor: "lightgray" }
                      : {}),
                  }}
                  onDoubleClick={() => {
                    if (!label || !labelProhibition.includes(label)) {
                      setEditableCell({ rIndex, index });
                    } else {
                      saveAlert("The column cannot change");
                    }
                  }}
                >
                  {editableCell &&
                  editableCell.rIndex === rIndex &&
                  editableCell.index === index ? (
                    <input
                      type="text"
                      value={row[label]?row[label]:""}
                      onChange={(e) => updateRow(e, rIndex, label)}
                      onBlur={() => {
                        save();
                        saveAlert("Saving your change")
                      }}
                      style={{ width: "100%" }}
                    />
                  ) : row[label] ? (
                    formatString(row[label], 24)
                  ) : (
                    "null"
                  )}
                </td>
              ))}
              <td className="tableCell">
                <Button className="removeBtn" onClick={() => deleteRow(row)}>
                  <Icon icon="typcn:delete" className="icon" />
                </Button>
              </td>
            </tr>
          ))}
          {props.name !== "User" && (
            <tr>
              <td colSpan={labels?.length + 1} className="center">
                <Button
                  className="center"
                  style={{ width: "100%" }}
                  onClick={() => addRow()}
                >
                  Add more
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {props.name !== "User" && <Button variant="outlined" onClick={() => {save()}}>Save</Button>}
      {showSaveInfo && <div className="saveInfoBox">{showSaveInfo}</div>}
    </div>
  );
}

TableRender.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TableRender;
