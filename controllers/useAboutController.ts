
import { UserService } from '../services/UserService';
import { ThemeService } from '../services/ThemeService';

export const useAboutController = () => {
  const user = UserService.getUserInfo();
  const theme = ThemeService.getColors();
  const dimensions = ThemeService.getDimensions();

  return {
    user,
    theme,
    dimensions
  };
};
