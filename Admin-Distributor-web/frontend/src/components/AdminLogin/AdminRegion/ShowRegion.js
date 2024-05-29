import React, { useEffect, useState } from "react";
// import{useParams} from 'react-router-dom';

import "./ShowRegion.css";
const ShowRegion = () => {
  const [regions, setregionobject] = useState([]);

  const [region, setRegion] = useState("");
  const [capital, setCapital] = useState("");
  const [_id, setId] = useState("");

  useEffect(() => {
    getlist();
  }, []);
  // console.warn(users)

  const getlist = () => {
    fetch("http://localhost:5000/region").then((result) => {
      result.json().then((resp) => {
        // setUser(resp)

        setregionobject(resp.regiondata);
        // setRegion(resp.regiondata[3].region)
        // setCapital(resp.regiondata[3].capital)
        console.warn(resp);
      });
    });
  };

  const deleteRegion = (_id) => {
    // ,{method: 'DELETE'}
    fetch(`http://localhost:5000/region/${_id}`, { method: "DELETE" }).then(
      (result) => {
        result.json().then((response) => {
          console.warn("Deleted!!" + response);
          getlist();
        });
      }
    );
  };
  const updateUser = () => {
    // console.warn(region,capital,_id);
    let item = { region, capital, _id };
    console.warn("item", item);
    fetch(`http://localhost:5000/region/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getlist();
      });
    });
  };
  function selectRegion(regionsfields) {
    console.warn("Your data is ", regionsfields);
    // _id='6300b16794ed450d48cc6344';
    // console.log("hellooo function called");
    // regions[regionsfields-1]

    setRegion(regionsfields.region);
    setCapital(regionsfields.capital);
    setId(regionsfields._id);
  }

  return (
    <div>
      <h1>
        <b>View Region Here</b>
      </h1>
      <br></br>
      <br></br>
      <table border="1" className="center">
        <tbody className="styling">
          <tr>
            <td>
              <b className="special">RegionID</b>
            </td>
            <td>
              <b className="special">Region</b>
            </td>
            <td>
              <b className="special">Capital</b>
            </td>
            <td>
              <b className="special">AdminId</b>
            </td>
            <td>
              <b className="special">Operation</b>
            </td>
            <td>
              <b className="special">Operation</b>
            </td>
          </tr>
          {Array.isArray(regions) ? (
            regions.map((item, i) => (
              <tr key={i}>
            
              <td>{item._id}</td>
              <td>{item.region}</td>
             <td>{item.capital}</td>
             <td>{item.AdminId}</td>
                <td>
                  <button onClick={() => deleteRegion(item._id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectRegion(item)}>Update</button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <br></br>

      <div class="center">
        <form>
          <b>Region:</b>
          <div class="txt_field">
            <input
              type="text"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            />
            <span></span>
          </div>
          <br></br>
          <b>Capital:</b>
          <div class="txt_field">
            <input
              type="text"
              value={capital}
              onChange={(e) => {
                setCapital(e.target.value);
              }}
            />
            <span></span>
            <br></br>
          </div>
        </form>
        <br></br>
        <button className="fun" onClick={updateUser}>Click to Update</button>
      </div>
    </div>
  );
};
export default ShowRegion;
