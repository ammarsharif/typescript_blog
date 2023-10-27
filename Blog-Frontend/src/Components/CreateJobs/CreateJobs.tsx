import React, { useEffect, useState } from 'react';
import styles from './CreateJobs.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_API, BrowserRoutes } from '../../Constants/BrowseRoutes';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { getHeadersData } from '../../Constants/Headers';
import { JobProps, ThemeProps } from '../GlobalTypes/GlobalTypes';
import { fetchJobByUrl } from '../../Constants/JobQueries';
export interface ModifiedCreateJobProps extends Omit<JobProps, 'datePosted'> {
  _id?: string;
}
const initialJobState: ModifiedCreateJobProps = {
  _id: '',
  title: '',
  location: '',
  description: '',
  jobType: '',
  requirements: [],
  offers: [],
};

const CreateJobs: React.FC<ThemeProps> = () => {
  const { pathname } = useLocation();
  const [jobData, setJobData] =
    useState<ModifiedCreateJobProps>(initialJobState);

  const { jobUrl } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(['job', jobUrl], () => {
    if (jobUrl) {
      return fetchJobByUrl(jobUrl);
    }
    return null;
  });
  const isDisabled = () => {
    const requiredFields = [
      jobData.title,
      jobData.location,
      jobData.jobType,
      jobData.description,
    ];

    const hasEmptyFields = requiredFields.some(
      (value) => typeof value === 'string' && value.trim() === ''
    );

    const isRequirementsEmpty = jobData.requirements
      .map((req) => req.trim())
      .every((req) => req === '');

    const isOffersEmpty = jobData.offers
      .map((offer) => offer.trim())
      .every((offer) => offer === '');

    return hasEmptyFields || isRequirementsEmpty || isOffersEmpty;
  };
  useEffect(() => {
    if (data) {
      if (jobData._id !== data._id) {
        setJobData(data);
      }
    } else {
      setJobData(initialJobState);
    }
  }, [data, jobData._id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jobData._id) {
      try {
        const updateJob = {
          ...jobData,
          requirements: jobData.requirements.filter(
            (requirement) => requirement
          ),
          offers: jobData.offers.filter((offer) => offer),
        };

        const response = await axios.put(
          `${BASE_API}/api/job/${jobData._id}`,
          updateJob,
          getHeadersData()
        );
        if (response.data.ok) {
          navigate('/jobs');
        }
        alert('Job updated successfully.');
      } catch (error) {
        console.error('Error creating a new Job post:', error);
      }
    } else {
      try {
        const createJob = {
          ...jobData,
          requirements: jobData.requirements.filter(
            (requirement) => requirement
          ),
          offers: jobData.offers.filter((offer) => offer),
        };
        delete createJob._id;
        const response = await axios.post(
          `${BASE_API}/api/job`,
          createJob,
          getHeadersData()
        );
        const blog = response.data;
        alert('Job created successfully.');
        console.log(blog, 'Created Job');

        if (response.data.ok) {
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error creating a new job post:', error);
      }
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className={styles.errorText}>No Job Found With This URL.</div>;
  }
  const handleStateChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'offers' || name === 'requirements') {
      const valueArray = value.split('\n');
      setJobData({ ...jobData, [name]: valueArray });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };
  return (
    <ContentContainer width={70}>
      <div className={styles.header}>
        <h3 className={styles.heading}>
          {pathname === BrowserRoutes.CREATEJOBS ? 'Add' : 'Edit'} Job
        </h3>
      </div>
      <div data-testid="Create-jobs">
        <form className={styles.formContainer}>
          <div>
            <label className={styles.formLabel} htmlFor="title">
              Title:
            </label>
            <input
              className={styles.formInput}
              data-testid="Jobs-title"
              type="text"
              name="title"
              id="title"
              value={jobData.title}
              placeholder="Job Title"
              onChange={handleStateChange}
            />
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="location">
              Location:
            </label>
            <input
              className={styles.formInput}
              data-testid="Jobs-location"
              type="text"
              name="location"
              id="location"
              value={jobData.location}
              placeholder="Location"
              onChange={handleStateChange}
            />
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="jobType">
              Job Type:
            </label>
            <select
              className={styles.selector}
              data-testid="Jobs-type"
              name="jobType"
              id="jobType"
              value={jobData.jobType}
              onChange={handleStateChange}
            >
              <option value="">Select Job Type</option>
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="description">
              Description:
            </label>
            <textarea
              className={styles.descriptionArea}
              data-testid="Jobs-description"
              name="description"
              id="description"
              value={jobData.description}
              placeholder="Description"
              onChange={handleStateChange}
            />
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="requirements">
              Requirements:
            </label>
            <textarea
              className={styles.textarea}
              data-testid="Jobs-requirements"
              name="requirements"
              id="requirements"
              placeholder="Enter requirements as bullet points (one per line)"
              value={
                Array.isArray(jobData.requirements)
                  ? jobData.requirements.join('\n')
                  : ''
              }
              onChange={handleStateChange}
            />
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="offers">
              Offers:
            </label>
            <textarea
              className={styles.textarea}
              data-testid="Jobs-offers"
              name="offers"
              id="offers"
              placeholder="Enter offers as bullet points (one per line)"
              value={
                Array.isArray(jobData.offers) ? jobData.offers.join('\n') : ''
              }
              onChange={handleStateChange}
            />
          </div>

          <button
            className={`${styles.formButton} ${
              isDisabled() ? styles.disabledButton : ''
            }`}
            onClick={handleSubmit}
            data-testid="Form-button"
            disabled={isDisabled()}
          >
            Submit
          </button>
        </form>
      </div>
    </ContentContainer>
  );
};

export default CreateJobs;
