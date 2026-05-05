import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Assessments
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Currently Enrolled – College (Undergraduate Level)</h4>
                <h5>Self-Learning DevOps</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Pursuing undergraduate studies alongside active self-learning in DevOps and cloud technologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary School Certificate (Matriculation)</h4>
                <h5>Board of Intermediate and Secondary Education</h5>
              </div>
              <h3>PAST</h3>
            </div>
            <p>
              Completed matriculation with Distinction. Passed with a grade of 90.5%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship & Resume Assessment</h4>
                <h5>DCCS</h5>
              </div>
              <h3>CURRENT</h3>
            </div>
            <p>
              Completed 100% of the assessment comprising 2,000 MCQs. Covered resume building, professional presentation, and internship readiness. Demonstrated high commitment, focus, and consistency throughout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
