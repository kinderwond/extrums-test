const fs = require("fs");

const ORIGIN = [0, 0];
const calculateArea = (a, b, c) =>
  0.5 * Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));

const checkIsContainsOriginPoint = ({ aob, boc, aoc, abc }) => {
  const sum = aob + boc + aoc;
  return abc === sum;
};
const readFile = (path) => fs.readFileSync(path).toString();

const readTrianglesValues = () => {
  const file = readFile("./triangles.txt");
  const trianglesStrings = file.split("\n");
  const trianglesValues = trianglesStrings.map((str) => str.split(","));
  return trianglesValues;
};

const getTrianglePointCoordinates = (row) => {
  return {
    a: row.slice(0, 2),
    b: row.slice(2, 4),
    c: row.slice(4, 6),
  };
};
const getTriangleAreas = (points, originPoint) => {
  const { a, b, c } = points;
  return {
    abc: calculateArea(a, b, c),
    aob: calculateArea(a, originPoint, b),
    aoc: calculateArea(a, originPoint, c),
    boc: calculateArea(b, originPoint, c),
  };
};

function main(origin) {
  const trainglesRowsValues = readTrianglesValues();

  let amountOfValidTriangles = trainglesRowsValues.reduce((acc, row) => {
    const values = row.map((el) => Number(el));
    const points = getTrianglePointCoordinates(values);
    const areas = getTriangleAreas(points, origin);

    if (checkIsContainsOriginPoint(areas)) {
      acc++;
    }
    return acc;
  }, 0);

  console.log(`Amount of valid triangles = ${amountOfValidTriangles}`);
}

main(ORIGIN);
