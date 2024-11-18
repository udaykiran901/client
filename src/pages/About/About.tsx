import React, { useState } from "react";
import Navbar from "pages/Welcome/Navbar/Navbar";
import { Container, Row, Col } from "reactstrap";
import { Carousel } from "react-bootstrap";
import { color } from "echarts";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
const boardOfDirectors = [
  { name: "Mr. Srinivasulu Kunchala", role: "Managing Director" },
  { name: "Ms. Subhashini Kunchala", role: "Director - Finance" },
  { name: "Mr. Illuri Chandra Shekar Gupta", role: "Director" },
  { name: "Mr. Ramakrishna Midathana", role: "Director" },
  { name: "Mr. K.P. Chary", role: "Director" },
];
const branchData = [
  {
    location: "Visakhapatnam",
    address:
      "Plot No.93, E - Block, Autonagar, Visakhapatnam – 530 012, Andhra Pradesh",
    emails: ["kdmvizag@gmail.com", "kdmramakrishna@gmail.com"],
    contactPerson: "Mr. Ramakrishna",
    phone: "9912944495",
  },
  {
    location: "Guntur",
    address:
      "D.No. 62/7B, Block No. 9, R. Agraharam, Etukuru Road, Guntur – 522 004, Andhra Pradesh",
    emails: ["kdmguntur@gmail.com", "kdmdurgaprasad@gmail.com"],
    contactPerson: "Mr. Venkateshwar",
    phone: "9912922256",
  },
  {
    location: "Madhapur",
    address:
      "9th floor, Pardha’s Picasa building, Above Vijetha supermarket, Madhapur, Hyderabad, Telangana - 500081",
    emails: ["kdmengineers.designs@gmail.com"],
    contactPerson: "Mr. K Srinivasulu",
    phone: "8328498601",
  },
];
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const advisoryCommittee = [
  {
    name: "Mr. M. K. Rahaman",
    role: "Technical Advisory Council & Engineer in Chief (retd), water resources department, govt. Of A.P",
  },
  {
    name: "Mr. K.V Naga Raja",
    role: "Chief Engineer (R&B) retd., Additional Director General, NAC, AP",
  },
  {
    name: "Mr. K. Srinivasa Reddy",
    role: "Managing Director, Design Tree Consultants, Bengaluru and Hyderabad",
  },
  {
    name: "Mr. V. V. Krishna Reddy",
    role: "Chief Consultant, Continental Designers and Consultants, Hyderabad",
  },
];

const milestones = [
  {
    year: "2012",
    title: "ESTABLISHED KDM ENGINEERS (IND) Pvt Ltd.",
    description:
      "Founded with a vision to revolutionize the engineering sector, KDM Engineers (IND) Pvt Ltd. laid the groundwork by embracing advanced methodologies and a strong commitment to quality.",
  },
  {
    year: "2018",
    title: "ESTABLISHED KDM ENGINEERS AND CONSULTANTS Pvt Ltd.",
    description:
      "Expanding our horizons, we launched KDM Engineers and Consultants Pvt Ltd., offering comprehensive consultancy services that pushed boundaries and set new standards in engineering excellence.",
  },
  {
    year: "2021",
    title: "COMPLETED 26+ DETAILED ENGINEERING PROJECTS",
    description:
      "Reaching a significant milestone, our team successfully delivered over 26 intricate engineering projects, demonstrating our capability to handle complex demands with precision.",
  },
  {
    year: "2025",
    title: "TO BE A PREMIER ORGANIZATION AT NATIONAL LEVEL",
    description:
      "We aspire to establish our presence as a leading organization nationwide, setting benchmarks in quality, innovation, and sustainable engineering practices.",
  },
  {
    year: "2030",
    title: "TO CREATE AN INTERNATIONAL IMAGE",
    description:
      "Committed to global excellence, we are taking steps to make our mark internationally, leveraging partnerships and cutting-edge technology to build a worldwide reputation.",
  },
];

