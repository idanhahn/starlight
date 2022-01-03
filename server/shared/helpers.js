const removeUndefined = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeUndefined(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });

  return newObj;
};

const removeEmpty = (obj) => {
  let returnedObj = {};
  returnedObj = removeUndefined(obj);
  Object.keys(returnedObj).forEach((key) => {
    if (
      returnedObj[key] &&
      Object.keys(returnedObj[key]).length === 0 &&
      Object.getPrototypeOf(returnedObj[key]) === Object.prototype
    )
      delete returnedObj[key];
  });
  return returnedObj;
};

module.exports.removeEmpty = removeEmpty;
