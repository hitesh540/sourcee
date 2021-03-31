import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';





const FooterPagePro = () => {
  return (
    <MDBFooter color="mdb-color" className="font-small lighten-3 pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="my-4">
          <MDBCol md="4" lg="4">
            <h5 className="text-uppercase mb-4 font-weight-bold">
             <em> LEAF-MEALS</em>
            </h5>
          
            <p>
            Leaf-Meals is the large chain of Restraurants and Tiffine Service providerse.
                      we provides the details of Restraurants and Tiffine services which can helps to find something greate of customers need.
            </p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2" lg="2" className="ml-auto">
            <h5 className="text-uppercase mb-4 font-weight-bold">Links</h5>
            <ul className="list-unstyled">
              <p>
                <a href="/">HOME</a>
              </p>
              <p>
                <a href="/shop">SHOP</a>
              </p>
              <p>
                <a href="/cart">SAVED ITEMS</a>
              </p>
              <p>
                <a href="/about">ABOUT US</a>
              </p>
            </ul>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="5" lg="3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact Details</h5>
            <p>
              <span className="bld">Hitesh Borse</span>(Founder)
            </p>
            <p>
              nskhitesh2016@gmail.com
            </p>
            <p>
               8208267094
            </p>
            <p>
               Nardane, Dhule
            </p>
           
            
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2" lg="2" className="text-center">
            <h5 className="text-uppercase mb-4 font-weight-bold">
              Follow us
            </h5>


            <div className="mt-2 ">
          
         <a  href="https://www.instagram.com/leafmeals/"><InstagramIcon/>Instagram</a>
            <br/><br/>
         <a  href="https://www.facebook.com/leaf.meals.5"><FacebookIcon/>Facebook</a>
            <br/><br/>
         <a  href="https://www.youtube.com/watch?v=7U7h09OdBYA"><YouTubeIcon/>Youtube</a>

            </div>

          </MDBCol>


          <hr className="clearfix w-100 d-md-none" />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="/">Leaf-Meals</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPagePro;