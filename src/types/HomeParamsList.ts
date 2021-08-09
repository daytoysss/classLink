import { RouteProp } from '@react-navigation/native';

export type HomeStackParamsList = {
  Tabbar: undefined;
  EventDetail: { item: any };
  Drawer: undefined;
  Setting: undefined;
  CreateClass: undefined;
  ClassDetail: { item: any };
  Homework: undefined;
  CreateHomework: undefined;
  Report: { name: string };
};

export type HomeStackRouteProps<
  HomeStackRouteName extends keyof HomeStackParamsList,
> = RouteProp<HomeStackParamsList, HomeStackRouteName>;
