import image from './img/HSA.jpeg';
// import imageEngage from './img/ImageEngage.jpeg';
import stateImage from './img/Pass-Through Entity.jpeg';
// import profit from './img/Unstoppable Profit.jpeg';
// import erc from './img/Employee Retention Credit.jpeg';
// import flexibility from './img/Flexibility Requirements.jpeg';
// import claim from './img/ERC Claims.jpeg';
// import countries from './img/Counties Across California.jpeg';
// import pte from './img/taxPayer.jpeg';
import { v4 as uuid4 } from 'uuid';
// import insurance from './img/Health Insurance.jpeg';
interface BlogDataProps {
  id?: string | number;
  image?: string;
  title: string;
  author: string;
  summary: string;
  url?: string;
}

const BlogData: BlogDataProps[] = [
  {
    image,
    title: `Tax Tips`,
    id: uuid4(),
    author: 'Joseph',
    summary: 'Joseph author',
    url: 'Tax-Tips-September-2023',
  },
  {
    image: stateImage,
    title: `Pass-Through Entity`,
    id: uuid4(),
    author: 'Mark',
    summary: 'Mark author',
    url: 'State-Pass-Through-Entity',
  },
  // {
  //   image: pte,
  //   title: `Pass-Through Entity (PTE)`,
  //   id: uuid4(),
  //   url: 'Pass-Through-Entity-(PTE)',
  // },
  // {
  //   image: profit,
  //   title: `Unstoppable Profit`,
  //   id: uuid4(),
  //   url: 'Preview-of-the-Unstoppable-Profit-Program',
  // },
  // {
  //   image: erc,
  //   id: uuid4(),
  //   title: `Employee Retention Credit (ERC)`,
  //   url: 'Employee-Retention-Credit-(ERC)',
  // },
  // {
  //   image: flexibility,
  //   id: uuid4(),
  //   title: `Flexibility Requirements`,
  //   url: 'Form-I-9-Flexibility-Requirements',
  // },
  // {
  //   image: claim,
  //   id: uuid4(),
  //   title: `New ERC Claims`,
  //   date: 'Mon, 19 Mar 2022',
  //   url: 'New-ERC-Claims',
  // },
  // {
  //   image: countries,
  //   id: uuid4(),
  //   title: `Counties Across California`,
  //   url: 'Numerous-Cities-and-Counties-Across-California',
  // },

  // {
  //   image: imageEngage,
  //   id: uuid4(),
  //   title: `Preview of the ENGAGE 2023`,
  //   url: 'Preview-Of-The-ENGAGE-2023',
  // },
  // {
  //   image: insurance,
  //   id: uuid4(),
  //   title: `Health Insurance`,
  //   url: 'Corp-Owners-Deducting-Health-Insurance',
  // },
];

export default BlogData;
