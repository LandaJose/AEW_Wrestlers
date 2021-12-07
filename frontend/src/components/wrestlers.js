import React, { useState, useEffect } from "react";
import WrestlersDataService from "../services/wrestlers";
import "bootstrap/dist/css/bootstrap.min.css";

const Wrestlers = (props) => {
  const initialWrestlersState = {
    id: null,
    name: "",
    record: "",
    nickname: "",
    img: "",
    comments: [],
  };
  const [wrestlers, setWrestlers] = useState(initialWrestlersState);

  const getWrestlers = (id) => {
    WrestlersDataService.get(id)
      .then((response) => {
        setWrestlers(response.data);
        console.log("------------WRESTLERS---------------");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const initialTitleReignState = {
    id: null,
    title: "",
    start: "",
    end: "",
    titlereign: [],
  };

  const [titleReign, setTitleReign] = useState(initialTitleReignState);

  const getTitleReign = (id) => {
    WrestlersDataService.getTitleReign(id)
      .then((response) => {
        setTitleReign(response.data);
        console.log("------------TITLEREIGN---------------");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const initialStableAndTeamsState = {
    id: null,
    name: "",
    stableAndteams: [],
  };

  const [stableAndTeams, setStableAndTeams] = useState(
    initialStableAndTeamsState
  );

  const getStableandTeam = (id) => {
    WrestlersDataService.getStableMembers(id)
      .then((response) => {
        setStableAndTeams(response.data);
        console.log("------------STABLENAME---------------");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getWrestlers(props.match.params.id);
    console.log("--------------WRESTLERS--------------");
    console.log(props.match.params.id);

    getTitleReign(props.match.params.id);
    console.log("------------TITLE REIGN----------------");
    console.log(props.match.params.id);

    getStableandTeam(props.match.params.id);
    console.log("------------STABLE NAME----------------");
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div style={{ height: "100vh" }}>
      {wrestlers ? (
        <div className="">
          <center>
            <div className="col-lg-4 text-warning ">
              <h2> {wrestlers.name}</h2>

              <img
                src={wrestlers.img}
                alt="Wrestler"
                width="250"
                height="250"
              ></img>

              <div className="p-3 mb-2 bg-warning text-dark">
                <div className="card-body">
                  <p className="card-text ">
                    <strong>Record: </strong>
                    {wrestlers.record}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 pb-0">
              <div className="p-3 mb-2 bg-warning text-dark">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Nickname: </strong>
                    {wrestlers.nickname}
                  </p>
                </div>
              </div>
            </div>

            {/* <Link to={"/wrestlers/" + props.match.params.id + "/comment"} className="btn btn-primary">
            Add Comment
          </Link> */}
            {/* <div className="row"></div> */}
            {/* <h4> Comment </h4> */}
            {/* <div className="row">
            {wrestlers.comments.length > 0 ? (
              wrestlers.comments.map((comment, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {comment.text}
                          <br />
                          <strong>User: </strong>
                          {comment.name}
                          <br />
                          <strong>Date: </strong>
                          {comment.date}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No Comment yet.</p>
              </div>
            )}
          </div> */}
          </center>
        </div>
      ) : (
        <center>
          <div>
            <br />
            <p>No Wrestlers selected.</p>
          </div>
        </center>
      )}

      {stableAndTeams.stableAndteams.length > 0 ? (
        stableAndTeams.stableAndteams.map((stable, index) => {
          return (
            <center>
              <div className="col-lg-4 pb-1" key={index}>
                <div className="p-3 mb-2 bg-warning text-dark">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Stable/Team Name: </strong>
                      {stable.name}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </center>
          );
        })
      ) : (
        <center>
          <div className="col-lg-4 pb-1">
            <div className="p-3 mb-2 bg-warning text-dark">
              <div className="card-body">
                <p className="card-text">
                  <strong>Not In A Stable/Team.</strong>
                </p>
              </div>
            </div>
          </div>
        </center>
      )}

      {titleReign.titlereign.length > 0 ? (
        titleReign.titlereign.map((reign, index) => {
          return (
            <center>
              <div className="col-lg-4 pb-1" key={index}>
                <div className="p-3 mb-2 bg-warning text-dark">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Title: </strong>
                      {reign.title}
                      <br />
                      <strong>Start: </strong>
                      {reign.start}
                      <br />
                      <strong>End: </strong>
                      {reign.end}
                    </p>
                  </div>
                </div>
              </div>
            </center>
          );
        })
      ) : (
        <center>
          <div className="col-lg-4 pb-1">
            <div className="p-3 mb-2 bg-warning text-dark">
              <div className="card-body">
                <p className="card-text">
                  <strong>Currently Has No Titles.</strong>
                </p>
              </div>
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default Wrestlers;
