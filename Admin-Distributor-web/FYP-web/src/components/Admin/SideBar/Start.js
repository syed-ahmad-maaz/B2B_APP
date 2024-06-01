import React from "react";
import { Link } from "react-router-dom";
import main from "./main.mp4";
import { Scrollbars } from "react-custom-scrollbars-2";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect,useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  
 
 
  return (
    
    
    <div className="startscreen">
  
    
  
      <Scrollbars style={{ height: 563 }}>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          justify="center"
        >
          <div
            style={{
              textAlign: "center",
              position: "absolute",
              width: "60%",
              left: "50%",
              top: "50%",
              height: "40%",
              transform: "translate(-50%,-50%)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <Grid item>
              <Typography
                variant="h6"
                style={{
                  marginTop: "0px",
                  fontSize: "19px",
                  textTransform: "uppercase",
                  fontWeight: "800",
                  color: "#3f51b5",
                  letterSpacing: "0.5px",
                }}
              >
                Choose your{" "}
                <em
                  style={{
                    fontStyle: "normal",
                    color: "#ed563b",
                    fontWeight: "900",
                  }}
                >
                  Authority
                </em>
              </Typography>
              <br></br>
              <Link to={"/distributorlogin"}>
                <button className="button-79">Login as Distributor</button>
              </Link>
            </Grid>
            <Grid item>
              <br></br>
              <br></br>
              <Link to={"/adminlogin"}>
                <button className="button-79">Login as Admin</button>
              </Link>
            </Grid>
          </div>

          <video
            className="videoTag"
            autoPlay
            loop
            muted
            style={{
              minWidth: "100%",
              minHeight: "100vh",
              maxWidth: "100%",
              maxHeight: "100vh",
              objectFit: "cover",
              zIndex: "-1",
              boxSizing: "border-box",
              backgroundColor: "rgba(35,45,57,0.8)",
            }}
          >
            <source src={main} type="video/mp4" />
          </video>
        </Grid>
      </Scrollbars>
    </div>
  );
};
export default Start;
