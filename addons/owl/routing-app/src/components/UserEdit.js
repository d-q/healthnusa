import { Component, xml, useState } from "@odoo/owl";

export class UserEdit extends Component {
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

      <div t-if="state.user" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px;">
        <h2 style="margin-bottom: 30px;">Edit User #<t t-esc="state.user.id"/></h2>
        
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
            />
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
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #34495e;">
              Status *
            </label>
            <select 
              t-model="state.form.status"
              required="required"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              placeholder="Bio user..."
            ></textarea>
          </div>

          <div style="display: flex; gap: 10px;">
            <button 
              type="submit"
              style="background: #f39c12; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; flex: 1;"
            >
              Update User
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

      <div t-if="!state.user" style="text-align: center; padding: 50px;">
        <h2 style="color: #e74c3c;">User Tidak Ditemukan</h2>
        <p style="color: #7f8c8d;">User dengan ID tersebut tidak dapat ditemukan.</p>
        <button 
          t-on-click="goBack" 
          style="background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer;"
        >
          Kembali ke Daftar User
        </button>
      </div>
    </div>
  `;

  setup() {
    this.state = useState({
      user: null,
      form: {
        name: '',
        email: '',
        role: '',
        status: '',
        bio: ''
      },
      message: '',
      messageType: 'success'
    });
    
    // Simulasi data users
    this.users = [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john@example.com", 
        role: "Admin",
        status: "Active",
        bio: "System administrator with 5+ years experience"
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@example.com", 
        role: "User",
        status: "Active",
        bio: "Marketing specialist"
      },
      { 
        id: 3, 
        name: "Bob Johnson", 
        email: "bob@example.com", 
        role: "Moderator",
        status: "Inactive",
        bio: "Content moderator"
      },
    ];
    
    this.loadUser();
  }

  loadUser() {
    const userId = parseInt(this.props.params.id);
    const user = this.users.find(u => u.id === userId);
    
    if (user) {
      this.state.user = user;
      this.state.form = {
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        bio: user.bio || ''
      };
    }
  }

  async submitForm() {
    try {
      // Simulasi API call
      await this.updateUser();
      this.showMessage('User berhasil diupdate! Mengalihkan...', 'success');
      
      // Redirect setelah 2 detik
      setTimeout(() => {
        this.props.router.navigate(`/user/${this.state.user.id}`);
      }, 2000);
    } catch (error) {
      this.showMessage('Terjadi kesalahan saat mengupdate user', 'error');
    }
  }

  async updateUser() {
    // Simulasi delay API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('User updated:', {
          id: this.state.user.id,
          ...this.state.form
        });
        resolve();
      }, 1000);
    });
  }

  showMessage(message, type = 'success') {
    this.state.message = message;
    this.state.messageType = type;
    
    setTimeout(() => {
      this.state.message = '';
    }, 5000);
  }

  resetForm() {
    if (this.state.user) {
      this.state.form = {
        name: this.state.user.name,
        email: this.state.user.email,
        role: this.state.user.role,
        status: this.state.user.status,
        bio: this.state.user.bio || ''
      };
    }
    this.state.message = '';
  }

  goBack() {
    this.props.router.navigate(`/user/${this.state.user?.id || ''}`);
  }
}