/** @odoo-module **/

import { Component } from "@odoo/owl";
import { useState } from "@odoo/owl";

export class Dashboard extends Component {
    static template = "healthnusa.Dashboard";

    setup() {
        // Initialize selectedDate first
        const initialSelectedDate = new Date().toISOString().split('T')[0];
        
        this.state = useState({
            currentTime: this.getCurrentTime(),
            bedOccupancyRate: "82.5%",
            bedOccupancyDetail: "235/285 beds occupied",
            admissionsCount: "47",
            waitTime: "23 min",
            revenueAmount: "$89,400",
            weeklyTotal: "$543,200",
            currentMonth: "Jan 2025",
            selectedDate: initialSelectedDate,
            calendarDays: [],
            isDarkMode: false,
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

        // Generate calendar days after state is initialized
        this.state.calendarDays = this.generateCalendarDays();

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

        // Get selectedDate safely, fallback to today's date
        const selectedDate = this.state && this.state.selectedDate ? this.state.selectedDate : new Date().toISOString().split('T')[0];

        // Add days from previous month
        const prevMonth = new Date(currentYear, currentMonth - 1, 0);
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
            const date = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(prevMonth.getDate() - i).padStart(2, '0')}`;
            const isSelected = date === selectedDate;
            days.push({
                date: date,
                number: prevMonth.getDate() - i,
                class: isSelected ? "bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white font-semibold" : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
            });
        }

        // Add days of current month
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = date === selectedDate;
            
            let className = "cursor-pointer ";
            if (isSelected) {
                className += "bg-blue-500 text-white font-semibold";
            } else if (isToday) {
                className += "bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white font-semibold hover:bg-blue-200 dark:hover:bg-blue-500";
            } else {
                className += "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-700";
            }
            
            days.push({
                date: date,
                number: day,
                class: className
            });
        }

        // Add days from next month to fill the grid
        const remainingCells = 42 - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            const date = `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = date === selectedDate;
            days.push({
                date: date,
                number: day,
                class: isSelected ? "bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white font-semibold" : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
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

    selectDate(date) {
        this.state.selectedDate = date;
        this.state.calendarDays = this.generateCalendarDays();
        this.updateDashboardData(date);
        console.log("Date selected:", date);
    }

    toggleDarkMode() {
        this.state.isDarkMode = !this.state.isDarkMode;
        // Apply dark mode to document
        if (this.state.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    updateDashboardData(selectedDate) {
        const dateObj = new Date(selectedDate);
        const dayOfWeek = dateObj.getDay();
        
        // Simulate different data based on selected date
        const dailyData = {
            0: { // Sunday
                bedOccupancyRate: "78.2%",
                bedOccupancyDetail: "223/285 beds occupied",
                admissionsCount: "32",
                waitTime: "18 min",
                revenueAmount: "$67,800",
                activities: [
                    {
                        id: 1,
                        icon: "hotel",
                        iconColor: "text-purple-500",
                        bgColor: "bg-purple-100",
                        title: "Weekend shift change",
                        description: "Night staff taking over",
                        time: "6 hours ago"
                    }
                ]
            },
            1: { // Monday
                bedOccupancyRate: "85.3%",
                bedOccupancyDetail: "243/285 beds occupied",
                admissionsCount: "52",
                waitTime: "28 min",
                revenueAmount: "$94,200",
                activities: [
                    {
                        id: 1,
                        icon: "person_add",
                        iconColor: "text-blue-500",
                        bgColor: "bg-blue-100",
                        title: "Monday morning admissions",
                        description: "High patient influx",
                        time: "2 hours ago"
                    }
                ]
            },
            2: { // Tuesday
                bedOccupancyRate: "81.7%",
                bedOccupancyDetail: "233/285 beds occupied",
                admissionsCount: "43",
                waitTime: "22 min",
                revenueAmount: "$88,100",
                activities: [
                    {
                        id: 1,
                        icon: "medical_services",
                        iconColor: "text-green-500",
                        bgColor: "bg-green-100",
                        title: "Routine checkups scheduled",
                        description: "15 appointments today",
                        time: "3 hours ago"
                    }
                ]
            },
            3: { // Wednesday
                bedOccupancyRate: "83.9%",
                bedOccupancyDetail: "239/285 beds occupied",
                admissionsCount: "48",
                waitTime: "25 min",
                revenueAmount: "$91,700",
                activities: [
                    {
                        id: 1,
                        icon: "local_hospital",
                        iconColor: "text-red-500",
                        bgColor: "bg-red-100",
                        title: "Emergency cases peak",
                        description: "Mid-week emergency influx",
                        time: "1 hour ago"
                    }
                ]
            },
            4: { // Thursday
                bedOccupancyRate: "86.1%",
                bedOccupancyDetail: "245/285 beds occupied",
                admissionsCount: "55",
                waitTime: "31 min",
                revenueAmount: "$96,400",
                activities: [
                    {
                        id: 1,
                        icon: "assignment",
                        iconColor: "text-orange-500",
                        bgColor: "bg-orange-100",
                        title: "Surgery schedule full",
                        description: "12 surgeries planned",
                        time: "4 hours ago"
                    }
                ]
            },
            5: { // Friday
                bedOccupancyRate: "84.5%",
                bedOccupancyDetail: "241/285 beds occupied",
                admissionsCount: "49",
                waitTime: "26 min",
                revenueAmount: "$92,800",
                activities: [
                    {
                        id: 1,
                        icon: "event_available",
                        iconColor: "text-indigo-500",
                        bgColor: "bg-indigo-100",
                        title: "Weekend prep complete",
                        description: "Staff schedules finalized",
                        time: "5 hours ago"
                    }
                ]
            },
            6: { // Saturday
                bedOccupancyRate: "79.8%",
                bedOccupancyDetail: "227/285 beds occupied",
                admissionsCount: "38",
                waitTime: "20 min",
                revenueAmount: "$74,500",
                activities: [
                    {
                        id: 1,
                        icon: "weekend",
                        iconColor: "text-cyan-500",
                        bgColor: "bg-cyan-100",
                        title: "Weekend operations",
                        description: "Reduced staff schedule",
                        time: "7 hours ago"
                    }
                ]
            }
        };

        // Default to today's data if no specific data for the day
        const data = dailyData[dayOfWeek] || {
            bedOccupancyRate: "82.5%",
            bedOccupancyDetail: "235/285 beds occupied",
            admissionsCount: "47",
            waitTime: "23 min",
            revenueAmount: "$89,400",
            activities: [
                {
                    id: 1,
                    icon: "person_add",
                    iconColor: "text-blue-500",
                    bgColor: "bg-blue-100",
                    title: "New patient admitted",
                    description: "Room 304 - Emergency case",
                    time: "5 minutes ago"
                }
            ]
        };

        // Update state with new data
        this.state.bedOccupancyRate = data.bedOccupancyRate;
        this.state.bedOccupancyDetail = data.bedOccupancyDetail;
        this.state.admissionsCount = data.admissionsCount;
        this.state.waitTime = data.waitTime;
        this.state.revenueAmount = data.revenueAmount;
        this.state.recentActivities = data.activities;
        
        // Update weekly total based on selected date (simulate different weekly totals)
        const weeklyTotals = ["$520,100", "$543,200", "$567,800", "$521,900", "$589,300"];
        const weekIndex = Math.floor(dateObj.getDate() / 7) % weeklyTotals.length;
        this.state.weeklyTotal = weeklyTotals[weekIndex];
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