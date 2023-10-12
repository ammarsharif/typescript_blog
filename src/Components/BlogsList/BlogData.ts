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
  blogImage?: string;
  blogTitle: string;
  blogAuthor: string;
  blogContent: string;
  blogSummary: string;
  blogUrl?: string;
}

const BlogData: BlogDataProps[] = [
  {
    blogImage: image,
    blogTitle: `Tax Tips`,
    id: uuid4(),
    blogAuthor: 'Joseph',
    blogSummary: 'Joseph author',
    blogContent:
      'In common usage and statistics, data is a collection of discrete or continuous values that convey information, describing the quantity, quality, fact, statistics, other basic units of meaning, or simply sequences of symbols that may be further interpreted formally.Transforming Businesses with Cutting-Edge Technology Our comprehensive range of services covers every aspect of the software development lifecycle. From conceptualization and design to development, implementation, and ongoing support, we ensure a seamless experience throughout the entire process. We leverage the latest technologies, industry best practices, and agile methodologies to deliver scalable, secure, and user-friendly software solutions.In common usage and statistics, data is a collection of discrete or continuous values that convey information, describing the quantity, quality, fact, statistics, other basic units of meaning, or simply sequences of symbols that may be further interpreted formally.',
    blogUrl: 'Tax-Tips-September-2023',
  },
  {
    blogImage: stateImage,
    blogTitle: `Pass-Through Entity`,
    id: uuid4(),
    blogAuthor: 'Mark',
    blogSummary: 'Mark author',
    blogContent:
      'Transforming Businesses with Cutting-Edge Technology Our comprehensive range of services covers every aspect of the software development lifecycle. From conceptualization and design to development, implementation, and ongoing support, we ensure a seamless experience throughout the entire process. We leverage the latest technologies, industry best practices, and agile methodologies to deliver scalable, secure, and user-friendly software solutions.In common usage and statistics, data is a collection of discrete or continuous values that convey information, describing the quantity, quality, fact, statistics, other basic units of meaning, or simply sequences of symbols that may be further interpreted formally.Transforming Businesses with Cutting-Edge Technology Our comprehensive range of services covers every aspect of the software development lifecycle. From conceptualization and design to development, implementation, and ongoing support, we ensure a seamless experience throughout the entire process.',
    blogUrl: 'State-Pass-Through-Entity',
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
