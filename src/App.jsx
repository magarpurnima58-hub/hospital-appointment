import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointment, updateStatus, deleteAppointment } from './store/appointmentsSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const doctors = useSelector(state => state.doctors)
  const appointments = useSelector(state => state.appointments)
  
  const [formData, setFormData] = useState({
    patientName: '',
    doctorId: '',
    appointmentDate: '',
    reason: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddAppointment = (e) => {
    e.preventDefault()
    if (formData.patientName && formData.doctorId && formData.appointmentDate && formData.reason) {
      dispatch(addAppointment({
        patientName: formData.patientName,
        doctorId: parseInt(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        reason: formData.reason
      }))
      setFormData({ patientName: '', doctorId: '', appointmentDate: '', reason: '' })
    }
  }

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateStatus({ id, status: newStatus }))
  }

  const handleDeleteAppointment = (id) => {
    dispatch(deleteAppointment(id))
  }

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId)
    return doctor ? doctor.name : 'Unknown'
  }

  return (
    <div className="appointment-container">
      <h1>Hospital Appointment Management</h1>
      
      <section className="form-section">
        <h2>Schedule New Appointment</h2>
        <form onSubmit={handleAddAppointment}>
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleInputChange}
            required
          />
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.department}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason for visit"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Schedule Appointment</button>
        </form>
      </section>

      <section className="appointments-section">
        <h2>Scheduled Appointments ({appointments.length})</h2>
        {appointments.length === 0 ? (
          <p>No appointments scheduled yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{getDoctorName(appointment.doctorId)}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleUpdateStatus(appointment.id, e.target.value)}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default App
