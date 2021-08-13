import { RouteProp } from '@react-navigation/native';

export type HomeStackParamsList = {
  Tabbar: undefined;
  EventDetail: { item: any };
  Drawer: undefined;
  Setting: undefined;
  CreateClass: undefined;
  ClassDetail: { item: any };
  Homework: { homework: any; student: any };
  CreateHomework: undefined;
  Report: { item: any };
};

export type HomeStackRouteProps<
  HomeStackRouteName extends keyof HomeStackParamsList,
> = RouteProp<HomeStackParamsList, HomeStackRouteName>;
