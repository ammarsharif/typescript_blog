import styles from './jobsList.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import JobsListWrapper from '../ReuseableComponents/JobsListsWrapper/JobsListsWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import AddButton from '../AddButton/AddButton';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from '../Loader/Loader';
import { JobProps, ThemeProps } from '../GlobalTypes/GlobalTypes';
import { deleteJob, fetchCareerData } from '../../Constants/JobQueries';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
export interface ModifiedJobListProps extends JobProps {
  _id: string;
}
const JobsList: React.FC<ThemeProps> = () => {
  const queryClient = useQueryClient();
  const {
    data: jobData,
    isLoading,
    isError,
  } = useQuery('jobs', fetchCareerData, {
    cacheTime: 5000,
  });
  const { mutate } = useMutation(deleteJob, {
    onSettled: () => {
      queryClient.invalidateQueries('jobs');
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(jobData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const jobsDisplay = jobData?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  const deleteHandler = (jobId: string) => {
    console.log('Deleting blog with ID:', jobId);
    alert('Job Deleted successfully.');
    mutate(jobId, {
      onSuccess: (deletedJobId) => {
        jobData?.filter(
          (job: ModifiedJobListProps) => job._id !== deletedJobId
        );
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
    return <div className={styles.errorText}>Error Fetching Jobs.</div>;
  }
  return (
    <ContentContainer width={75}>
      <div className={styles.bannerWrapper}>
        <div className={styles.jobs_list}>
          <AddButton
            onClick={handleAddButton}
            width={17.5}
            height={9.5}
            margin={1.2}
            name="New Job"
          />
          {jobsDisplay?.map((jobs: ModifiedJobListProps) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </ContentContainer>
  );
};

export default JobsList;
