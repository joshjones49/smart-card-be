//install and import dependencies
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

import cardsRouter from '../routes/cards/cards.mjs'
import usersRouter from '../routes/users/users.mjs'

//initialize express and cors=========================================
app.use(cors());
app.use(express.json());

//ROUTES====================================================
app.use('/cards', cardsRouter)
app.use('/users', usersRouter)


//LISTENER====================================================
app.listen(port, () => {
  console.log(`SmartCard API running on:`, port);
});