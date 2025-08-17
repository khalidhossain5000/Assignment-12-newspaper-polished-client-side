import React from "react";
import footerlogo from "../../../assets/logo/footer-logo.webp";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
const Footer = () => {
  const { user } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-publisher">All Publishers</NavLink>
      </li>
      <li className="">
        <NavLink to="/allArticles">All Articles</NavLink>
      </li>

      {user && (
        <>
          {" "}
          <li>
            <NavLink to="/subscription">Subscription</NavLink>
          </li>
          <li>
            <NavLink to="/premium-articles">Premium Articles</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-light-text py-12 lg:py-24 dark:bg-gradient-to-b dark:from-dark-primary dark:to-dark-secondary">
      <div className="container mx-auto">
        <div className="logos border-b-1 border-b-light-accent pb-6">
          <img src={footerlogo} className="max-w-64 md:w-64 mx-auto" alt="" />
        </div>
        <div className="socialnadmenu">
          <div className="flex flex-wrap lg:flex-row  justify-center items-center mt-3 lg:mt-12 gap-6 lg:gap-12">
            <a href="https://facebook.com/" target="_blank">
              <FaFacebook
                size={50}
                className="text-white hover:text-light-accent transition duration-200"
              />
            </a>
            <a href="https://x.com/" target="_blank">
              <BsTwitterX
                size={50}
                className="text-white hover:text-light-accent transition duration-200"
              />
            </a>
            <a href="https://github.com/khalidhossain5000" target="_blank">
              <FaGithub
                size={50}
                className="text-white hover:text-light-accent transition duration-200"
              />
            </a>
            <a href="https://youtube.com/" target="_blank">
              <FaYoutube
                size={50}
                className="text-white hover:text-light-accent transition duration-200"
              />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <FaLinkedin
                size={50}
                className="text-white hover:text-light-accent transition duration-200"
              />
            </a>
          </div>
          <div>
            <ul className="flex items-center justify-center flex-col lg:flex-row text-white urbanist text-xl font-semibold gap-6 lg:gap-7 mt-12">
              {links}
            </ul>
          </div>

          <div className="copyright py-6 border-t border-light-accent mt-7">
            <h3 className="text-center text-2xl text-gray-300">
              &copy;{" "}
              <span className="font-bold text-white mx-1">The Voice Daily</span>
              All Rights Reserved
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
