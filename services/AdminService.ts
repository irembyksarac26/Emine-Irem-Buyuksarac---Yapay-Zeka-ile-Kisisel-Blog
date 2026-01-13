
export class AdminService {
  private static AUTH_KEY = 'admin_session_active';
  private static PASS = 'İrem123';

  static login(password: string): boolean {
    if (password === this.PASS) {
      localStorage.setItem(this.AUTH_KEY, 'true');
      return true;
    }
    return false;
  }

  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
