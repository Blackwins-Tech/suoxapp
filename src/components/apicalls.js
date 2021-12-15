import axios from "axios";

// Create instance called instance
const instance = axios.create({
  baseURL: "https://3x2wq-3000.sse.codesandbox.io/",
  headers: {
    "content-type": "application/json"
  }
});

export default {
  getData: () =>
    instance({
      method: "GET",
      url: "/oxygen_data",
      params: {
        search: "parameter"
      },
      transformResponse: [
        function (data) {
          // Do whatever you want to transform the data
          console.log("Transforming data...");
          const json = JSON.parse(data);
          // list of nested object keys
          const dates = Object.keys(json["nested object"]);
          data = {
            dates
          };
          return data;
        }
      ]
    })
  // postData: () =>
  //   instance({
  //     method: "POST",
  //     url: "/api",
  //     data: {
  //       item1: "data1",
  //       item2: "item2"
  //     }
  //   })
};
