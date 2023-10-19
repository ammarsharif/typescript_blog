import styles from './jobsList.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import JobsListWrapper from '../ReuseableComponents/JobsListsWrapper/JobsListsWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import AddButton from '../AddButton/AddButton';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BASE_API } from '../../Constants/BrowseRoutes';
import Loader from '../Loader/Loader';
import { getHeadersData } from '../../Constants/Headers';

interface JobsListProps {
  primaryFont?: string;
  secondaryFont?: string;
}
interface JobsDataProps {
  _id: string;
  title: string;
  location?: string;
  description?: string;
  jobType?: string;
  requirements?: string;
  offers?: string;
  datePosted: Date;
}
const fetchCareerData = async () => {
  const response = await axios.get(`${BASE_API}/api/jobs`);
  if (response.data.ok) {
    return response.data.jobPosts;
  } else {
    throw new Error('Error fetching blog data');
  }
};
const deleteJob = async (jobId: string) => {
  const response = await axios.delete(
    `${BASE_API}/api/job/${jobId}`,
    getHeadersData()
  );

  if (response.status === 204) {
    return jobId;
  } else {
    throw new Error(`Unexpected status code: ${response.status}`);
  }
};
const JobsList: React.FC<JobsListProps> = () => {
  const queryClient = useQueryClient();
  const {
    data: careerData,
    isLoading,
    isError,
  } = useQuery('blogs', fetchCareerData);
  const { mutate } = useMutation(deleteJob, {
    onSettled: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const deleteHandler = (jobId: string) => {
    console.log('Deleting blog with ID:', jobId);
    alert('Job Deleted successfully.');
    mutate(jobId, {
      onSuccess: (deletedJobId) => {
        careerData?.filter((job: JobsDataProps) => job._id !== deletedJobId);
        console.log('Deleted job');
      },
      onError: (error) => {
        console.error('Error deleting the Job:', error);
      },
    });
  };

  const formatDate = (inputDate: Date) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month < 10 ? `0${month}` : month}-${year}`;
  };
  const navigate = useNavigate();
  const handleAddButton = () => {
    navigate('/createjobs');
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading blog posts.</div>;
  }
  return (
    <ContentContainer width={80}>
      <div className={styles.bannerWrapper}>
        <div className={styles.jobs_list}>
          <AddButton
            onClick={handleAddButton}
            width={17.5}
            height={9.5}
            margin={1.2}
            name="New Job"
          />
          {careerData?.map((jobs: JobsDataProps) => (
            <div className={styles.blogsList}>
              <JobsListWrapper
                contentSection={
                  <div>
                    <NavLink
                      to={''}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        margin: '0em',
                      }}
                    >
                      {jobs.title}
                    </NavLink>
                  </div>
                }
                location={<div>{jobs.location}</div>}
                contentDate={formatDate(jobs.datePosted)}
                jobType={jobs.jobType}
              >
                <div>
                  <NavLink to={`/jobs/${jobs?._id}`}>
                    <button className={styles.buttonEdit}>Edit</button>
                  </NavLink>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => deleteHandler(jobs._id)}
                  >
                    Delete
                  </button>
                </div>
              </JobsListWrapper>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default JobsList;
