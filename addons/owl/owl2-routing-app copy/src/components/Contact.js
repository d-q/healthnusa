import { Component, xml } from "@odoo/owl";

export class Contact extends Component {
  static template = xml`
    <div>
      <h2>Contact Page</h2>
      <p>Ini adalah halaman Contact.</p>
      <p>Hubungi kami di: contact@example.com</p>
    </div>
  `;
}