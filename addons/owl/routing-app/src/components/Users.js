import { Component, xml, useState } from "@odoo/owl";

export class Users extends Component {
  static template = xml`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2>Data Users</h2>
        <button 
          t-on-click="createNewUser" 
          style="background: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;"
        >
          + Tambah User Baru
        </button>
      </div>
      
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: #34495e; color: white;">
              <th style="padding: 15px; text-align: left; border-bottom: 1px solid #ddd;">ID</th>
              <th style="padding: 15px; text-align: left; border-bottom: 1px solid #ddd;">Nama</th>
              <th style="padding: 15px; text-align: left; border-bottom: 1px solid #ddd;">Email</th>
              <th style="padding: 15px; text-align: left; border-bottom: 1px solid #ddd;">Role</th>
              <th style="padding: 15px; text-align: center; border-bottom: 1px solid #ddd;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr t-foreach="state.users" t-as="user" t-key="user.id" style="border-bottom: 1px solid #eee;">
              <td style="padding: 15px;">#<t t-esc="user.id"/></td>
              <td style="padding: 15px;"><t t-esc="user.name"/></td>
              <td style="padding: 15px;"><t t-esc="user.email"/></td>
              <td style="padding: 15px;">
                <span 
                  t-att-style="getRoleBadgeStyle(user.role)"
                  style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;"
                >
                  <t t-esc="user.role"/>
                </span>
              </td>
              <td style="padding: 15px; text-align: center;">
                <button 
                  t-on-click="() => this.viewUser(user.id)"
                  style="background: #3498db; color: white; padding: 5px 12px; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 12px;"
                >
                  Detail
                </button>
                <button 
                  t-on-click="() => this.editUser(user.id)"
                  style="background: #f39c12; color: white; padding: 5px 12px; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 12px;"
                >
                  Edit
                </button>
                <button 
                  t-on-click="() => this.deleteUser(user.id)"
                  style="background: #e74c3c; color: white; padding: 5px 12px; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div t-if="!state.users.length" style="text-align: center; padding: 50px; color: #7f8c8d;">
        <p>Tidak ada data user.</p>
      </div>
    </div>
  `;

  setup() {
    this.state = useState({
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
      ]
    });
  }

  getRoleBadgeStyle(role) {
    const colors = {
      'Admin': 'background: #e74c3c; color: white;',
      'Moderator': 'background: #f39c12; color: white;',
      'User': 'background: #27ae60; color: white;'
    };
    return colors[role] || 'background: #95a5a6; color: white;';
  }

  createNewUser() {
    this.props.router.navigate('/user/new');
  }

  viewUser(id) {
    this.props.router.navigate(`/user/${id}`);
  }

  editUser(id) {
    this.props.router.navigate(`/user/${id}/edit`);
  }

  deleteUser(id) {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      this.state.users = this.state.users.filter(user => user.id !== id);
    }
  }
}