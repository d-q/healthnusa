import { Component, xml, useState } from "@odoo/owl";

export class Login extends Component {
    static template = xml`
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2>Login</h2>
      <form t-on-submit.prevent="handleLogin">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Username:</label>
          <input 
            type="text" 
            t-model="state.username" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
            placeholder="Masukkan username"
          />
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Password:</label>
          <input 
            type="password" 
            t-model="state.password" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
            placeholder="Masukkan password"
          />
        </div>
        <div t-if="state.error" style="color: red; margin-bottom: 15px;">
          <t t-esc="state.error"/>
        </div>
        <button 
          type="submit" 
          style="width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Login
        </button>
      </form>
      <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">
        <strong>Demo credentials:</strong><br/>
        Username: admin<br/>
        Password: password
      </div>
    </div>
  `;

    setup() {
        this.state = useState({
            username: '',
            password: '',
            error: ''
        });
    }

    handleLogin() {
        // Simple validation (demo purposes)
        if (this.state.username === 'admin' && this.state.password === 'password') {
            // Set login status
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', this.state.username);

            // Redirect ke home setelah login
            // this.env.router.navigate('/');
            this.props.router.navigate('/');
        } else {
            this.state.error = 'Username atau password salah!';
        }
    }
}