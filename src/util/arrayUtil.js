export const getAllKeys = (obj) => {
  return Object.keys(obj);
};

export const formatString = (string, lengthLimit) => {
  if (string.length > lengthLimit) {
    return string.slice(0, lengthLimit) + "...";
  } else {
    return string;
  }
};

export class DataComparator {
  constructor() {
    this.originData = [];
  }

  loadOriginData(data) {
    this.originData = [...data];
    console.log(this.originData);
  }

  compare(inputData) {
    const updatedObjects = [];
    const removedObjects = [];
    const addedObjects = [];
    console.log(this.originData, inputData);
    // Compare inputData with originData
    inputData.forEach((inputObj) => {
      const matchedObjIndex = this.originData.findIndex(
        (originObj) => originObj.id === inputObj.id
      );
      if (matchedObjIndex !== -1) {
        // Object found in both arrays
        const originObj = this.originData[matchedObjIndex];
        if (!this.areObjectsEqual(originObj, inputObj)) {
          // Object updated
          updatedObjects.push(inputObj);
        }
        // Remove the object from the origin data array
        this.originData.splice(matchedObjIndex, 1);
      } else {
        // Object not found in originData, hence added
        addedObjects.push(inputObj);
      }
    });

    // Remaining objects in originData array are removed
    removedObjects.push(...this.originData);

    return { updatedObjects, removedObjects, addedObjects };
  }

  isSameData(inputData) {
    // Check if input data is the same as origin data
    return JSON.stringify(this.originData) === JSON.stringify(inputData);
  }

  areObjectsEqual(obj1, obj2) {
    // Compare objects for equality (customize this method based on your object structure)
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}