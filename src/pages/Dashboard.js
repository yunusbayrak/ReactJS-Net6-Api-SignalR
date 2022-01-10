import { HubConnectionBuilder } from "@microsoft/signalr";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [connection, setConnection] = useState(null);
  const [logs, setLogs] = useState([]);
  const latestLogs = useRef(null);

  latestLogs.current = logs;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:1881/logHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("logs", (message) => {
            let updatedLogs = [...latestLogs.current];
            let obj = JSON.parse(message);
            console.log(obj);
            obj.date = moment().format("DD-MM-YYYY hh:mm:ss:SSS");
            updatedLogs.push(obj);

            setLogs(updatedLogs);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {logs.map((item) => (
          <li key={item.date}>
            {item.date}: {item.RemoteAddress} - {item.Id} - {item.Name} -{" "}
            {item.FromCache === null
              ? ""
              : Boolean(item.FromCache)
              ? "(Cache)"
              : "(DB)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
