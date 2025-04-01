// Test script for appointment reporting
// Initialize EmailJS with your user ID
emailjs.init('YOUR_USER_ID');

// Function to generate HTML report
const generateReportHTML = (appointments) => {
  return `
    <h3>Relatório de Agendamentos</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #ddd; padding: 8px;">Data</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Hora</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Cliente</th>
        </tr>
      </thead>
      <tbody>
        ${appointments.map(appt => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${appt.day}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${appt.time}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${appt.userName}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p>Total de agendamentos: ${appointments.length}</p>
    <p>Clientes únicos: ${new Set(appointments.map(a => a.userId)).size}</p>
  `;
};

// Function to send email report
const sendAppointmentReport = async () => {
  try {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const htmlContent = generateReportHTML(appointments);

    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: 'gabealvarenga7@gmail.com',
        subject: 'Relatório de Agendamentos Atualizado',
        message: htmlContent
      }
    );
    console.log('Email report sent successfully');
  } catch (error) {
    console.error('Error sending email report:', error);
  }
};

// Watch for appointment changes and send email
const handleAppointmentChange = () => {
  try {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    console.log('Appointments updated:', appointments);
    sendAppointmentReport();
  } catch (error) {
    console.error('Error handling appointment change:', error);
  }
};

// Set up storage event listener
window.addEventListener('storage', (event) => {
  if (event.key === 'appointments') {
    handleAppointmentChange();
  }
});

// Test script
(async () => {
  try {
    // 1. Simulate admin login
    localStorage.setItem('loggedInUser', JSON.stringify({
      email: 'gabealvarenga7@gmail.com',
      name: 'Gabriel Admin'
    }));

    // 2. Initialize empty appointments if none exist
    if (!localStorage.getItem('appointments')) {
      localStorage.setItem('appointments', JSON.stringify([]));
    }

    // 3. Add test appointment
    const newAppt = {
      day: new Date().toISOString().split('T')[0],
      time: '14:00',
      userId: 'test@example.com',
      userName: 'Test User',
      timestamp: new Date().toISOString()
    };

    let appointments = JSON.parse(localStorage.getItem('appointments'));
    appointments.push(newAppt);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    console.log('Added test appointment');
    handleAppointmentChange();

    // 4. Remove test appointment
    appointments = appointments.filter(a => a.userId !== 'test@example.com');
    localStorage.setItem('appointments', JSON.stringify(appointments));
    console.log('Removed test appointment');
    handleAppointmentChange();

    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
})();
