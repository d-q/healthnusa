import { Component, xml, useState } from "@odoo/owl";

export class UserNew extends Component {
  static template = xml`
    <div>
      <div style="margin-bottom: 20px;">
        <button 
          t-on-click="goBack" 
          style="background: #95a5a6; color: white; padding: 8px 16px; border: none; border-radius: 3px; cursor: pointer;"
        >
          ← Kembali
        </button>
      </div>

      <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px;">
        <h2 style="margin-bottom: 30px;">Tambah User Baru</h2>
        
        <form t-on-submit.prevent="submitForm">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Nama Lengkap *
            </label>
            <input 
              type="text" 
              t-model="state.form.name"
              required="required"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Email *
            </label>
            <input 
              type="email" 
              t-model="state.form.email"
              required="required"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
              placeholder="Masukkan alamat email"
            />
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Password *
            </label>
            <input 
              type="password" 
              t-model="state.form.password"
              required="required"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
              placeholder="Masukkan password"
            />
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Konfirmasi Password *
            </label>
            <input 
              type="password" 
              t-model="state.form.confirmPassword"
              required="required"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
              placeholder="Konfirmasi password"
            />
            <div t-if="state.form.password and state.form.confirmPassword and state.form.password !== state.form.confirmPassword" 
                 style="color: #e74c3c; font-size: 12px; margin-top: 5px;">
              Password tidak cocok
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Role *
            </label>
            <select 
              t-model="state.form.role"
              required="required"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
            >
              <option value="">-- Pilih Role --</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div style="margin-bottom: 30px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Bio (Opsional)
            </label>
            <textarea 
              t-model="state.form.bio"
              rows="4"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; resize: vertical;"
              placeholder="Tulis bio singkat tentang user..."
            ></textarea>
          </div>

          <div style="display: flex; gap: 10px;">
            <button 
              type="submit"
              t-att-disabled="!isFormValid()"
              style="background: #27ae60; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; flex: 1;"
              t-att-style="!isFormValid() ? 'opacity: 0.6; cursor: not-allowed;' : ''"
            >
              Simpan User
            </button>
            
            <button 
              type="button"
              t-on-click="resetForm"
              style="background: #95a5a6; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;"
            >
              Reset
            </button>
          </div>
        </form>

        <div t-if="state.message" 
             t-att-style="state.messageType === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'"
             style="padding: 12px; border-radius: 5px; margin-top: 20px;">
          <t t-esc="state.message"/>
        </div>
      </div>
    </div>
  `;

  setup() {
    this.state = useState({
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        bio: ''
      },
      message: '',
      messageType: 'success'
    });
  }

  isFormValid() {
    const form = this.state.form;
    return form.name.trim() && 
           form.email.trim() && 
           form.password && 
           form.confirmPassword && 
           form.password === form.confirmPassword && 
           form.role;
  }

  async submitForm() {
    if (!this.isFormValid()) {
      this.showMessage('Mohon lengkapi semua field yang diperlukan', 'error');
      return;
    }

    try {
      // Simulasi API call
      await this.saveUser();
      this.showMessage('User berhasil dibuat! Mengalihkan...', 'success');
      
      // Redirect setelah 2 detik
      setTimeout(() => {
        this.props.router.navigate('/users');
      }, 2000);
    } catch (error) {
      this.showMessage('Terjadi kesalahan saat menyimpan user', 'error');
    }
  }

  async saveUser() {
    // Simulasi delay API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('User saved:', {
          name: this.state.form.name,
          email: this.state.form.email,
          role: this.state.form.role,
          bio: this.state.form.bio
        });
        resolve();
      }, 1000);
    });
  }

  showMessage(message, type = 'success') {
    this.state.message = message;
    this.state.messageType = type;
    
    // Clear message setelah 5 detik
    setTimeout(() => {
      this.state.message = '';
    }, 5000);
  }

  resetForm() {
    this.state.form = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      bio: ''
    };
    this.state.message = '';
  }

  goBack() {
    this.props.router.navigate('/users');
  }
}