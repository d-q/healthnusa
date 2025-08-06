import { Component, xml, useState } from "@odoo/owl";

export class UserDetail extends Component {
  static template = xml`
    <div>
      <div style="margin-bottom: 20px;">
        <button 
          t-on-click="goBack" 
          style="background: #95a5a6; color: white; padding: 8px 16px; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;"
        >
          ← Kembali
        </button>
      </div>

      <div t-if="state.user" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h2 style="margin: 0;">Detail User #<t t-esc="state.user.id"/></h2>
          <button 
            t-on-click="editUser" 
            style="background: #f39c12; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;"
          >
            Edit User
          </button>
        </div>

        <div style="display: grid; gap: 20px;">
          <div style="display: flex; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <strong style="width: 100px; color: #34495e;">ID:</strong>
            <span><t t-esc="state.user.id"/></span>
          </div>
          
          <div style="display: flex; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <strong style="width: 100px; color: #34495e;">Nama:</strong>
            <span><t t-esc="state.user.name"/></span>
          </div>
          
          <div style="display: flex; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <strong style="width: 100px; color: #34495e;">Email:</strong>
            <span><t t-esc="state.user.email"/></span>
          </div>
          
          <div style="display: flex; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <strong style="width: 100px; color: #34495e;">Role:</strong>
            <span 
              t-att-style="getRoleBadgeStyle(state.user.role)"
              style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;"
            >
              <t t-esc="state.user.role"/>
            </span>
          </div>
          
          <div style="display: flex; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <strong style="width: 100px; color: #34495e;">Bergabung:</strong>
            <span><t t-esc="state.user.joinDate"/></span>
          </div>
          
          <div style="display: flex; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <strong style="width: 100px; color: #34495e;">Status:</strong>
            <span 
              t-att-style="getStatusStyle(state.user.status)"
              style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;"
            >
              <t t-esc="state.user.status"/>
            </span>
          </div>
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
      user: null
    });
    
    // Simulasi data users (dalam aplikasi nyata, ini akan diambil dari API/database)
    this.users = [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john@example.com", 
        role: "Admin",
        joinDate: "15 Januari 2023",
        status: "Active"
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@example.com", 
        role: "User",
        joinDate: "22 Februari 2023",
        status: "Active"
      },
      { 
        id: 3, 
        name: "Bob Johnson", 
        email: "bob@example.com", 
        role: "Moderator",
        joinDate: "5 Maret 2023",
        status: "Inactive"
      },
      { 
        id: 4, 
        name: "Alice Brown", 
        email: "alice@example.com", 
        role: "User",
        joinDate: "12 April 2023",
        status: "Active"
      },
    ];
    
    this.loadUser();
  }

  loadUser() {
    const userId = parseInt(this.props.params.id);
    const user = this.users.find(u => u.id === userId);
    this.state.user = user || null;
  }

  getRoleBadgeStyle(role) {
    const colors = {
      'Admin': 'background: #e74c3c; color: white;',
      'Moderator': 'background: #f39c12; color: white;',
      'User': 'background: #27ae60; color: white;'
    };
    return colors[role] || 'background: #95a5a6; color: white;';
  }

  getStatusStyle(status) {
    const colors = {
      'Active': 'background: #27ae60; color: white;',
      'Inactive': 'background: #e74c3c; color: white;'
    };
    return colors[status] || 'background: #95a5a6; color: white;';
  }

  editUser() {
    this.props.router.navigate(`/user/${this.state.user.id}/edit`);
  }

  goBack() {
    this.props.router.navigate('/users');
  }
}