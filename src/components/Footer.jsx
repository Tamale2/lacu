import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top"></div>

      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-col">
                <h4 className="footer-title">
                  About us <span className="title-under"></span>
                </h4>

                <div className="footer-content">
                  
                  <p>
                  LIGHT OF AFRICAN CHILD – UGANDA is a registered non-profit organization dedicated to improving the lives of underprivileged children in Uganda. Through a holistic approach, we strive to provide essential resources such as education, healthcare
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-col">
                <h4 className="footer-title">
                  LAST TWEETS <span className="title-under"></span>
                </h4>

                <div className="footer-content">
                  <ul className="tweets list-unstyled">
                    <li className="tweet">
                      20 Surprise Eggs, Kinder Surprise Cars 2 Thomas Spongebob
                      Disney Pixar http://t.co/fTSazikPd4
                    </li>

                    <li className="tweet">
                      20 Surprise Eggs, Kinder Surprise Cars 2 Thomas Spongebob
                      Disney Pixar http://t.co/fTSazikPd4
                    </li>

                    <li className="tweet">
                      20 Surprise Eggs, Kinder Surprise Cars 2 Thomas Spongebob
                      Disney Pixar http://t.co/fTSazikPd4
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-col">
                <h4 className="footer-title">
                  Contact us <span className="title-under"></span>
                </h4>

                <div className="footer-content">
                  <div className="footer-form">
                    <div className="footer-form">
                      <form action="php/mail.php" className="ajax-form">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="E-mail"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <textarea
                            name="message"
                            className="form-control"
                            placeholder="Message"
                            required
                          ></textarea>
                        </div>

                        <div className="form-group alerts">
                          <div
                            className="alert alert-success"
                            role="alert"
                          ></div>

                          <div
                            className="alert alert-danger"
                            role="alert"
                          ></div>
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-submit pull-right"
                          >
                            Send message
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container text-right">
          LACU@ copyrights 2022 - by{" "}
          <a href="https://t.co/JWuKZ8htoy" target="_blank">
            yusufdev
          </a>
        </div>
      </div>
    </footer>
  );
}