const About = () => {
  const [selectedYear, setSelectedYear] = useState("2012");

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const selectedMilestone = milestones.find(
    (milestone) => milestone.year === selectedYear
  );

  return (
    <>
      <div className="container-fluid w-75 p-0" style={{ maxWidth: "1300px" }}>
        {/* Navbar Section */}
        <Navbar />

        {/* Section 1: About Company Introduction */}
        <section
          className="text-center mt-100 mb-5"
          style={{
            backgroundColor: "rgba(255,255,255,255)", // Light blue color for section
            padding: "50px 0",
          }}
        >
          <div
            className="container-fluid p-0 text-light "
            style={{
              marginTop: "50px",
              backgroundImage:
                "url('https://img.freepik.com/free-photo/front-view-woman-posing-her-office-laptop_23-2148908837.jpg?ga=GA1.1.1773186740.1711630630&semt=ais_hybrid')",
              backgroundSize: "cover",

              height: "500px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="d-flex align-items-center py-7 justify-content-center position-absolute"
              style={{
                width: "100%",
                height: "70%",
                top: "65%",
                bottom: "30%",
                maxWidth: "800px",
                backdropFilter: "blur(80px)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                zIndex: 2,
              }}
            >
              <div
                className=" rounded shadow-lg"
                style={{
                  paddingTop: "50px",
                  paddingBottom: "50px",
                  backgroundColor: "#034077",
                  height: "100%",
                }}
              >
                <h1
                  className="fw-bold  mb-4"
                  style={{
                    color: "#f9f9f9", // White color for the heading to contrast with the background
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "2.5rem",
                  }}
                >
                  About KDM Engineers Group
                </h1>
                <p
                  className="lead   fw-light"
                  style={{
                    color: "#f9f9f9",
                    textAlign: "center",
                    fontSize: "1rem",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  KDM Engineers Group is a renowned and leading civil
                  engineering firm that aspires to become a center of excellence
                  in the construction sector. We bring together civil
                  engineering consultancy and services, as well as training,
                  under one roof to provide comprehensive solutions to our
                  clients.
                </p>

                <p
                  className="lead fw-light"
                  style={{
                    color: "#f9f9f9",
                    fontSize: "1rem",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {" "}
                  Our commitment to quality is reflected in our structured
                  quality assurance and management system, ensuring that we
                  deliver solutions that are both optimal and of the highest
                  quality. We strive to maintain unwavering efforts in our
                  pursuit of excellence, innovation, and sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Company Overview */}
        <section
          className="text-center"
          style={{
            backgroundColor: "#034077 ",
            padding: "30px 0",

            marginTop: "180px",
          }}
        >
          <h2
            className="fw-bold"
            style={{
              color: "#f9f9f9", // White color for the heading to contrast with the background
              fontFamily: "'Poppins', sans-serif",
              fontSize: "2rem",
            }}
          >
            Our Journey
          </h2>
          <p className="mb-2 " style={{ fontSize: "1rem", color: "#eef4f0" }}>
            Embark on a journey through our rich timeline, where each milestone
            marks a significant chapter in our commitment to excellence.
          </p>

          <Container>
            <Carousel>
              {milestones.map((milestone, index) => (
                <Carousel.Item key={index}>
                  <Row className="justify-content-center align-items-center">
                    <Col xs={12} md={8} lg={6} className="text-center">
                      <h3 style={{ color: "#eef4f0" }}>{milestone.year}</h3>
                      <h4 className="fw-bold" style={{ color: "#eef4f0" }}>
                        {milestone.title}
                      </h4>
                      <p
                        className="mb-6"
                        style={{ fontSize: "1rem", color: "#eef4f0" }}
                      >
                        {milestone.description}
                      </p>
                      <p className="mb-5"></p>
                      <p className="mb-6"></p>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </section>

        <section
          className="text-center my-1"
          style={{
            backgroundColor: "white",
            padding: "50px 0",
            margin: "20px 0",
          }}
        >
          <h2
            className="fw-bold mb-4"
            style={{
              color: "#034077 ", // White color for the heading to contrast with the background
              fontFamily: "'Poppins', sans-serif",
              fontSize: "2rem",
            }}
          >
            We Believe in
          </h2>

          <div className="container">
            <div className="row justify-content-center">
              {/* Vision */}
              <div
                className="col-md-5 m-2 p-4"
                style={{
                  backgroundColor: "#034077 ",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 style={{ fontSize: "1.6rem", color: "white" }}>
                  Our Vision
                </h3>
                <p style={{ fontSize: "1rem", color: "white" }}>
                  To establish a center of excellence that unifies civil
                  engineering consultancy, services, training, and
                  rehabilitation technology under one roof, providing
                  accessible, high-quality solutions for the construction
                  industry.
                </p>
              </div>

              {/* Mission */}
              <div
                className="col-md-5 m-2 p-4"
                style={{
                  backgroundColor: "#034077",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 style={{ fontSize: "1.6rem", color: "white" }}>
                  Our Mission
                </h3>
                <p style={{ fontSize: "1rem", color: "white" }}>
                  To continuously refine our processes with cutting-edge
                  technology, optimizing service efficiency and setting new
                  standards in quality. We aim to drive industry sustainability
                  through the development of skilled, technically proficient
                  professionals.
                </p>
              </div>
            </div>

            <div className="row justify-content-center">
              {/* Strengths */}
              <div
                className="col-md-5 m-2 p-4"
                style={{
                  backgroundColor: "#034077 ",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.6rem",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Our Strengths
                </h3>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  Guided by a distinguished advisory committee of industry
                  experts, our team consists of highly trained, qualified, and
                  experienced professionals, equipped with state-of-the-art
                  technology to deliver exceptional results.
                </p>
              </div>

              {/* Values */}
              <div
                className="col-md-5 m-2 p-4"
                style={{
                  backgroundColor: "#034077",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 style={{ fontSize: "1.6rem", color: "white" }}>
                  Our Values
                </h3>
                <ul
                  className="fs-5"
                  style={{ color: "white", listStyle: "none", padding: "0" }}
                >
                  <li>
                    <strong>Integrity:</strong> Upholding the highest standards
                    of honesty and ethics.
                  </li>
                  <li>
                    <strong>Social Responsibility:</strong> Contributing
                    positively to society and the environment.
                  </li>
                  <li>
                    <strong>Customer Delight:</strong> Exceeding expectations
                    and delivering outstanding client experiences.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          className="text-center my-5"
          style={{
            backgroundColor: "#034077",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "50px 0",
          }}
        >
          <h2 className="fw-bold mb-4" style={{ color: "white" }}>
            Wings of KDM Group
          </h2>

          <div className="row justify-content-center">
            {/* KDM Engineers */}
            <div
              className="col-md-5 m-2 p-4"
              style={{
                backgroundColor: "rgba(255,255,255,255)",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h6
                className="fw-bold mb-4"
                style={{ color: "#034077 ", fontSize: "20px" }}
              >
                {" "}
                KDM ENGINEERS &<br />
                CONSULTANTS PVT. LTD
                <br />
                (KDMECPCL)
              </h6>
              <p className="fs-5 " style={{ color: "#034077 " }}>
                Our consulting team brings unparalleled expertise and strategic
                insights to each project, supporting clients with best-in-class
                advisory services in civil engineering, project management, and
                technology solutions.
              </p>
            </div>

            {/* Consultants */}
            <div
              className="col-md-5 m-2 p-4"
              style={{
                backgroundColor: "rgba(255,255,255,255)",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h6
                className="fw-bold  mb-4"
                style={{ color: "#034077 ", fontSize: "20px" }}
              >
                KDM ENGINEERS
                <br />
                (INDIA) PVT. LTD
                <br />
                (KDMEI)
              </h6>
              <p className="fs-5 " style={{ color: "#034077 " }}>
                Dedicated to providing expert civil engineering solutions with a
                focus on innovation, precision, and customer satisfaction. We
                take pride in our comprehensive approach to engineering projects
                across various sectors.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="container my-5 bg-white">
            <h1
              className="text-center mb-4"
              style={{
                color: "#034077 ", // White color for the heading to contrast with the background
                fontFamily: "'Playfair Display', serif", // Premium font for heading
                fontSize: "2.2rem", // Increased font size for prominence
                letterSpacing: "2px", // Adds spacing between letters for elegance
                textTransform: "uppercase", // Makes the text uppercase for added emphasis
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)", // Adds a subtle text shadow for depth
                paddingTop: "30px",
              }}
            >
              Meet our Core Team
            </h1>

            {/* Board of Directors Section */}
            <div className="mb-5">
              <h2
                className="text-center mb-4"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.5rem",
                  color: "#034077 ",
                }}
              >
                BOARD OF DIRECTORS
              </h2>
              <div className="row">
                {boardOfDirectors.map((member, index) => (
                  <div className="col-md-4 col-sm-6 mb-4" key={index}>
                    <div
                      className="card p-0 shadow-sm text-white h-100 border-0"
                      style={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.classList.add("shadow-lg");
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.classList.remove("shadow-lg");
                      }}
                    >
                      <div className="d-flex" style={{ height: "100%" }}>
                        {/* Left 30% Red Background */}
                        <div
                          style={{
                            width: "3%", // 30% width for the left side
                            backgroundColor: "red", // Red color for left side
                            height: "100%", // Full height of the card
                            borderRadius: "10px 0 0 10px", // Rounded corners for the left side
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* <h5 className="text-center" style={{ color: "white" }}>
                          {member.name}
                        </h5> */}
                        </div>
                        {/* Right 70% with #034077 Background */}
                        <div
                          style={{
                            textAlign: "center",
                            width: "97%", // 70% width for the right side
                            backgroundColor: "#034077 ", // #034077 color for the right side
                            padding: "15px",
                            borderRadius: "0 10px 10px 0", // Rounded corners for the right side
                          }}
                        >
                          <h5
                            className="text-center"
                            style={{ color: "white" }}
                          >
                            {member.name}
                          </h5>
                          <p className="card-text" style={{ color: "white" }}>
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advisory Committee Section */}
            <div>
              <h2
                className="text-center mb-4"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.5rem",
                  color: "#034077 ",
                }}
              >
                ADVISORY COMMITTEE
              </h2>
              <div className="row">
                {advisoryCommittee.map((member, index) => (
                  <div className="col-md-4 col-sm-6 mb-4" key={index}>
                    <div
                      className="card p-0 shadow-sm text-white h-100 border-0"
                      style={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.classList.add("shadow-lg");
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.classList.remove("shadow-lg");
                      }}
                    >
                      <div className="d-flex" style={{ height: "100%" }}>
                        {/* Left 30% Red Background */}
                        <div
                          style={{
                            width: "3%", // 30% width for the left side
                            backgroundColor: "red", // Red color for left side
                            height: "100%", // Full height of the card
                            borderRadius: "10px 0 0 10px", // Rounded corners for the left side
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        ></div>
                        {/* Right 70% with #034077 Background */}
                        <div
                          style={{
                            textAlign: "center",
                            width: "97%",
                            // height: "100px", // 70% width for the right side
                            backgroundColor: "#034077 ", // #034077 color for the right side
                            padding: "15px",
                            borderRadius: "0 10px 10px 0", // Rounded corners for the right side
                          }}
                        >
                          <h5
                            className="text-center"
                            style={{ color: "white" }}
                          >
                            {member.name}
                          </h5>
                          <p className="card-text" style={{ color: "white" }}>
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="message-md-section"
          style={{
            backgroundColor: "#034077", // Deep blue background
            padding: "60px 0",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            className="fw-bold mb-4"
            style={{
              color: "White", // White color for the heading
              fontFamily: "'Playfair Display', serif", // Elegant font for heading
              fontSize: "2rem", // Larger size for prominence
              letterSpacing: "2px", // Add some space between letters for elegance
              textTransform: "uppercase", // Uppercase for the heading
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow effect for depth
            }}
          >
            Message from MD's Desk
          </h2>
          <div
            className="line"
            style={{
              width: "80px", // Slightly wider for a more elegant look
              height: "5px", // Increased thickness
              background: "linear-gradient(90deg, #f1c40f, #f39c12)", // Gold gradient for the line
              margin: "10px auto",
              borderRadius: "10px", // Rounded edges for a smoother look
            }}
          ></div>
          <div className="container">
            <p
              className="fs-5"
              style={{
                color: "034077 ", // White text color for contrast
                maxWidth: "900px", // Increased width for better readability
                margin: "0 auto",
                lineHeight: "1.5", // Adjusted line height for better spacing
                fontSize: "1.8rem", // Slightly larger font size for the body text
                fontFamily: "'Lora', serif", // Elegant font for body text
                textAlign: "justify", // Better alignment for paragraphs
                // Added indentation for the first line
              }}
            >
              From the year 2012, The KDM Engineers Group has been providing
              services to numerous clients across the country and also
              established two wings namely KDM Engineers and Consultants Pvt.
              Ltd. and KDM Engineers (India) Pvt. Ltd. to provide optimum
              engineering solutions in all aspects. The efficiency of services
              and commitment towards work has placed the KDM engineers group at
              the highest level in the construction industry.
              <br />
              <br />
              Our integrity, resources, and prompt completion of projects have
              put us on the radar of major infrastructure companies.
              <br />
              <br />
              The KDM Engineers Group has never left any stone unturned and is
              constantly one step ahead of the obstacles, striving to provide
              the client with satisfactory service as promised.
            </p>
          </div>
        </section>
        <section className="text-center my-5">
          <h2
            className="fw-bold mb-4"
            style={{
              color: "#034077", // White color for the heading
              fontFamily: "'Playfair Display', serif", // Elegant font for heading
              fontSize: "2rem", // Larger size for prominence
              letterSpacing: "2px", // Add some space between letters for elegance
              textTransform: "uppercase", // Uppercase for the heading
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            Our Clients
          </h2>
          <p
            className="lead mb-4"
            style={{
              color: "#034077 ",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Trusted by leading government and official organizations.
          </p>
          <div className="container">
            <Carousel
              indicators={true}
              controls={true}
              interval={3000}
              className="client-carousel"
            >
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-NHAI.jpg"
                    alt="Client 1"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-Morth.jpg"
                    alt="Client 2"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-ECIL-768x773.jpg"
                    alt="Client 3"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-AP.jpg"
                    alt="Client 4"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-POWERGRID.png"
                    alt="Client 5"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-TS.png"
                    alt="Client 5"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-DRDO.png"
                    alt="Client 6"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-TSIIC.png"
                    alt="Client 7"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src="https://kdmengineers.com/wp-content/uploads/2021/12/Logo-SCR.jpg"
                    alt="Client 1"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                  <img
                    src=" https://kdmengineers.com/wp-content/uploads/2021/12/Logo-BARC.png"
                    alt="Client 1"
                    className="img-fluid mx-3"
                    style={{ height: "150px" }}
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
        <div className=" my-5 ">
          <h2 className="text-center mb-4" style={{ color: "#034077 " }}>
            Our Branches
          </h2>
          <div className="row">
            {branchData.map((branch, index) => (
              <div
                className="col-md-4 col-sm-6 mb-4"
                style={{ color: "#034077" }}
                key={index}
              >
                <div className="card p-3 shadow-sm">
                  <h5 style={{ color: "#034077" }} className="card-title">
                    {branch.location}
                  </h5>
                  <p style={{ color: "#034077" }} className="card-text">
                    {branch.address}
                  </p>
                  <p style={{ color: "#034077" }} className="card-text">
                    <strong>Emails:</strong>
                  </p>
                  <ul className="list-unstyled text-decoration-underline mb-2">
                    {branch.emails.map((email, idx) => (
                      <li key={idx}>
                        <a
                          style={{
                            fontWeight: "bold",

                            color: "#6a80e8",
                          }}
                          href={`mailto:${email}`}
                        >
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="card-text" style={{ color: "#034077" }}>
                    <strong>Contact:</strong> {branch.contactPerson}
                  </p>
                  <p style={{ color: "#034077" }} className="card-text">
                    <strong>Phone:</strong>{" "}
                    <a
                      style={{ color: "#034077" }}
                      href={`tel:${branch.phone}`}
                    >
                      {branch.phone}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
      </div>
      <div>
        <footer className="bg-dark text-light text-center py-1">
          <Container>
            <Row>
              <Col style={{ paddingTop: "10px" }} md="4" className="mb-3">
                <h5 className="text-white">About Us</h5>
                <p>
                  KDM Engineers is a trusted name in the engineering field,
                  offering superior services to clients worldwide.
                </p>
              </Col>
              <Col style={{ paddingTop: "10px" }} md="4" className="mb-3">
                <h5 className="text-white">Contact</h5>
                <p>Email: info@kdmengineers.com</p>
                <p>Phone: 123-456-7890</p>
              </Col>
              <Col style={{ paddingTop: "10px" }} md="4" className="mb-3">
                <h5 className="text-white">Follow Us</h5>
                <p>Stay connected through our social media channels.</p>
                <div className="social-links">
                  <a
                    href="https://www.facebook.com/people/KDM-Engineers-India-Pvt-Ltd/100095421139655/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#3b5998",
                      margin: "0 10px",
                      fontSize: "1.5rem",
                    }}
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#1da1f2",
                      margin: "0 10px",
                      fontSize: "1.5rem",
                    }}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#0077b5",
                      margin: "0 10px",
                      fontSize: "1.5rem",
                    }}
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com/kdmengineersindiapvtltd/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#e4405f",
                      margin: "0 10px",
                      fontSize: "1.5rem",
                    }}
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href="https://www.youtube.com/@KDMEngineers"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ff0000",
                      margin: "0 10px",
                      fontSize: "1.5rem",
                    }}
                  >
                    <FaYoutube />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default About;
