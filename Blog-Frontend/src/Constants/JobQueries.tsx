import axios from 'axios';
import { BASE_API } from './BrowseRoutes';
import { getHeadersData } from './Headers';

export const fetchCareerData = async () => {
  const response = await axios.get(`${BASE_API}/api/jobs`);
  if (response.data.ok) {
    return response.data.jobPosts;
  } else {
    throw new Error('Error fetching blog data');
  }
};

export const fetchJobByUrl = async (jobUrl: string) => {
  const response = await axios.get(`${BASE_API}/api/job/${jobUrl}`);
  return response.data.jobPost;
};

export const deleteJob = async (jobId: string) => {
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
