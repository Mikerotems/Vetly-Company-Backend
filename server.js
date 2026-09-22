
const app = require("./app");

const port = process.env.PORT || 1234;

app.listen(port, () => console.log("app is running on port " + port)
);
