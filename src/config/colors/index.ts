const DefaultColors = {
  Base: '#FFFFFF',
  SecondayBase:"#F4F4F4",
  PrimaryTextColor: '#212121',
  TextInputBaseColor: '#FFFFFF',
  WhiteOpacity: (opacity = '0.5') => `rgba(255, 255, 255, ${opacity})`,
  BlackOpacity: (opacity = '0.5') => `rgba(0, 0, 0, ${opacity})`,
  DisabledColor: (opacity = '0.5') => `rgba(20, 60, 133, ${opacity})`,
  BaseOpacity: (opacity = '0.5') => `rgba(255, 255, 255, ${opacity})`,
  PrimaryColorOpacity: (opacity = '0.5') => `rgba(51, 153, 102,${opacity})`,
  WhiteTwentyOpacity: 'rgba(255, 255, 255, 0.2)',
  Primary: '#329966',
  Secondary: '#1B2043',
  // Text Colors
  SecondaryTextColor: '#757575',
  TertiaryTextColor: '#FCB706',
  LightGreyText: 'rgba(154, 154, 154, 0.8)',
  CourseContainerColor: '#F9F9F9',
  SuccessTextColor: '#00b050',
  ErrorTextColor: '#FF8179',
  PrimaryOpacity: '#624CFD14',
  NotFocussed: '#888888',
  Danger: '#BE1E24',
  Grey: '#00000020',
  Black: "#000000",
  Success: '#1cd50f',
  TextInputBorderColor: 'rgba(146, 146, 146, 0.49)',
  DotGrey: '#757575',
  TextInputPlaceholserColor: '#BBBBBB',
  greenLike: '#339966',
  InActiveTabBar: '#A6A6A6',
  LineColor: '#20233C',
  Transparent: 'rgba(255, 255, 255, 0)',
  CardColor:"#5F5F5F10",
  LightGrayTextColor:"#A4A4A4",
  stroke: "#C8C8C8",
  BlueTextColor:"#21C8F6",
  GrayTextColor:"#5F5F5F"
};

const DarkModeColors = {
  ...DefaultColors,
  Base: '#121212',
  PrimaryTextColor: '#FFFFFF',
  TextInputBaseColor: '#121212',
  CourseContainerColor: '#121212'
};

// let selectedTheme = (isDark?: boolean) =>
//   isDark ? DarkModeColors : DefaultColors;

export default {DefaultColors, DarkModeColors};
