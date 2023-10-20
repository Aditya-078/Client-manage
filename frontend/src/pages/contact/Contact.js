import React from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";


const Contact = () => {
  
  

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        
        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>091123123123</p>
              </span>
              <span>
                <FaEnvelope />
                <p>Support@infispec.com</p>
              </span>
              <span>
                <GoLocation />
                <p>India</p>
              </span>
              <span>
                <FaTwitter />
                <p>@Infispec</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
