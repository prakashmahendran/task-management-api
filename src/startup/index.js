const express = require("express");
require('dotenv').config();
const userRouter = require('./routers/userRouter');
const taskRouter = require("./routers/taskRouter");
const cilentSideToken = require('../clientSide/generateTokenClient');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('./public'));

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.post("/generateclienttoken", cilentSideToken);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Api Doc : http://localhost:${port}/apidoc`);
});
