/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type NO_PARAMS = undefined;
export type RootStackParamList = {
  Root: NO_PARAMS;
  NotFound: NO_PARAMS;
};

export type MainStackParamList = {
  Main: NO_PARAMS;
  CompletedScreen: NO_PARAMS;
  AboutScreen: NO_PARAMS;
  PlayScreen: {
    id: string;
  };
};

export type BottomTabParamList = {
  Home: NO_PARAMS;
  Stats: NO_PARAMS;
  Settings: NO_PARAMS;
};