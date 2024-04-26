import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Navigation />

      <div
        id="homeCarousel"
        className="carousel slide carousel-home"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#homeCarousel"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#homeCarousel" data-slide-to="1"></li>
          <li data-target="#homeCarousel" data-slide-to="2"></li>
        </ol>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="images/slider/about1.jpg" alt="" />

            <div className="container">
              <div className="carousel-caption">
                <h2 style={{color: ''}} className="carousel-title bounceInDown animated slow">
                  LIGHT OF AFRICAN CHILD UGANDAlassName
                </h2>
                <h4 style={{color: 'green', textTransform: 'lowercase'}}className="carousel-subtitle bounceInUp animated slow ">
                  "Hope & Education for the Unprivileged Children"
                </h4>
                <a
                  href="#"
                  className="btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                  data-toggle="modal"
                  data-target="#donateModal"
                >
                  DONATE NOW
                </a>
              </div>
            </div>
          </div>

          <div className="item ">
            <img src="images/slider/home-slider-2.jpg" alt="" />

            <div className="container">
              <div className="carousel-caption">
                <h2 className="carousel-title bounceInDown animated slow">
                  Together we can improve their lives
                </h2>
                <h4 className="carousel-subtitle bounceInUp animated slow">
                  {" "}
                  So let's do it !
                </h4>
                <a
                  href="#"
                  className="btn btn-lg btn-secondary hidden-xs bounceInUp animated"
                  data-toggle="modal"
                  data-target="#donateModal"
                >
                  DONATE NOW
                </a>
              </div>
            </div>
          </div>

          <div className="item ">
            <img src="images/slider/banner.png" alt="" />

            <div className="container">
              <div className="carousel-caption">
                <h2 className="carousel-title bounceInDown animated slow">
                  A penny is a lot of money, if you have not got a penny.
                </h2>
                <h4 className="carousel-subtitle bounceInUp animated slow">
                  You can make the diffrence !
                </h4>
                <a
                  href="#"
                  className="btn btn-lg btn-secondary hidden-xs bounceInUp animated slow"
                  data-toggle="modal"
                  data-target="#donateModal"
                >
                  DONATE NOW
                </a>
              </div>
            </div>
          </div>
        </div>

        <a
          className="left carousel-control"
          href="#homeCarousel"
          role="button"
          data-slide="prev"
        >
          <span className="fa fa-angle-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>

        <a
          className="right carousel-control"
          href="#homeCarousel"
          role="button"
          data-slide="next"
        >
          <span className="fa fa-angle-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="section-home about-us fadeIn animated">
        {/* about us */}
      </div>

      <div className="section-home home-reasons">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="reasons-col animate-onscroll fadeIn">
                <img src="images/gallery/gallery7.jpg" alt="" />

                <div className="reasons-titles">
                  <h3 className="reasons-title">We fight together</h3>
                  <h5 className="reason-subtitle">We are humans</h5>
                </div>

                <div className="on-hover hidden-xs">
                  <p>
                    {" "}
                    Promoting human rights and assisting disadvantaged
                    communities are noble causes that can truly make a
                    difference in people's lives. By advocating for human rights
                    and providing support to those in need,
                    <strong style={{ color: "green" }}>
                      {" "}
                     LIGHT OF AFRICAN CHILD UGANDAlassName{" "}
                    </strong>
                    Ugandacontributing to a more just and equitable society
                  </p>

                  <p>
                    {" "}
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur praesentium, itaque facilis nesciunt ab omnis cumque
                    similique ipsa veritatis perspiciatis, harum ad at nihil
                    molestias, dignissimos sint consequuntur. Officia, fuga. */}
                  </p>

                  <p> </p>
                </div>
              </div>
            </div>

            <div style={{height: "20%"}} className="col-md-6">
              <div className="reasons-col animate-onscroll fadeIn">
                <img src="images/gallery/about.jpg" alt="" />

                <div className="reasons-titles">
                  <h3 className="reasons-title">WE care about others</h3>
                  <h5 className="reason-subtitle">We are humans</h5>
                </div>

                <div className="on-hover hidden-xs">
                  <p>
                    {" "}
                    Children and general community health generally needs
                    instant attention from across the board to give hope to
                    every ugandan citizen
                  </p>

                  <p>
                    {" "}
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur praesentium, itaque facilis nesciunt ab omnis cumque
                    similique ipsa veritatis perspiciatis, harum ad at nihil
                    molestias, dignissimos sint consequuntur. Officia, fuga. */}
                  </p>

                  <p>
                    {" "}
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur praesentium, itaque facilis nesciunt ab omnis cumque
                    similique ipsa veritatis perspiciatis, harum ad at nihil
                    molestias, dignissimos sint consequuntur. Officia, fuga. */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
               
               
                  


      <div className="section-home our-causes animate-onscroll fadeIn">
        <div className="container">
          <h2 className="title-style-1">
            Events <span className="title-under"></span>
          </h2>
          <a
            href="images/gallery/children-82272_1280.jpg"
            className="col-md-3 col-sm-4 gallery-item lightbox"
          >
            <img src="images/events/event1.jpg" alt="" />

            <span className="on-hover">
              <span className="hover-caption">
                bnmfbfgbmdvnmdlkvajvb jcnvm bhnzm vnbkhwjjbks fmxb
              </span>
            </span>
          </a>
          <a
            href="images/events/event2.jpg"
            className="col-md-3 col-sm-4 gallery-item lightbox"
          >
            <img src="images/events/event2.jpg" alt="" />

            <span className="on-hover">
              <span className="hover-caption">
                bnmfbfgbmdvnmdlkvajvb jcnvm bhnzm vnbkhwjjbks fmxb
              </span>
            </span>
          </a>
          <a
            href="images/events/event3.jpg"
            className="col-md-3 col-sm-4 gallery-item lightbox"
          >
            <img src="images/events/event3.jpg" alt="" />

            <span className="on-hover">
              <span className="hover-caption">
                bnmfbfgbmdvnmdlkvajvb jcnvm bhnzm vnbkhwjjbks fmxb
              </span>
            </span>
          </a>
          <a
            href="https://www.youtube.com/channel/UCvCxFADitwiluRF2_Ol_QdA"
            className="col-md-3 col-sm-4 gallery-item lightbox"
          >
            <img src="" alt="" />

            <span className="on-hover">
              <span className="hover-caption">
                bnmfbfgbmdvnmdlkvajvb jcnvm bhnzm vnbkhwjjbks fmxb
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* footer */}

      {/* DONATE */}

      <div
        className="modal fade"
        id="donateModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="donateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="donateModalLabel">
                DONATE NOW
              </h4>
            </div>
            <div className="modal-body">
              <form className="form-donation">
                <h3 className="title-style-1 text-center">
                  Thank you for your donation{" "}
                  <span className="title-under"></span>{" "}
                </h3>

                <div className="row">
                  <div className="form-group col-md-12 ">
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      placeholder="AMOUNT(€)"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="First name*"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Last name*"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email*"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-12">
                    <textarea
                      cols="30"
                      rows="4"
                      className="form-control"
                      name="note"
                      placeholder="Additional note"
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary pull-right"
                      name="donateNow"
                    >
                      DONATE NOW
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}