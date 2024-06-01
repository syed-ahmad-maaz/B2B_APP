import React from "react-dom";
import "./Home.css";
import { useRef, useState, useEffect } from "react";
import DistributorFooter from "./Footer/Footer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Navbar from "./Sidebar/Navbar";
import Dashboard from "./Dashboard";
import { Link} from "react-router-dom";
import main from './distributor.mp4';
import { Scrollbars } from "react-custom-scrollbars-2";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DashboardContent from "./Dashboard";
import Box from '@mui/material/Box';

const DistributorHome = () => {
  function logout(params) {
    localStorage.clear();
    window.location.href = "/";
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("DistributorToken")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
  
      {localStorage.getItem("DistributorToken") ? (
        <>
        
         
             <Box sx={{ display: 'flex' }}>
             <DashboardContent />
             {/* <Box component="main" sx={{flexGrow:10 , p:7, marginLeft:-7,paddingRight:-7}}> */}
             <Scrollbars style={{ height: 632 }}>
            <video className='videoTag' autoPlay loop muted 
        style={{minWidth: "100%",minHeight: "100vh",maxWidth: "100%",maxHeight: "100vh",objectFit: "cover",
          zIndex: "-1", boxSizing:"border-box",backgroundColor: "rgba(35,45,57,0.8)"}}>

          <source src={main} type='video/mp4' />
      </video>
      </Scrollbars> 
      {/* </Box> */}
        </Box>
      
      
          
         
            <DistributorFooter />
            
          
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DistributorHome;
