import { Dimensions } from 'react-native';

export const colors = {
  background: '#edcef7',
  title: '#cc0065',
  white: '#fff',
  black: '#000',
  buttonNewClass: '#e46f8a',
  homeBgc: '#CC0066',
  classroomBgc: '#edcef7',
  bookingBgc: '#d4e784',
  messageBgc: '#7de7eb',
  summaryBgc: '#ff7979',
  buttonLoginBgc: '#6699cc',
  pinkBgc: '#ff94b1',
  completed: '#49ce7d',
  incompleted: '#f32328',
};
const { width, height } = Dimensions.get('screen');

export const ScreenWidth = width;
export const ScreenHeight = height;

export const baseURL = 'https://classlink-thai.herokuapp.com/api/';
// export const baseURL = 'https://c53d88791259.ngrok.io/api/';
