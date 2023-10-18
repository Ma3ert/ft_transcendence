export const stripPlayerSockets = (inputObject) => {
  if (inputObject === null || typeof inputObject !== 'object') {
    return inputObject;
  }

  if (Array.isArray(inputObject)) {
    return inputObject.map((item) => stripPlayerSockets(item));
  }

  const copy = {};
  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key) && key !== 'socket') {
      copy[key] = stripPlayerSockets(inputObject[key]);
    }
  }
  return copy;
}