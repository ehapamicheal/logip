
// CHAT AREA FUNCTIONALITY
const chatInput = document.querySelector('.chat-input');
chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

// Scroll to bottom when new messages are added
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulate adding a new message (for testing)
function addMessage(author, text, time = 'now') {
    const chatMessages = document.getElementById('chatMessages');
    const messageHTML = `
      <div class="message_main_box">
        <div class="message_head">
          <div class="box">
            <div class="mage_box">
              <img src="assets/media/avatars/150-10.jpg" alt="${author}" class="message-avatar">
              <svg class="notification_dot" width="14" height="14" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5.24609" r="4.25" fill="#2EAF4A" stroke="white" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="message-header">
              <h3 class="message-author">${author}</h3>
              <p class="">Added a file to <span class="">7Heros Project</span></p>
            </div>
          </div>

          <span class="message-time">${time}</span>
        </div>

        <div class="message-content">
          <p class="message-text">${text}</p>
        </div>
        
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// Handle enter key to send message
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = this.value.trim();
        if (message) {
            addMessage('You', message);
            this.value = '';
            this.style.height = 'auto';
        }
    }
});

// Initialize scroll position
scrollToBottom();




// CHART GRAPH FUNCTIONALITY
const ctx = document.getElementById('myChart').getContext('2d');

  const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
  gradientBlue.addColorStop(0, 'rgba(73, 128, 249, 0.2)');
  gradientBlue.addColorStop(1, 'rgba(73, 128, 249, 0)');

  const gradientOrange = ctx.createLinearGradient(0, 0, 0, 300);
  gradientOrange.addColorStop(0, 'rgba(242, 158, 51, 0.2)');
  gradientOrange.addColorStop(1, 'rgba(242, 158, 51, 0)');

  const dateLabels = [
    '01 May 2023',
    '02 May 2023',
    '03 May 2023',
    '04 May 2023',
    '05 May 2023',
    '06 May 2023',
    '07 May 2023'
  ];

  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07'],
    datasets: [
      {
        label: 'This month',
        data: [7, 6, 7, 5, 9, 8, 9],
        borderColor: '#4980F9',
        backgroundColor: gradientBlue,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#4980F9'
      },
      {
        label: 'Last month',
        data: [9, 6, 6, 5, 6, 4, 5],
        borderColor: '#F29E33',
        backgroundColor: gradientOrange,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#F29E33'
      }
    ]
  };

  const dashedLinePlugin = {
    id: 'dashedLinePlugin',
    afterDatasetsDraw(chart) {
      const { ctx, tooltip, chartArea: { top, bottom } } = chart;
      if (tooltip._active && tooltip._active.length) {
        const activePoint = tooltip._active[0];
        const x = activePoint.element.x;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#0D1A30',
          titleColor: '#fff',
          bodyColor: '#fff',
          cornerRadius: 6,
          padding: 12,
          usePointStyle: true,
          bodyFont: {
            size: 14
          },
          callbacks: {
            title: function (context) {
              const index = context[0].dataIndex;
              return dateLabels[index];
            },
            labelPointStyle: (context) => {
              return {
                pointStyle: 'rectRounded',
                rotation: 0
              };
            },
            label: function (context) {
              return `${context.dataset.label}: ${context.formattedValue}h`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 12,
          ticks: {
            stepSize: 2,
            callback: (value) => `${value}h`,
            color: '#888'
          },
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          border: {
            display: false
          }
        }
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          hoverRadius: 6
        }
      }
    },
    plugins: [dashedLinePlugin]
  };

  new Chart(ctx, config);
