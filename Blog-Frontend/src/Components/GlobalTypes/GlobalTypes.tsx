export interface blogListProps {
  blogTitle: string;
  blogAuthor: string;
  blogSummary: string;
  blogImageUrl: string;
  blogContent: string;
  blogUrl?: string;
}
export interface JobProps {
  title: string;
  location: string;
  description: string;
  jobType: string;
  requirements: string[];
  offers: string[];
  datePosted: Date;
}

export interface JobsListWrapperProps {
  imageSection?: React.ReactNode;
  contentSection?: React.ReactNode;
  contentDate?: React.ReactNode;
  location?: React.ReactNode;
  jobType?: React.ReactNode;
  children?: React.ReactElement;
}
export interface BlogProps {
  imageSection?: React.ReactElement;
  contentSection?: React.ReactElement;
  contentDate?: React.ReactNode;
  children?: React.ReactElement;
}

export interface AddButtonProps {
  width?: number;
  height?: number;
  margin?: number;
  className?: string;
  name?: string;
  onClick: () => void;
}
export interface ThemeProps {
  primaryFont?: string;
  secondaryFont?: string;
  primaryColor?: string;
}
