import { v4 as uuid4 } from 'uuid';
interface CareersDataProps {
  id?: string | number;
  title: string;
  location: string;
  description: string;
  jobType?: string;
  requirements?: string;
  offers?: string;
  datePosted?: string;
}

const CareersData: CareersDataProps[] = [
  {
    id: uuid4(),
    title: `MEAN STACK Developer`,
    location: 'Lahore',
    jobType: 'Onsite',
    description: 'React Native Developer with Experience of 2 years',
    requirements: '2 Years of Experience',
    offers: '30k-50k',
    datePosted: '10 July 2023',
  },
  {
    id: uuid4(),
    title: `React Native Developer`,
    location: 'Lahore  CA',
    jobType: 'Remote',
    description: 'React Native Developer with Experience of 2 years',
    requirements: '3 Years of hands on Experience',
    offers: '60k-80k',
    datePosted: '07 October 2023',
  },
  {
    id: uuid4(),
    title: `MEAN STACK Developer`,
    location: 'Lahore',
    jobType: 'Onsite',
    description: 'React Native Developer with Experience of 2 years',
    requirements: '2 Years of Experience',
    offers: '30k-50k',
    datePosted: '10 July 2023',
  },
  {
    id: uuid4(),
    title: `React Native Developer`,
    location: 'Lahore  CA',
    jobType: 'Remote',
    description: 'React Native Developer with Experience of 2 years',
    requirements: '3 Years of hands on Experience',
    offers: '60k-80k',
    datePosted: '07 October 2023',
  },
];

export default CareersData;
