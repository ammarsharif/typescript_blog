import { useContext } from 'react';
import styles from './CareersList.module.css';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import CareersListWrapper from '../ReuseableComponents/CareersListsWrapper/CareersListsWrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import AddButton from '../AddButton/AddButton';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BASE_API } from '../../Constants/BrowseRoutes';
import Loader from '../Loader/Loader';
import { getHeadersData } from '../../Constants/Headers';

interface CareersListProps {
  primaryFont?: string;
  secondaryFont?: string;
}
interface CareersDataProps {
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
const CareersList: React.FC<CareersListProps> = () => {
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

    mutate(jobId, {
      onSuccess: (deletedJobId) => {
        careerData?.filter((job: CareersDataProps) => job._id !== deletedJobId);

        alert('Job Deleted successfully.');
        console.log('Deleted job');
      },
      onError: (error) => {
        console.error('Error deleting the Job:', error);
      },
    });
  };
  const theme = useContext(ThemeContext);

  const primaryFontStyle = {
    fontFamily: theme.primaryFont,
  };

  const secondaryFontStyle = {
    fontFamily: theme.secondaryFont,
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
    navigate('/createcareers');
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading blog posts.</div>;
  }
  return (
    <ContentContainer width={85}>
      <div className={styles.bannerWrapper}>
        <div className={styles.header} id="careers">
          <h4 style={primaryFontStyle}>Careers</h4>
          <p style={secondaryFontStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
        <div className={styles.careers_list}>
          <AddButton
            onClick={handleAddButton}
            width={17.5}
            height={9.5}
            margin={1.2}
            name="New Job"
          />
          {careerData?.map((careers: CareersDataProps) => (
            <div className={styles.blogsList}>
              <CareersListWrapper
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
                      {careers.title}
                    </NavLink>
                  </div>
                }
                location={<div>{careers.location}</div>}
                contentDate={formatDate(careers.datePosted)}
                jobType={careers.jobType}
              >
                <div>
                  <NavLink to={`/careerslist/${careers?._id}`}>
                    <button className={styles.buttonEdit}>Edit</button>
                  </NavLink>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => deleteHandler(careers._id)}
                  >
                    Delete
                  </button>
                </div>
              </CareersListWrapper>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default CareersList;
