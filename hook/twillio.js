import "dotenv/config";
const accountSid = process.env.Account_SID; 
const authToken = process.env.Auth_Token; 

import twilio from "twilio";
const client = new twilio(accountSid, authToken);

export const TwillioClient = body => {;
  return client.messages
    .create({
      body: body,
      from: process.env.Twillio_Number,
      to: process.env.To_Number,
    })
    .then(message => console.log(message.sid))
    .done();;
};
