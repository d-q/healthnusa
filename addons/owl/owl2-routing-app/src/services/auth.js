export class AuthService {
    static isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  
    static getUsername() {
      return localStorage.getItem('username') || '';
    }
  
    static logout() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
  }