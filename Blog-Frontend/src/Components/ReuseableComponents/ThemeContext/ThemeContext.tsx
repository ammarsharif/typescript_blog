import { createContext, ReactNode } from 'react';
import ThemeDefault from './ThemeDefault';

interface SocialMediaLinks {
  linkedin: string;
  facebook: string;
}

interface TestimonialColors {
  cardBackgroundColor: string;
  cardImageBorderColor: string;
  cardDividerColor: string;
  carouselNavColor: string;
}

interface MapParams {
  query: string;
  zoom: number;
}

interface ThemeContextData {
  primaryFont: string;
  secondaryFont: string;
  primaryColor: string;
  secondaryColor: string;
  whiteColor: string;
  blackColor: string;
  businessName: string;
  phoneNumber: string;
  email: string;
  address: string;
  headerTitle: ReactNode;
  whiteLogo: string;
  coloredLogo: string;
  socialMediaLinks: SocialMediaLinks;
  testimonialColors: TestimonialColors;
  mapParams: MapParams;
}

export const ThemeContext = createContext<ThemeContextData>(ThemeDefault);
