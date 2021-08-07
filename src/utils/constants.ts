import { Dimensions } from 'react-native';

export const colors = {
  background: '#bcdcf7',
  title: '#cc0065',
  white: '#fff',
  black: '#000',
  buttonNewClass: '#fb7299',
  homeBgc: '#ffe195',
  classroomBgc: '#d589eb',
  bookingBgc: '#d4e784',
  summaryBgc: '#ff7979',
  buttonLoginBgc: '#6699cc',
  pinkBgc: '#ff94b1',
  completed: '#49ce7d',
  incompleted: '#f32328',
};
const { width, height } = Dimensions.get('screen');

export const ScreenWidth = width;
export const ScreenHeight = height;

export const baseURL = 'https://classlink-thai.herokuapp.com/'
