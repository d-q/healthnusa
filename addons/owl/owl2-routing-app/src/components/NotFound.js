import { Component, xml } from "@odoo/owl";

export class NotFound extends Component {
    static template = xml`
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Halaman yang Anda cari tidak ditemukan.</p>
      <p>Silakan kembali ke halaman utama atau gunakan navigasi di atas.</p>
    </div>
  `;
}