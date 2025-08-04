import { Component, xml } from "@odoo/owl";

export class Dashboard extends Component {
    static template = xml`
        <div class="dashboard-container w-full max-w-4xl mx-auto mt-16 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10">
            <h1 class="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-blue-100 rounded-xl p-6 flex flex-col items-center">
                    <span class="text-2xl font-semibold text-blue-700">42</span>
                    <span class="text-gray-600 mt-2">Tasks</span>
                </div>
                <div class="bg-green-100 rounded-xl p-6 flex flex-col items-center">
                    <span class="text-2xl font-semibold text-green-700">17</span>
                    <span class="text-gray-600 mt-2">Projects</span>
                </div>
                <div class="bg-yellow-100 rounded-xl p-6 flex flex-col items-center">
                    <span class="text-2xl font-semibold text-yellow-700">5</span>
                    <span class="text-gray-600 mt-2">Notifications</span>
                </div>
            </div>
        </div>
    `;
}
