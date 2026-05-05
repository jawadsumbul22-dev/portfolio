import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">Professional Summary</h3>
        <p className="para">
          Motivated and self-driven college student with a strong foundation in Linux systems, cloud infrastructure, and 
          DevOps tools. Passionate about automation, cloud computing, and building reliable systems. Seeking a DevOps 
          internship to apply hands-on technical skills in a real-world environment and contribute meaningfully to a forward-thinking team.
        </p>
        <h3 className="title" style={{ marginTop: "2rem" }}>Core Strengths</h3>
        <ul className="para" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
          <li>Fast learner with ability to pick up new tools independently</li>
          <li>Strong problem-solving mindset with attention to detail</li>
          <li>Highly self-motivated — actively building DevOps skills</li>
          <li>Reliable and disciplined — proven by consistent commitment</li>
          <li>Eager to contribute, grow, and take on real-world challenges</li>
        </ul>
        <p className="para" style={{ marginTop: "1rem", fontWeight: "bold" }}>
          Available for immediate internship | Open to remote & on-site opportunities
        </p>
      </div>
    </div>
  );
};

export default About;
