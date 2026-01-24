// ===================================
// Admin Dashboard JavaScript
// ===================================

// Mock Data
const mockData = {
  volunteers: [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'Team Leader', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', role: 'Volunteer', status: 'active', joined: '2024-02-20' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@email.com', role: 'Coordinator', status: 'active', joined: '2023-11-08' },
    { id: 4, name: 'David Kumar', email: 'david.k@email.com', role: 'Volunteer', status: 'pending', joined: '2024-03-05' },
    { id: 5, name: 'Jessica Lee', email: 'jessica.l@email.com', role: 'Volunteer', status: 'inactive', joined: '2023-08-12' },
    { id: 6, name: 'Robert Taylor', email: 'robert.t@email.com', role: 'Team Leader', status: 'active', joined: '2024-01-28' },
  ],
  
  donations: [
    { id: 1, donor: 'Anonymous', amount: 5000, purpose: 'Education Fund', date: '2024-03-15', status: 'completed' },
    { id: 2, donor: 'Tech Corp Inc.', amount: 15000, purpose: 'Clean Water Project', date: '2024-03-14', status: 'completed' },
    { id: 3, donor: 'John Smith', amount: 250, purpose: 'General Fund', date: '2024-03-14', status: 'pending' },
    { id: 4, donor: 'Maria Garcia', amount: 1000, purpose: 'Healthcare Initiative', date: '2024-03-13', status: 'completed' },
    { id: 5, donor: 'David Wilson', amount: 500, purpose: 'Food Relief', date: '2024-03-12', status: 'completed' },
    { id: 6, donor: 'Lisa Anderson', amount: 750, purpose: 'Education Fund', date: '2024-03-11', status: 'completed' },
  ],
  
  events: [
    { id: 1, name: 'Community Cleanup Drive', date: '2024-04-10', location: 'Central Park', volunteers: 45, status: 'upcoming' },
    { id: 2, name: 'Food Distribution', date: '2024-03-25', location: 'Downtown Center', volunteers: 28, status: 'active' },
    { id: 3, name: 'Health Camp', date: '2024-04-05', location: 'Medical Center', volunteers: 35, status: 'upcoming' },
    { id: 4, name: 'Education Workshop', date: '2024-03-20', location: 'Community Hall', volunteers: 22, status: 'completed' },
    { id: 5, name: 'Tree Plantation', date: '2024-04-15', location: 'Green Valley', volunteers: 50, status: 'upcoming' },
  ],
  
  recentActivities: [
    { activity: 'New volunteer registered', user: 'Sarah Johnson', date: '2 hours ago', status: 'active' },
    { activity: 'Donation received', user: 'Tech Corp Inc.', date: '5 hours ago', status: 'active' },
    { activity: 'Event created', user: 'Admin', date: '1 day ago', status: 'pending' },
    { activity: 'Volunteer approved', user: 'Michael Chen', date: '2 days ago', status: 'active' },
  ]
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderDashboard();
  renderVolunteers();
  renderDonations();
  renderEvents();
  initChart();
});

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const pageTitle = document.getElementById('page-title');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Hide all sections
      sections.forEach(s => s.classList.remove('active'));
      
      // Show selected section
      const sectionId = link.getAttribute('data-section');
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
        
        // Update page title
        const sectionTitle = link.querySelector('span').textContent;
        pageTitle.textContent = sectionTitle;
      }
    });
  });
}

// Render Dashboard
function renderDashboard() {
  renderRecentActivities();
}

function renderRecentActivities() {
  const tbody = document.getElementById('recent-activities');
  tbody.innerHTML = mockData.recentActivities.map(activity => `
    <tr>
      <td>${activity.activity}</td>
      <td>${activity.user}</td>
      <td>${activity.date}</td>
      <td><span class="status-badge ${activity.status}">${activity.status}</span></td>
    </tr>
  `).join('');
}

// Render Volunteers
function renderVolunteers() {
  const tbody = document.getElementById('volunteers-table');
  tbody.innerHTML = mockData.volunteers.map(volunteer => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #ec4899); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">
            ${volunteer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span>${volunteer.name}</span>
        </div>
      </td>
      <td>${volunteer.email}</td>
      <td>${volunteer.role}</td>
      <td><span class="status-badge ${volunteer.status}">${volunteer.status}</span></td>
      <td>${new Date(volunteer.joined).toLocaleDateString()}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn" onclick="editVolunteer(${volunteer.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" onclick="deleteVolunteer(${volunteer.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
  
  // Add volunteer button
  const addBtn = document.getElementById('add-volunteer-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      alert('Add Volunteer functionality - This would open a modal/form in a full implementation');
    });
  }
}

// Render Donations
function renderDonations() {
  const tbody = document.getElementById('donations-table');
  tbody.innerHTML = mockData.donations.map(donation => `
    <tr>
      <td>${donation.donor}</td>
      <td style="font-weight: 600; color: #10b981;">$${donation.amount.toLocaleString()}</td>
      <td>${donation.purpose}</td>
      <td>${new Date(donation.date).toLocaleDateString()}</td>
      <td><span class="status-badge ${donation.status === 'completed' ? 'active' : 'pending'}">${donation.status}</span></td>
    </tr>
  `).join('');
}

// Render Events
function renderEvents() {
  const tbody = document.getElementById('events-table');
  tbody.innerHTML = mockData.events.map(event => `
    <tr>
      <td style="font-weight: 600;">${event.name}</td>
      <td>${new Date(event.date).toLocaleDateString()}</td>
      <td>${event.location}</td>
      <td>
        <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">
          ${event.volunteers} volunteers
        </span>
      </td>
      <td><span class="status-badge ${event.status === 'active' ? 'active' : event.status === 'upcoming' ? 'pending' : 'inactive'}">${event.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn" onclick="editEvent(${event.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" onclick="deleteEvent(${event.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
  
  // Add event button
  const addBtn = document.getElementById('add-event-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      alert('Create Event functionality - This would open a modal/form in a full implementation');
    });
  }
}

// Chart.js - Impact Overview
function initChart() {
  const ctx = document.getElementById('impactChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Volunteers',
          data: [120, 185, 240, 310, 395, 485, 610, 745, 890, 1020, 1150, 1247],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Donations ($1000s)',
          data: [12, 18, 24, 31, 38, 45, 52, 58, 64, 70, 76, 82],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Events',
          data: [5, 8, 12, 15, 18, 22, 26, 30, 34, 38, 40, 42],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#334155',
          },
          ticks: {
            color: '#94a3b8',
            font: {
              family: 'Inter'
            }
          }
        },
        y: {
          grid: {
            color: '#334155',
          },
          ticks: {
            color: '#94a3b8',
            font: {
              family: 'Inter'
            }
          }
        }
      }
    }
  });
}

// Action Functions (Mock)
function editVolunteer(id) {
  alert(`Edit Volunteer ID: ${id}\nThis would open an edit form in a full implementation`);
}

function deleteVolunteer(id) {
  if (confirm('Are you sure you want to delete this volunteer?')) {
    alert(`Volunteer ID ${id} deleted (mock)`);
  }
}

function editEvent(id) {
  alert(`Edit Event ID: ${id}\nThis would open an edit form in a full implementation`);
}

function deleteEvent(id) {
  if (confirm('Are you sure you want to delete this event?')) {
    alert(`Event ID ${id} deleted (mock)`);
  }
}
