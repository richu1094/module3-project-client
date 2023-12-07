import './Footer.css'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">About us</h5>
            <p>This started as a project for Ironhack's Web Development Bootcamp.It is a crowdfunding platform where you can create your own projects and fund other people's projects.</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Our social media</h5>
            <ul className="list-unstyled">
              <li><Link to="/"><FaXTwitter /></Link></li>
              <li><Link to="/"><FaLinkedin /></Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center py-3">
        <p> © 2023 Copyright:<a href="#"> Richistarter.com</a></p>
      </div>

    </footer>
  )
}

export default Footer
