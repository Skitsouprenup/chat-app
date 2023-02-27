import express from "express";
import { getContacts } from "./getcontacts.js";

const ContactRouter = express.Router();

ContactRouter.get("/getcontacts", getContacts);

export default ContactRouter; 