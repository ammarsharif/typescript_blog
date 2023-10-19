import React, { useEffect, useState } from 'react';
import styles from './CreateCareers.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { BASE_API, BrowserRoutes } from '../../Constants/BrowseRoutes';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { getHeadersData } from '../../Constants/Headers';
interface CreateCareersProps {
  primaryFont?: string;
  secondaryFont?: string;
  primaryColor?: string;
}
interface CreateJobProps {
  _id?: string;
  title: string;
  location: string;
  description: string;
  jobType: string;
  requirements: string;
  offers: string;
}
const initialJobState = {
  _id: '',
  title: '',
  location: '',
  description: '',
  jobType: '',
  requirements: '',
  offers: '',
};

const fetchJobByUrl = async (jobUrl: string) => {
  const response = await axios.get(`${BASE_API}/api/job/${jobUrl}`);
  return response.data.jobPost;
};

const CreateCareers: React.FC<CreateCareersProps> = () => {
  const { pathname } = useLocation();
  const [jobData, setJobData] = useState<CreateJobProps>(initialJobState);
  const [Loading, setLoading] = useState(false);
  const { jobUrl } = useParams();
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
        console.log(typeof jobData.offers);
        const response = await axios.put(
          `${BASE_API}/api/job/${jobData._id}`,
          jobData,
          getHeadersData()
        );
        if (response.data.ok) {
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
      const valueArray = value.split('\n');
      setJobData({ ...jobData, [name]: valueArray });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };
  return (
    <ContentContainer width={70}>
      <div data-testid="Create-Careers">
        <div className={styles.header}>
          <h3 className={styles.heading}>
            {pathname === BrowserRoutes.CREATECAREERS ? 'Add' : 'Edit'} Job
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
                className={styles.textarea}
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
                className={styles.textarea}
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
            <NavLink to={''}>
              <button className={styles.formButton} onClick={handleSubmit}>
                Submit
              </button>
            </NavLink>
          </form>
        )}
      </div>
    </ContentContainer>
  );
};

export default CreateCareers;
