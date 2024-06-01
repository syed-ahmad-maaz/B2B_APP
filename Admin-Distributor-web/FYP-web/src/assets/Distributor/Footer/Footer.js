import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
// import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <div className="foot">
      <footer class="page-footer font-small cyan darken-3">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class=" flex-center">
                <a class="fb-ic">
                  <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>
                {/* <LinkedInIcon
                  fontSize="large"
                  onClick={() => window.open("https://www.Linkedin.com")}
                /> */}
                <a>
                  <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>
                {/* <InstagramIcon
                  fontSize="large"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fdirect%2Finbox%2F%3F__coig_login%3D1"
                    )
                  }
                /> */}
                <a class="gplus-ic">
                  <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>
                {/* https://twitter.com/SheharyarHere?fbclid=IwAR19xg2GVOBJ3NPFHH_oerr8MuATFqOaTTFlcuhvJcwJvhn873shPW1Q45U  */}
                {/* <TwitterIcon
                  fontSize="large"
                  onClick={() =>
                    window.open(
                      "https://twitter.com/SheharyarHere?fbclid=IwAR19xg2GVOBJ3NPFHH_oerr8MuATFqOaTTFlcuhvJcwJvhn873shPW1Q45U "
                    )
                  }
                /> */}
                <a class="li-ic">
                  <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>
                {/* https://www.facebook.com/profile.php?id=100011528736278  */}
                {/* <FacebookIcon
                  fontSize="large"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=100011528736278"
                    )
                  }
                /> */}
                <a class="ins-ic">
                  <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a>

                <a class="pin-ic">
                  <i class="fab fa-pinterest fa-lg white-text fa-2x"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
       
        <div class="footer-copyright text-center" id="ab" >
        {
          localStorage.getItem('DistributorToken')?
                    <>
          © 2023 Copyright:
          <a href="/distributor/home"  id="ab"> www.easeshop.com</a>
          {/* <Link to="/home">www.easeshop.com</Link> */}
          </>
            :
            <>

            </>
        }
       
        </div>
      </footer>
    </div>
  );
};
export default Footer;
