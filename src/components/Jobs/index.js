import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobsItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    search: '',
    profileLoading: '',
    profileDetails: {},
    jobsLoading: '',
    jobsData: [],
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileLoading: 'loading'})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)

    const data = await response.json()

    if (response.ok) {
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileDetails, profileLoading: 'success'})
    } else {
      this.setState({profileLoading: 'failure'})
    }
  }

  getJobs = async () => {
    this.setState({jobsLoading: 'loading'})

    const jwtToken = Cookies.get('jwt_token')

    const {search, employmentType, salaryRange} = this.state

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${search}`,
      options,
    )

    const data = await response.json()

    if (response.ok) {
      const jobsData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsData, jobsLoading: 'success'})
    } else {
      this.setState({jobsLoading: 'failure'})
    }
  }

  changeSearch = event => this.setState({search: event.target.value})

  triggerSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  changeEmploymentType = event => {
    const {employmentType} = this.state
    const types = [...employmentType]

    if (event.target.checked) {
      types.push(event.target.value)
      this.setState({employmentType: types}, this.getJobs)
    } else {
      this.setState(
        {
          employmentType: types.filter(each => each !== event.target.value),
        },
        this.getJobs,
      )
    }
  }

  changeSalaryRange = event =>
    this.setState({salaryRange: event.target.value}, this.getJobs)

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileLoading, profileDetails} = this.state

    switch (profileLoading) {
      case 'loading':
        return this.renderLoading()
      case 'success':
        return (
          <div className="profile-container">
            <img
              className="profile-img"
              alt="profile avatar"
              src={profileDetails.profileImageUrl}
            />
            <h1 className="profile-name">{profileDetails.name}</h1>
            <p className="profile-bio">{profileDetails.shortBio}</p>
          </div>
        )
      case 'failure':
        return (
          <div className="profile-failure">
            <button
              className="profile-retryBtn"
              type="button"
              onClick={this.getProfile}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderTypeOfEmployment = () => (
    <div className="jobs-filterContainer">
      <h1 className="jobs-filterContainer-heading">Type of Employment</h1>
      <ul className="jobs-filterContainer-ul">
        {employmentTypesList.map(each => (
          <li className="jobs-filterContainer-li" key={each.employmentTypeId}>
            <input
              className="jobs-filterContainer-input"
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={this.changeEmploymentType}
            />
            <label
              className="jobs-filterContainer-label"
              htmlFor={each.employmentTypeId}
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRange = () => (
    <div className="jobs-filterContainer">
      <h1 className="jobs-filterContainer-heading">Salary Range</h1>
      <ul className="jobs-filterContainer-ul">
        {salaryRangesList.map(each => (
          <li className="jobs-filterContainer-li" key={each.salaryRangeId}>
            <input
              className="jobs-filterContainer-input"
              type="radio"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={this.changeSalaryRange}
              name="salaryRange"
            />
            <label
              className="jobs-filterContainer-label"
              htmlFor={each.salaryRangeId}
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderJobs = () => {
    const {jobsLoading, jobsData} = this.state

    switch (jobsLoading) {
      case 'loading':
        return this.renderLoading()
      case 'success':
        if (jobsData.length === 0) {
          return (
            <div className="jobs-nojobs">
              <img
                className="jobs-nojobsimg"
                alt="no jobs"
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              />
            </div>
          )
        }
        return (
          <div className="jobs-ul">
            {jobsData.map(each => (
              <JobsItem key={each.id} item={each} />
            ))}
          </div>
        )
      case 'failure':
        return (
          <div className="jobs-failure">
            <img
              className="jobs-failure-img"
              alt="failure view"
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            />
            <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
            <p className="jobs-failure-para">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              className="profile-retryBtn"
              type="button"
              onClick={this.getJobs}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {search} = this.state

    return (
      <div className="main-container">
        <Header />
        <div className="jobs-container">
          <div className="jobs-topSection">
            <div className="jobs-search-container-sm">
              <input
                onKeyDown={this.triggerSearch}
                className="jobs-search"
                type="search"
                value={search}
                placeholder="Search"
                onChange={this.changeSearch}
              />
              <button
                type="button"
                className="searchButton"
                data-testid="searchButton"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderProfile()}
            {this.renderTypeOfEmployment()}
            {this.renderSalaryRange()}
          </div>
          <div className="jobs-bottomSection">
            <div className="jobs-search-container-lg">
              <input
                onKeyDown={this.triggerSearch}
                className="jobs-search"
                type="search"
                value={search}
                placeholder="Search"
                onChange={this.changeSearch}
              />
              <button
                className="searchButton"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
