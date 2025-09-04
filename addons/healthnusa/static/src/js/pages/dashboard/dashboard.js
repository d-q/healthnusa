/** @odoo-module **/

import { Component } from "@odoo/owl";
import { useState } from "@odoo/owl";

export class Dashboard extends Component {
    static template = "healthnusa.Dashboard";

    setup() {
        this.state = useState({
            currentTime: this.getCurrentTime(),
            bedOccupancyRate: "82.5%",
            bedOccupancyDetail: "235/285 beds occupied",
            admissionsCount: "47",
            waitTime: "23 min",
            revenueAmount: "$89,400",
            weeklyTotal: "$543,200",
            currentMonth: "Jan 2025",
            calendarDays: this.generateCalendarDays(),
            recentActivities: [
                {
                    id: 1,
                    icon: "person_add",
                    iconColor: "text-blue-500",
                    bgColor: "bg-blue-100",
                    title: "New patient admitted",
                    description: "Room 304 - Emergency case",
                    time: "5 minutes ago"
                },
                {
                    id: 2,
                    icon: "check_circle",
                    iconColor: "text-green-500",
                    bgColor: "bg-green-100",
                    title: "Surgery completed",
                    description: "Dr. Smith - Appendectomy",
                    time: "12 minutes ago"
                }
            ]
        });

        this.updateTime();
        this.timeInterval = setInterval(() => this.updateTime(), 60000);
    }

    mounted() {
        // Load Chart.js if not available
        if (!window.Chart) {
            this.loadChartJS().then(() => {
                this.initializeCharts();
            });
        } else {
            this.initializeCharts();
        }
    }

    loadChartJS() {
        return new Promise((resolve) => {
            if (window.Chart) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
            script.onload = () => {
                console.log('Chart.js loaded');
                resolve();
            };
            script.onerror = () => {
                console.error('Failed to load Chart.js');
                this.createFallbackCharts();
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    generateCalendarDays() {
        const days = [];
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const firstDayWeekday = firstDayOfMonth.getDay();

        // Add days from previous month
        const prevMonth = new Date(currentYear, currentMonth - 1, 0);
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
            days.push({
                date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(prevMonth.getDate() - i).padStart(2, '0')}`,
                number: prevMonth.getDate() - i,
                class: "text-gray-400 hover:bg-gray-100"
            });
        }

        // Add days of current month
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            days.push({
                date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                number: day,
                class: isToday 
                    ? "bg-blue-500 text-white font-semibold" 
                    : "text-gray-800 hover:bg-blue-50"
            });
        }

        // Add days from next month to fill the grid
        const remainingCells = 42 - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push({
                date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                number: day,
                class: "text-gray-400 hover:bg-gray-100"
            });
        }

        return days;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    updateTime() {
        this.state.currentTime = this.getCurrentTime();
    }

    refreshDashboard() {
        // Simulate refresh
        this.updateTime();
        console.log("Dashboard refreshed");
    }

    previousMonth() {
        // Calendar navigation logic
        console.log("Previous month");
    }

    nextMonth() {
        // Calendar navigation logic
        console.log("Next month");
    }

    initializeCharts() {
        // Add small delay to ensure DOM is ready
        setTimeout(() => {
            this.createRevenueChart();
            this.createPatientFlowChart();
            this.createBedOccupancyChart();
        }, 100);
    }

    createRevenueChart() {
        const revenueCtx = document.getElementById('revenueChart');
        console.log('Revenue Chart:', revenueCtx, 'Chart.js:', !!window.Chart);
        
        if (revenueCtx && window.Chart) {
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [65000, 78000, 82000, 71000, 89400, 95000, 88000],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('Revenue chart canvas not found or Chart.js not loaded');
        }
    }

    createPatientFlowChart() {
        const patientFlowCtx = document.getElementById('patientFlowChart');
        console.log('Patient Flow Chart:', patientFlowCtx, 'Chart.js:', !!window.Chart);
        
        if (patientFlowCtx && window.Chart) {
            new Chart(patientFlowCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Admissions',
                            data: [45, 52, 38, 47, 55, 42, 35],
                            backgroundColor: '#3B82F6',
                            borderRadius: 4
                        },
                        {
                            label: 'Discharges',
                            data: [38, 45, 42, 39, 48, 38, 32],
                            backgroundColor: '#10B981',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        } else {
            console.warn('Patient flow chart canvas not found or Chart.js not loaded');
        }
    }

    createBedOccupancyChart() {
        const bedOccupancyCtx = document.getElementById('bedOccupancyChart');
        console.log('Bed Occupancy Chart:', bedOccupancyCtx, 'Chart.js:', !!window.Chart);
        
        if (bedOccupancyCtx && window.Chart) {
            new Chart(bedOccupancyCtx, {
                type: 'doughnut',
                data: {
                    labels: ['ICU', 'General', 'Emergency', 'Surgery', 'Pediatrics'],
                    datasets: [{
                        data: [85, 70, 90, 75, 65],
                        backgroundColor: [
                            '#EF4444',
                            '#3B82F6',
                            '#F59E0B',
                            '#8B5CF6',
                            '#10B981'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15,
                                font: {
                                    size: 11
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
        } else {
            console.warn('Bed occupancy chart canvas not found or Chart.js not loaded');
        }
    }

    createFallbackCharts() {
        // Revenue Chart Fallback
        const revenueChart = document.getElementById('revenueChart');
        if (revenueChart) {
            revenueChart.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="text-center">
                        <div class="text-4xl text-blue-500 mb-2">📈</div>
                        <p class="text-gray-600">Revenue: $89,400</p>
                        <p class="text-sm text-gray-500">Weekly Total: $543,200</p>
                    </div>
                </div>
            `;
        }

        // Patient Flow Chart Fallback
        const patientFlowChart = document.getElementById('patientFlowChart');
        if (patientFlowChart) {
            patientFlowChart.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="text-center">
                        <div class="text-4xl text-green-500 mb-2">📊</div>
                        <p class="text-gray-600">Admissions: 47</p>
                        <p class="text-sm text-gray-500">Discharges: 42</p>
                    </div>
                </div>
            `;
        }

        // Bed Occupancy Chart Fallback
        const bedOccupancyChart = document.getElementById('bedOccupancyChart');
        if (bedOccupancyChart) {
            bedOccupancyChart.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="text-center">
                        <div class="text-4xl text-purple-500 mb-2">🏥</div>
                        <p class="text-gray-600">Bed Occupancy</p>
                        <p class="text-sm text-gray-500">82.5% (235/285)</p>
                    </div>
                </div>
            `;
        }
    }

    willUnmount() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
    }
}