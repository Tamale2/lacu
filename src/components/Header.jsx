import React, { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      const spinnerElement = document.getElementById("spinner");
      if (spinnerElement) {
        spinnerElement.classList.remove("show");
      }
      // var spinner = function name() {
      //   setTimeout(() => {
      //       if ($("#spinner").length > 0) {
      //         $("#spinner").removeClass("show");

      //       }
      //     }, 1);

      // };
      // spinner()
      return () => {
        clearTimeout(clearTimeout);
      };
    }, 2000);
  }, []);

  return (
    <header className="main-header">
      <nav className="navbar navbar-static-top">
        <div className="navbar-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <ul className="list-unstyled list-inline header-contact">
                  <li>
                    {" "}
                    <i className="fa fa-phone"></i>{" "}
                    <a href="tel:">+25670000000</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <i className="fa fa-envelope"></i>{" "}
                    <a href="mailto:contact@sadaka.org">charity@gmail.com</a>{" "}
                  </li>
                </ul>
              </div>

              <div className="col-sm-6 col-xs-12 text-right">
                <ul className="list-unstyled list-inline header-social">
                  <li>
                    {" "}
                    <a href="#">
                      {" "}
                      <i className="fa fa-facebook"></i>{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      {" "}
                      <i className="fa fa-twitter"></i>{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      {" "}
                      <i className="fa fa-google"></i>{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      {" "}
                      <i className="fa fa-youtube"></i>{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      {" "}
                      <i className="fa fa fa-pinterest-p"></i>{" "}
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
