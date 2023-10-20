import axios from 'axios';
import { BASE_API } from './BrowseRoutes';
import { getHeadersData } from './Headers';

export const fetchBlogData = async () => {
  const response = await axios.get(`${BASE_API}/api/blogs`);
  if (response.data.ok) {
    return response.data.data;
  } else {
    throw new Error('Error fetching blog data');
  }
};

export const fetchBlogByUrl = async (blogUrl: string) => {
  const response = await axios.get(`${BASE_API}/api/blog/${blogUrl}`);
  return response.data.data;
};

export const deleteBlog = async (blogId: string) => {
  const response = await axios.delete(
    `${BASE_API}/api/blog/${blogId}`,
    getHeadersData()
  );
  if (response.status === 204) {
    return blogId;
  } else {
    throw new Error(`Unexpected status code: ${response.status}`);
  }
};
