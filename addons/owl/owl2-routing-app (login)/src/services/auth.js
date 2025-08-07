export class AuthService {
  // static ODOO_URL = 'http://localhost:8069'; // Sesuaikan dengan URL Odoo Anda
  static ODOO_URL = ''
  static DB_NAME = 'nusahealth_1'; // Sesuaikan dengan nama database

  static isLoggedIn() {
    return localStorage.getItem('odoo_session_id') !== null;
  }

  static getUsername() {
    return localStorage.getItem('odoo_username') || '';
  }

  static getSessionId() {
    return localStorage.getItem('odoo_session_id');
  }

  static getUserId() {
    return localStorage.getItem('odoo_user_id');
  }

  static async login(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "jsonrpc": "2.0",
      "params": {
        "db": this.DB_NAME, // Langsung gunakan static DB_NAME
        "login": username,
        "password": password
      }
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${this.ODOO_URL}/web/session/authenticate`, requestOptions);

      console.log(" response >>>> ", response)
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.data.message || 'Login failed');
      }

      if (result.result && result.result.uid) {
        // Login berhasil, simpan session info
        localStorage.setItem('odoo_session_id', result.result.session_id);
        localStorage.setItem('odoo_username', result.result.username || username);
        localStorage.setItem('odoo_user_id', result.result.uid.toString());
        localStorage.setItem('odoo_user_context', JSON.stringify(result.result.user_context));

        return {
          success: true,
          user: {
            id: result.result.uid,
            username: result.result.username || username,
            name: result.result.name,
            session_id: result.result.session_id
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Network error. Please check if Odoo server is running.'
      };
    }
  }

  static async logout() {
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Optional: Call Odoo logout endpoint
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "jsonrpc": "2.0",
          "params": {}
        });

        await fetch(`${this.ODOO_URL}/web/session/destroy`, {
          method: "POST",
          headers: myHeaders,
          body: raw
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    // Clear local storage
    localStorage.removeItem('odoo_session_id');
    localStorage.removeItem('odoo_username');
    localStorage.removeItem('odoo_user_id');
    localStorage.removeItem('odoo_user_context');
  }

  static async checkSession() {
    const sessionId = this.getSessionId();

    if (!sessionId) {
      return false;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "jsonrpc": "2.0",
        "params": {}
      });

      const response = await fetch(`${this.ODOO_URL}/web/session/get_session_info`, {
        method: "POST",
        headers: myHeaders,
        body: raw
      });

      const result = await response.json();

      if (result.result && result.result.uid) {
        return true;
      } else {
        // Session expired, clear local storage
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  }
}