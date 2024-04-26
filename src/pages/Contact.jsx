import React from "react";
import Navigation from "../components/Navigation";

export default function Contact() {
  return (
    <>
      <Navigation />
      <div className="page-heading text-center">
        <div className="container zoomIn animated">
          <h1 className="page-title">
            CONTACT US <span className="title-under"></span>
          </h1>
          <p className="page-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
            Necessitatibus.
          </p>
        </div>
      </div>

      <div className="main-container fadeIn animated">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-12 col-form">
              <h2 className="title-style-2">
                CONTACT FORM <span className="title-under"></span>
              </h2>

              <form
                action="https://getform.io/f/jawxvwmb"
                method="POST"
                className="contact-form ajax-form"
              >
                <div className="row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name*"
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="E-mail*"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Message*"
                    required
                  ></textarea>
                </div>

                <div className="form-group alerts">
                  <div className="alert alert-success" role="alert"></div>

                  <div className="alert alert-danger" role="alert"></div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary pull-right">
                    Send message
                  </button>
                </div>

                <div className="clearfix"></div>
              </form>
            </div>

            <div className="col-md-4 col-md-offset-1 col-contact">
              <h2 className="title-style-2">
                {" "}
                LIGHT OF AFRICAN CHILD UGANDAlassName CONTACTS{" "}
                <span className="title-under"></span>
              </h2>
              <p>
                <b>LACU</b> ipsum dolor sit amet, consectetur adipiscing elit.
                Ut at eros rutrum turpis viverra elementum semper quis ex. Donec
                lorem nulla .
              </p>

              <div className="contact-items">
                <ul className="list-unstyled contact-items-list">
                  <li className="contact-item">
                    {" "}
                    <span className="contact-icon">
                      {" "}
                      <i className="fa fa-map-marker"></i>
                    </span>{" "}
                    Mpererwe,Gayaza Road
                  </li>
                  <li className="contact-item">
                    {" "}
                    <span className="contact-icon">
                      {" "}
                      <i className="fa fa-phone"></i>
                    </span>{" "}
                    +25670000000
                  </li>

                  <li className="contact-item">
                    {" "}
                    <span className="contact-icon">
                      {" "}
                      <i className="fa fa-envelope"></i>
                    </span>{" "}
                    lacu@gmail.com
                  </li>

                  <a href="#" class="btn">
                    {" "}
                    <i class="fa fa-facebook"></i>{" "}
                  </a>
                  <a href="#" class="btn">
                    {" "}
                    <i class="fa fa-google"></i>{" "}
                  </a>
                  <a href="#" class="btn">
                    {" "}
                    <i class="fa fa-twitter"></i>{" "}
                  </a>
                  <a href="#" class="btn">
                    {" "}
                    <i class="fa fa-linkedin"></i>{" "}
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
