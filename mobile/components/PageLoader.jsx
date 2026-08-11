import { View, ActivityIndicator } from 'react-native';
// import {styles} from "../assets/styles/home.styles";
// import { COLORS } from '../constants/colors';
import { useTheme } from "../context/ThemeContext";
import { createHomeStyles } from "../assets/styles/home.styles";

const PageLoader = () => {
  const { COLORS } = useTheme();
  const styles = createHomeStyles(COLORS);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default PageLoader;