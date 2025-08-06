import { Component, xml } from "@odoo/owl";

export class NotFound extends Component {
  static template = xml`
    <div style="text-align: center; padding: 50px;">
      <h1 style="color: #e74c3c; font-size: 4rem; margin-bottom: 20px;">404</h1>
      <h2 style="color: #34495e; margin-bottom: 20px;">Halaman Tidak Ditemukan</h2>
      <p style="color: #7f8c8d; margin-bottom: 30px;">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
      </p>
      <button 
        t-on-click="goHome" 
        style="background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;"
      >
        Kembali ke Beranda
      </button>
    </div>
  `;

  goHome() {
    // Akses router dari props
    this.props.router.navigate('/');
  }
}