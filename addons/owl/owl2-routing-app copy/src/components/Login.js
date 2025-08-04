import { Component, xml, useState } from "@odoo/owl";
import { AuthService } from "../services/auth.js";

export class Login extends Component {
  static template = xml`
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2>Login to Odoo</h2>
      <form t-on-submit.prevent="handleLogin">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Username:</label>
          <input 
            type="text" 
            t-model="state.username" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
            placeholder="Masukkan username"
            t-att-disabled="state.isLoading"
            required="true"
          />
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Password:</label>
          <input 
            type="password" 
            t-model="state.password" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
            placeholder="Masukkan password"
            t-att-disabled="state.isLoading"
            required="true"
          />
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Database:</label>
          <input 
            type="text" 
            t-model="state.database" 
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
            placeholder="Database name"
            t-att-disabled="state.isLoading"
          />
          <small style="color: #666;">Default: nusahealth_1</small>
        </div>
        <div t-if="state.error" style="color: red; margin-bottom: 15px; padding: 10px; background: #ffeaea; border-radius: 4px;">
          <t t-esc="state.error"/>
        </div>
        <div t-if="state.success" style="color: green; margin-bottom: 15px; padding: 10px; background: #eafaf1; border-radius: 4px;">
          Login berhasil! Mengalihkan...
        </div>
        <button 
          type="submit" 
          style="width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
          t-att-disabled="state.isLoading"
        >
          <span t-if="state.isLoading">Logging in...</span>
          <span t-else="">Login</span>
        </button>
      </form>
      <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">
        <strong>Odoo Server:</strong> http://localhost:8069<br/>
        <strong>Note:</strong> Pastikan Odoo server sudah berjalan dan CORS dikonfigurasi untuk development.
      </div>
    </div>
  `;

  setup() {
    this.state = useState({
      username: 'admin', // Default untuk testing
      password: '',
      database: 'nusahealth_1', // Default database
      error: '',
      success: false,
      isLoading: false
    });
  }

  async handleLogin() {
    this.state.isLoading = true;
    this.state.error = '';
    this.state.success = false;

    try {
      // Update database name jika diisi
      if (this.state.database) {
        AuthService.DB_NAME = this.state.database;
      }

      const result = await AuthService.login(this.state.username, this.state.password);
      
      if (result.success) {
        this.state.success = true;
        this.state.error = '';
        
        // Redirect ke home setelah delay singkat
        setTimeout(() => {
          this.props.router.navigate('/');
        }, 1000);
      } else {
        this.state.error = result.error;
      }
    } catch (error) {
      this.state.error = 'Network error: ' + error.message;
    } finally {
      this.state.isLoading = false;
    }
  }
}