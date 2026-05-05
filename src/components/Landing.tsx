import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              JAWAD
              <br />
              <span>AHMAD</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Aspiring</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">DevOps Engineer</div>
              <div className="landing-h2-2">Cloud Enthusiast</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Cloud Enthusiast</div>
              <div className="landing-h2-info-1">DevOps Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
