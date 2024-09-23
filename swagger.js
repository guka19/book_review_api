const { Schema } = require("mongoose");

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Book Review API",
    description: "API documentation for the Book Review App",
  },
  host: "http://localhost:3000",
  schemes: ["http"]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require("./app.js");
})
