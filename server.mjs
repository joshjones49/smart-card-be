//install and import dependencies
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

import cardsRouter from './cards/cards.mjs'

//initialize express and cors=========================================
app.use(cors());
app.use(express.json());

//ROUTES====================================================
app.use('/cards', cardsRouter)


//LISTENER====================================================
app.listen(port, () => {
  console.log(`SmartCard API running on`, port);
});