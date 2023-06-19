import axios from "axios";

// var axios = require("axios");
var data = JSON.stringify({
  collection: "Plants",
  database: "Gardening",
  dataSource: "MASHEDcluster",
  projection: {
    _id: "648b0e8d90ba4ea3aeda46ba",
  },
});

var config = {
  method: "post",
  url: "https://eu-west-2.aws.data.mongodb-api.com/app/data-cvwbq/endpoint/data/v1/action/findOne",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key":
      "eS4s8jXGRxxbfFP8OTmsr5xEFfPErn8COw3o00fLD9JfusMg76NAtWPuN7QQi49C",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
