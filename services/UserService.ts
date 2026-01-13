
import { USER_INFO, MOCK_POSTS } from '../constants/user';
import { UserData, SocialLinks } from '../models/User';
import { PostSummary } from '../models/Post';

/**
 * UserService acts as a data provider (Model/Service layer).
 */
export class UserService {
  static getUserInfo(): UserData {
    return USER_INFO;
  }

  static getRecentPosts(): PostSummary[] {
    return MOCK_POSTS;
  }

  static getSocialLinks(): SocialLinks {
    const user = this.getUserInfo();
    return {
      email: user.email,
      linkedin: user.linkedin,
      github: user.github
    };
  }
}
