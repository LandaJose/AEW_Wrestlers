import React, { useState, useEffect } from "react";
import WrestlersDataService from "../services/wrestlers";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

const WrestlersList = (props) => {
  const [wrestlers, setWrestlers] = useState([]);
  //const [titleReign, setTitleReign] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNickname, setSearchNickname] = useState("");

  useEffect(() => {
    retrieveWrestlers();
    //retrieveTitleReign();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchNickname = (e) => {
    const searchNickname = e.target.value;
    setSearchNickname(searchNickname);
  };

  const retrieveWrestlers = () => {
    WrestlersDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setWrestlers(response.data.wrestlers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const find = (query, by) => {
    WrestlersDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setWrestlers(response.data.wrestlers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByNickname = () => {
    find(searchNickname, "nickname");
  };

  return (
    <div>
      <div className="row pb-1 ">
        <div className="input-group col-lg-4 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Nickname"
            value={searchNickname}
            onChange={onChangeSearchNickname}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNickname}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4"></div>
      </div>
      <div className="row">
        {wrestlers.map((wrestlers) => {
          //const info = `${wrestlers.record} ${wrestlers.nickname}, ${wrestlers.img}`;
          return (
            <div className="col-lg-4 pb-1">
              <Card className="p-3 mb-2 bg-warning text-dark">
                <center>
                  <Card.Header>
                    <h2 className="card-title text-dark ">{wrestlers.name}</h2>
                  </Card.Header>
                  <Card.Img
                    src={wrestlers.img}
                    alt="Wrestler"
                    width="250"
                    height="250"
                  />
                  <p className="card-text text-dark">
                    <strong>Record: </strong>
                    {wrestlers.record}
                  </p>
                  <p className="card-text text-dark">
                    <strong>Nickname: </strong>
                    {wrestlers.nickname}
                  </p>
                  <div className="center">
                    <Link
                      to={"/wrestlers/" + wrestlers._id}
                      className="btn btn-dark col-lg-5 mx-1 mb-1"
                    >
                      View More
                    </Link>
                  </div>
                </center>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WrestlersList;
