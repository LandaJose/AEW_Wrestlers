import React from "react";
import ReactPlayer from "react-player";

function Social() {
  return (
    <div style={{ height: "150" }}>
      <center>
        <div className="card-body p-3 mb-3 col-lg-7 pb-3 bg-warning text-dark">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=8vhcAyQDlAg"
            controls={true}
          />
        </div>
      </center>
      <center>
        <div className="card-body p-3 mb-3 col-lg-7 pb-3 bg-warning text-dark">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=bwctY1AnQBs&list=PLmkvOoar01-fFux8clZkU31dWDK8VUx7M&index=200"
            controls={true}
          />
        </div>
      </center>
      <center>
        <div className="card-body p-3 mb-3 col-lg-7 pb-3 bg-warning text-dark">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=jjSjrL0JBd0&list=PLfCIebMHhDyAAyGf-2RtxutxE7cBW8f3o"
            controls={true}
          />
        </div>
      </center>
      <center>
        <div className="card-body p-3 mb-3 col-lg-7 pb-3 bg-warning text-dark">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dqwmNUCZAWo&list=PLdetvCt3KdWPXias04s44Vki_OT9vBAot"
            controls={true}
          />
        </div>
      </center>
      <center>
        <div className="card-body p-3 mb-3 col-lg-7 pb-3 bg-warning text-dark">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=HDgdJbm0Le8&list=PL3V-cB-kGk93MzW-ypwJoiTNBRxaBARhT&index=145"
            controls={true}
          />
        </div>
      </center>
    </div>
  );
}

export default Social;
