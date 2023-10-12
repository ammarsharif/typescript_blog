import image from './img/HSA.jpeg';
import stateImage from './img/Pass-Through Entity.jpeg';
import { v4 as uuid4 } from 'uuid';
interface Props {
  id?: string;
  blogUrl?: string;
  blogSummary?: string;
  blogAuthor?: string;
  blogTitle?: string;
  blogContent?: string;
  blogImage?: string;
}
const MOCK_DATA: Props[] = [
  {
    id: uuid4(),
    blogUrl: 'Tax-Tips-September-2023',
    blogSummary: 'Joseph author',
    blogAuthor: 'Joseph author',
    blogContent: `Tax Tips`,
    blogTitle: `Tax Tips`,
    blogImage: image,
  },
  {
    id: uuid4(),
    blogUrl: 'Tax-Tips-September-2023',
    blogSummary: 'Mark author',
    blogAuthor: 'Joseph author',
    blogContent: `Tax Tips`,
    blogTitle: `Pass-Through Entity`,
    blogImage: stateImage,
  },
];

export default MOCK_DATA;
