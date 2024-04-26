import React from "react";
import Navigation from "../components/Navigation";
import Team from "./Team";

export default function About() {
  return (
    <>
      <Navigation />
      <div className="page-heading text-center">
        <div className="container zoomIn animated">
          <h1 className="page-title">
            ABOUT US <span className="title-under"></span>
          </h1>
          <p className="page-description">We are a none-profit organisation.</p>
        </div>
      </div>

      <div className="main-container">
        {/* about */}

        <div style={{ backgroundColor: "teal" }} className="main-container">
          <div className="container">
            <div className="row fadeIn animated">
              <div style={{ backgroundColor: "" }} className="col-sm-8">
                <h2 className="about_taital">about LACU</h2>
                <p style={{ color: "" }} className="about_text">
                LIGHT OF AFRICAN CHILD – UGANDA is a registered non-profit organization dedicated to improving the lives of underprivileged children in Uganda. Through a holistic approach, we strive to provide essential resources such as education, healthcare, nutrition, and emotional support to ensure these children have the opportunity to thrive. Our programs are designed to empower children by fostering their talents, cultivating their potential, and breaking the cycle of poverty. With a focus on sustainability and community involvement, we work tirelessly to create a brighter future for every child we reach, illuminating pathways to success and hope across Uganda.
                </p>
                <div classclassName="readmore_bt">
                  <a href="#"></a>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="about_img">
                  <img src="images/about-img.png" />
                </div>
              </div>
            </div>
          </div>

          {/* about */}

          <div className="section-home about-us">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="about-us-col">
                  <div className="col-icon-wrapper">
                    <img src="images/icons/our-mission-icon.png" alt="" />
                  </div>
                  <h3 className="col-title">our mission</h3>
                  <div className="col-details">
                    <p>
                      To provide a platform for the unprivileged and orphaned
                      children in Uganda by providing a home, education and
                      other basic needs.
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary">
                    {" "}
                    {" "}
                  </a>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="about-us-col">
                  <div className="col-icon-wrapper">
                    <img
                      style={{ width: "80px" }}
                      src="images/icons/money.png"
                      alt=""
                    />
                  </div>
                  <h3 className="col-title">Our Vision</h3>
                  <div className="col-details">
                    <p>
                      To have a country where the underprivileged and orphaned
                      children are accorded hope for a better life and future.
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary">
                    {" "}
                    {" "}
                  </a>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="about-us-col">
                  <div className="col-icon-wrapper">
                    <img src="images/icons/help-icon.png" alt="" />
                  </div>
                  <h3 className="col-title">Core Values</h3>
                  <div className="col-details">
                    <ul style={{textDecoration: 'bulleting'}}>
                     <li> Equality</li> <li>Transparency</li> <li>Accountability</li> <li>Integrity</li>
                     <li> Professionalism.</li>
                      </ul>
                  </div>
                  <a href="#" className="btn btn-primary">
                    {" "}
                    {" "}
                  </a>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="about-us-col">
                  <div className="col-icon-wrapper">
                    <img src="images/icons/programs-icon.png" alt="" />
                  </div>
                  <h3 className="col-title">our programs</h3>
                  <div className="col-details">
                    <p>
                      Lorem ipsum dolor sit amet consect adipisscin elit proin
                      vel lectus ut eta esami vera dolor sit amet consect
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary">
                    {" "}
                    {" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Team />
      </div>
    </>
  );
}
