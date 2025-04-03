import React from "react";
import "./Home.css";
import { Button, Card } from "react-bootstrap";
const Home = () => {
  return (
    <>
      <div>
        <div className="text-cont">
          <h2 style={{ fontWeight: "bold" }}>
            Save Lives Through Blood Donation
          </h2>
          <p>
            Join our mission to help those in need. Every donation counts and
            can save up to three live
          </p>
        </div>
        <div
          style={{
            margin: "4% 10% 0",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {" "}
          <Card
            style={{
              boxShadow: " 0px 0px 3px 0px grey",
              borderRadius: "12px",
              padding: "2% 2% 1%",
              textAlign: "center",
              width: "18rem",
            }}
          >
            <i class="fa-solid fa-heart"></i>
            <Card.Body>
              <Card.Title>Save Lifes</Card.Title>
              <Card.Text>One donation can save up to 3 lives</Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              boxShadow: " 0px 0px 3px 0px grey",
              borderRadius: "12px",
              padding: "2% 2% 1%",
              textAlign: "center",
              width: "18rem",
            }}
          >
            <i class="fa-solid fa-id-badge"></i>
            <Card.Body>
              <Card.Title>Regular Donors</Card.Title>
              <Card.Text>1000+ active donors</Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              boxShadow: " 0px 0px 3px 0px grey",
              borderRadius: "12px",
              padding: "2% 2% 1%",
              textAlign: "center",
              width: "18rem",
            }}
          >
            <i class="fa-solid fa-chart-line"></i>
            <Card.Body>
              <Card.Title>Quick Process</Card.Title>
              <Card.Text>Donation takes only 30 minutes</Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              boxShadow: " 0px 0px 3px 0px grey",
              borderRadius: "12px",
              padding: "2% 2% 2%",
              textAlign: "center",
              width: "18rem",
            }}
          >
            <i class="fa-solid fa-clock"></i>
            <Card.Body>
              <Card.Title>24/7 Support</Card.Title>
              <Card.Text>Always here to help</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div
          style={{
            padding: "4% 15%",
            borderRadius: " 14px",
            margin: "4% auto 0",
            width: "79%",
            background: "#982D2A",
          }}
        >
          <div className="text-conts">
            <h2> Ready to Make a Difference?</h2>
            <p className="name">
              Whether you're looking to donate blood or in need of blood, we're
              here to help.
            </p>
          </div>
          <div style={{ width: "50%", display: "flex", margin: "auto" }}>
            <button className="Button">Donate Now</button>
            <button className="Button">Request Blood</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;