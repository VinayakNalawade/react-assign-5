import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {item} = props

  return (
    <Link className="link" to={`/jobs/${item.id}`}>
      <li className="jobitem">
        <div className="jobitem-logotitle-container">
          <img
            className="jobitem-companylogo"
            alt="company logo"
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

        <h1 className="jobitem-descriptionheading">Description</h1>
        <p className="jobitem-descriptionpara">{item.jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
