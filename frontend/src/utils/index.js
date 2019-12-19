const url = {};

if (process.env.NODE_ENV === "production") {
  url.api = "http://localhost:8080"; // can be different than Dev if needed
} else {
  url.api = "http://localhost:8080";
}

export default url;
