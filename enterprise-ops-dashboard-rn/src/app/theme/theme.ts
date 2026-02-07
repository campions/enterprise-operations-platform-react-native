import { MD3LightTheme, configureFonts, MD3Theme } from 'react-native-paper';

const primaryFont = {
  fontFamily: 'System'
};

const customFonts = configureFonts({
  config: {
    thin: primaryFont,
    light: primaryFont,
    regular: primaryFont,
    medium: primaryFont,
    bold: primaryFont,
    heavy: primaryFont
  }
});

export const appTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: customFonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0055BA',
    secondary: '#00A3FF',
    tertiary: '#FEB95A',
    background: '#F5F7FA',
    surface: '#FFFFFF'
  }
};
