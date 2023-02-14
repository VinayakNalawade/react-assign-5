import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {isLoading: 'loading', itemDetails: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: 'loading'})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()

    if (response.ok) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        itemDetails: {similarJobs, jobDetails},
        isLoading: 'success',
      })
    } else {
      this.setState({isLoading: 'failure'})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
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
      <button className="profile-retryBtn" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderSkills = item => (
    <li className="jobItemDetails-skills-li" key={item.name}>
      <img
        className="jobItemDetails-skills-img"
        alt={item.name}
        src={item.imageUrl}
      />
      <h1 className="jobItemDetails-skills-heading">{item.name}</h1>
    </li>
  )

  renderSimilar = item => (
    <li className="jobItemDetails-jobitem" key={item.id}>
      <div className="jobitem-logotitle-container">
        <img
          className="jobitem-companylogo"
          alt="similar job company logo"
          src={item.companyLogoUrl}
        />
        <div className="jobitem-namerating-container">
          <h1 className="jobitem-title">{item.title}</h1>
          <div className="jobitem-rating-container">
            <AiFillStar className="jobitem-star" />
            <p className="jobitem-rating">{item.rating}</p>
          </div>
        </div>
      </div>

      <h1 className="jobitem-descriptionheading">Description</h1>
      <p className="jobitem-descriptionpara">{item.jobDescription}</p>

      <div className="jobItemDetails-locationtype-container">
        <div className="jobitem-location-container">
          <MdLocationOn className="jobitem-location-img" />
          <p className="jobitem-location">{item.location}</p>
        </div>
        <div className="jobitem-location-container">
          <BsFillBriefcaseFill className="jobitem-location-img" />
          <p className="jobitem-location">{item.employmentType}</p>
        </div>
      </div>
    </li>
  )

  renderSuccess = () => {
    const {itemDetails} = this.state
    const item = itemDetails.jobDetails
    const similar = itemDetails.similarJobs

    return (
      <div className="jobItemDetails-success">
        <div className="jobitem">
          <div className="jobitem-logotitle-container">
            <img
              className="jobitem-companylogo"
              alt="job details company logo"
              src={item.companyLogoUrl}
            />
            <div className="jobitem-namerating-container">
              <h1 className="jobitem-title">{item.title}</h1>
              <div className="jobitem-rating-container">
                <AiFillStar className="jobitem-star" />
                <p className="jobitem-rating">{item.rating}</p>
              </div>
            </div>
          </div>

          <div className="jobitem-locationtype-container">
            <div className="jobitem-location-container">
              <MdLocationOn className="jobitem-location-img" />
              <p className="jobitem-location">{item.location}</p>
            </div>
            <div className="jobitem-location-container">
              <BsFillBriefcaseFill className="jobitem-location-img" />
              <p className="jobitem-location">{item.employmentType}</p>
            </div>
            <p className="jobitem-package">{item.packagePerAnnum}</p>
          </div>

          <div className="jobItemDetails-jobitem-description-container">
            <h1 className="jobitem-descriptionheading">Description</h1>
            <a
              className="jobItemDetails-jobitem-visit"
              href={item.companyWebsiteUrl}
            >
              Visit
              <BsBoxArrowUpRight className="jobItemDetails-jobitem-visit-img" />
            </a>
          </div>

          <p className="jobitem-descriptionpara">{item.jobDescription}</p>
          <h1 className="jobitem-descriptionheading">Skills</h1>
          <ul className="jobItemDetails-jobitem-skills-ul">
            {item.skills.map(each => this.renderSkills(each))}
          </ul>
          <h1 className="jobitem-descriptionheading">Life at Company</h1>

          <div className="jobItemDetails-jobitem-lifeAtCompany">
            <p className="jobitem-descriptionpara">
              {item.lifeAtCompany.description}
            </p>
            <img
              className="jobItemDetails-jobitem-lifeAtCompany-img"
              alt="life at company"
              src={item.lifeAtCompany.imageUrl}
            />
          </div>
        </div>

        <h1 className="jobItemDetails-similarheading">Similar Jobs</h1>

        <ul className="jobItemDetails-similar-ul">
          {similar.map(each => this.renderSimilar(each))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case 'success':
        return this.renderSuccess()
      case 'failure':
        return this.renderFailure()
      case 'loading':
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobItemDetails-container">
        <Header />
        {this.renderJobItemDetails()}
      </div>
    )
  }
}

export default JobItemDetails
