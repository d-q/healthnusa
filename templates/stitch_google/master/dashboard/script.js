let charts = {};
let calendarDate = new Date();
let selectedDate = new Date();

document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    initCharts();
    initCalendar();
    setInterval(updateTime, 60000);
});

function updateTime() {
    document.getElementById('currentTime').textContent = 
        new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
}

function initCalendar() {
    updateCalendarDisplay();
    generateCalendarDays();
    filterData();
}

function updateCalendarDisplay() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthYear = monthNames[calendarDate.getMonth()] + ' ' + calendarDate.getFullYear();
    document.getElementById('currentMonth').textContent = monthYear;
}

function generateCalendarDays() {
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date.getDate();
        
        if (date.getMonth() !== month) {
            dayElement.classList.add('other-month');
        }
        
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        if (date.toDateString() === selectedDate.toDateString()) {
            dayElement.classList.add('selected');
        }
        
        if (Math.random() > 0.7) {
            dayElement.classList.add('has-data');
        }
        
        dayElement.addEventListener('click', () => selectDate(date));
        calendarDays.appendChild(dayElement);
    }
}

function selectDate(date) {
    selectedDate = new Date(date);
    generateCalendarDays();
    filterData();
}

function previousMonth() {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    updateCalendarDisplay();
    generateCalendarDays();
}

function nextMonth() {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    updateCalendarDisplay();
    generateCalendarDays();
}

function initCharts() {
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    charts.revenue = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                data: [72000, 85000, 78000, 92000, 89000, 95000, 88000],
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }},
            scales: {
                x: { 
                    grid: { display: false },
                    border: { display: false }
                },
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    border: { display: false },
                    ticks: { callback: value => '$' + (value/1000) + 'K' }
                }
            }
        }
    });

    const flowCtx = document.getElementById('patientFlowChart').getContext('2d');
    charts.flow = new Chart(flowCtx, {
        type: 'bar',
        data: {
            labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
            datasets: [{
                label: 'Admissions',
                data: [2, 5, 8, 12, 15, 18, 14, 10],
                backgroundColor: '#4A90E2',
                borderRadius: 4,
                barThickness: 20
            }, {
                label: 'Discharges', 
                data: [1, 3, 6, 9, 11, 16, 12, 8],
                backgroundColor: '#10B981',
                borderRadius: 4,
                barThickness: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }},
            scales: {
                x: { 
                    grid: { display: false },
                    border: { display: false }
                },
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    border: { display: false }
                }
            }
        }
    });

    const bedCtx = document.getElementById('bedOccupancyChart').getContext('2d');
    charts.bed = new Chart(bedCtx, {
        type: 'doughnut',
        data: {
            labels: ['ICU', 'General', 'Emergency', 'Surgery', 'Pediatric'],
            datasets: [{
                data: [95, 78, 85, 60, 72],
                backgroundColor: ['#EF4444', '#4A90E2', '#F59E0B', '#10B981', '#8B5CF6'],
                borderWidth: 0,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

function filterData() {
    const baseData = getBaseData(selectedDate);
    
    document.getElementById('bedOccupancyRate').textContent = baseData.bedOccupancy + '%';
    document.getElementById('bedOccupancyDetail').textContent = 
        `${Math.floor((baseData.bedOccupancy / 100) * 285)}/285 beds occupied`;
    document.getElementById('admissionsCount').textContent = baseData.admissions;
    document.getElementById('waitTime').textContent = baseData.waitTime + ' min';
    document.getElementById('revenueAmount').textContent = '$' + baseData.revenue.toLocaleString();
    document.getElementById('weeklyTotal').textContent = '$' + (baseData.revenue * 7).toLocaleString();
    
    charts.revenue.data.datasets[0].data = baseData.revenueChart;
    charts.flow.data.datasets[0].data = baseData.admissionChart;
    charts.flow.data.datasets[1].data = baseData.dischargeChart;
    charts.bed.data.datasets[0].data = baseData.bedChart;
    
    Object.values(charts).forEach(chart => chart.update());
}

function getBaseData(date) {
    const dayOffset = date.getDay();
    const dateOffset = date.getDate();
    const variance = Math.sin(dayOffset + dateOffset) * 20;
    
    return {
        bedOccupancy: Math.max(60, Math.min(95, (82.5 + variance))).toFixed(1),
        admissions: Math.max(20, Math.floor(47 + variance)),
        waitTime: Math.max(10, Math.floor(23 + variance/2)),
        revenue: Math.max(60000, Math.floor(89400 + variance * 1000)),
        revenueChart: Array.from({length: 7}, (_, i) => 
            Math.max(60000, Math.floor(80000 + Math.sin(i + dayOffset + dateOffset) * 15000))
        ),
        admissionChart: Array.from({length: 8}, (_, i) => 
            Math.max(1, Math.floor(8 + Math.sin(i + dayOffset + dateOffset) * 6))
        ),
        dischargeChart: Array.from({length: 8}, (_, i) => 
            Math.max(1, Math.floor(6 + Math.sin(i + dayOffset + dateOffset) * 5))
        ),
        bedChart: [95, 78, 85, 60, 72].map(val => 
            Math.max(50, Math.min(98, Math.floor(val + Math.sin(dayOffset + dateOffset) * 10)))
        )
    };
}

function refreshDashboard() {
    filterData();
    updateTime();
}