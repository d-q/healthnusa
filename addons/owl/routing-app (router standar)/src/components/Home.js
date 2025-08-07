import { Component, xml } from "@odoo/owl";

export class Home extends Component {
  static template = xml`
    <div>
      <h2>Home Page</h2>
      <p>Selamat datang di halaman utama!</p>
      <p>Ini adalah contoh routing sederhana menggunakan Owl 2.</p>
    </div>
  `;
}