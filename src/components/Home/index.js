import Header from '../Header'

import './index.css'

const Home = props => {
  const redirectToFindJobs = () => {
    const {history} = props

    history.push('/jobs')
  }
  return (
    <div className="main-container">
      <Header />
      <div className="home">
        <div className="home-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your ability and potential.
          </p>
          <button
            className="home-findJobsBtn"
            type="button"
            onClick={redirectToFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
