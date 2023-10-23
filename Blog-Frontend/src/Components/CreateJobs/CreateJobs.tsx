import React, { useEffect, useState } from 'react';
import styles from './Createjobs.module.css';
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
  const [Loading, setLoading] = useState(false);
  const { jobUrl } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(['job', jobUrl], () => {
    if (jobUrl) {
      return fetchJobByUrl(jobUrl);
    }
    return null;
  });
  useEffect(() => {
    if (data) {
      if (jobData._id !== data._id) {
        setJobData(data);
        console.log('Setting State in IF ');
      }
    } else {
      console.log('Setting ELSE');
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
        console.log(typeof jobData.offers);
        const response = await axios.put(
          `${BASE_API}/api/job/${jobData._id}`,
          updateJob,
          getHeadersData()
        );
        if (response.data.ok) {
          navigate('/jobs');
          setLoading(false);
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
          setLoading(false);
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
    return <div>Error loading blog posts.</div>;
  }
  const handleStateChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'offers' || name === 'requirements') {
      let valueArray = value.split('\n');
      setJobData({ ...jobData, [name]: valueArray });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };
  return (
    <ContentContainer width={70}>
      <div data-testid="Create-jobs">
        <div className={styles.header}>
          <h3 className={styles.heading}>
            {pathname === BrowserRoutes.CREATEJOBS ? 'Add' : 'Edit'} Job
          </h3>
        </div>
        {Loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <form className={styles.formContainer}>
            <div>
              <label className={styles.formLabel}>Title:</label>
              <input
                className={styles.formInput}
                type="text"
                name="title"
                value={jobData.title}
                placeholder="Job Title"
                onChange={handleStateChange}
              />
            </div>
            <div>
              <label className={styles.formLabel}>Location:</label>
              <input
                className={styles.formInput}
                type="text"
                name="location"
                value={jobData.location}
                placeholder="Location"
                onChange={handleStateChange}
              />
            </div>
            <div>
              <label className={styles.formLabel}>Job Type:</label>
              <select
                className={styles.selector}
                name="jobType"
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
              <label className={styles.formLabel}>Description:</label>
              <textarea
                className={styles.descriptionArea}
                name="description"
                value={jobData.description}
                placeholder="Description"
                onChange={handleStateChange}
              />
            </div>
            <div>
              <label className={styles.formLabel}>Requirements:</label>
              <textarea
                className={styles.textarea}
                name="requirements"
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
              <label className={styles.formLabel}>Offers:</label>
              <textarea
                className={styles.textarea}
                name="offers"
                placeholder="Enter offers as bullet points (one per line)"
                value={
                  Array.isArray(jobData.offers) ? jobData.offers.join('\n') : ''
                }
                onChange={handleStateChange}
              />
            </div>

            <button className={styles.formButton} onClick={handleSubmit}>
              Submit
            </button>
          </form>
        )}
      </div>
    </ContentContainer>
  );
};

export default CreateJobs;
