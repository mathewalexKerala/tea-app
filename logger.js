// import { createLogger, format, transports } from "winston";
// const { combine, timestamp, json, colorize } = format;
import fs from 'fs'

// Custom format for console logging with colors
// const consoleLogFormat = format.combine(
//   format.colorize(),
//   format.printf(({ level, message, timestamp }) => {
//     return `${level}: ${message}`;
//   })
// );

// Create a Winston logger
// const logger = createLogger({
//   level: "info",
//   format: combine(colorize(), timestamp(), json()),
//   transports: [
//     new transports.Console({
//       format: consoleLogFormat,
//     }),
//     new transports.File({ filename: "app.log" }),
//   ],
// });

function logger(req,res,next){
let start =new Date()
  res.on('finish',()=>{
start = new Date() - start

    console.log(`Info :{"method":"${req.method}" ,"path":"${req.path}", "status":"${res.statusCode} "responseTime": "${start}"}`)
    fs.appendFile('app.log',`Info :{"method":"${req.method}" ,"path":"${req.path}", "status":"${res.statusCode}, "responseTime": "${start}"}`,(err)=>{
      if(err) {
        console.log(`Error : ${err}`)
      }
    })
  })
  next()
}
export default logger;


