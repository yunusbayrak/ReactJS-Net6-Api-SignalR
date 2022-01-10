import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

export default function Home() {
  const [plate, setPlate] = useState("");
  const [numberPlates, setNumberPlates] = useState([]);
  const handleChangePlate = (e) => {
    let { value } = e.target;
    setPlate(value);
  };
  const getNumberPlate = () => {
    axios
      .get("http://localhost:1881/NumberPlate/" + plate)
      .then((res) => {
        let obj = res.data.data;
        let list = [...numberPlates];
        obj.date = moment().format("DD-MM-YYYY hh:mm:ss:SSS");
        list.push(obj);
        setNumberPlates(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearForm = () => {};
  return (
    <div className="row">
      <div className="col-6">
        <h1>Home</h1>
        <form>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Plaka</label>
            <div className="col-sm-10">
              <input
                type="number"
                id="plaka"
                className="form-control"
                onChange={handleChangePlate}
                value={plate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-10 offset-sm-2">
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={getNumberPlate}
              >
                Sorgula
              </button>
              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={clearForm}
              >
                Temizle
              </button>
            </div>
          </div>
        </form>
        <ul>
          {numberPlates.map((item) => (
            <li key={item.date}>
              {item.date}: {item.id} - {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
