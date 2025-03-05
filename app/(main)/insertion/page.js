'use client';
import { useState } from 'react';

export default function DataEntry() {
  // Get today's date in yyyy-mm-dd format for validation
  const today = new Date().toISOString().split('T')[0];

  // Create state variables for each form field
  const [victim, setVictim] = useState({
    birthCertificateNumber: '',
    name: '',
    gender: '',
    medicalID: '',
    status: '',
    eventID: '',
    familyID: '',
    ngoID: '', // Added ngoID
  });

  const [medical, setMedical] = useState({
    medicalID: '',
    dateOfBirth: '',
    dateOfDeath: '',
    medicalCondition: '',
    bloodGroup: '',
    hospitalID: '', // Added hospitalID
  });

  const [familyInfo, setFamilyInfo] = useState({
    headName: '',
    contact: '',
    address: '',
    subsidyID: '', // Added subsidyID
  });

  const [event, setEvent] = useState({
    date: '',
    description: '',
    location: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation logic
    if (!victim.birthCertificateNumber) newErrors.birthCertificateNumber = 'This field is required';
    if (!victim.name) newErrors.name = 'This field is required';
    if (!victim.medicalID) newErrors.medicalID = 'This field is required';
    if (!victim.eventID) newErrors.eventID = 'This field is required';
    if (!victim.familyID) newErrors.familyID = 'This field is required';
    if (!medical.medicalID) newErrors.medicalID = 'This field is required';
    if (!medical.hospitalID) newErrors.hospitalID = 'This field is required';
    if (!familyInfo.headName) newErrors.headName = 'This field is required';
    if (!familyInfo.contact) newErrors.contact = 'This field is required';
    if (!familyInfo.address) newErrors.address = 'This field is required';
    if (!event.date) newErrors.date = 'This field is required';
    if (!event.description) newErrors.description = 'This field is required';
    if (!event.location) newErrors.location = 'This field is required';

    // Date validation for dateOfBirth and dateOfDeath
    if (medical.dateOfBirth && medical.dateOfBirth > today) {
      newErrors.dateOfBirth = 'Date of Birth cannot be a future date';
    }

    if (medical.dateOfDeath && medical.dateOfDeath > today) {
      newErrors.dateOfDeath = 'Date of Death cannot be a future date';
    }

    // Adding errors to state
    setErrors(newErrors);

    // If there are errors, don't submit the form
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If no errors, proceed with form submission
    console.log('Victim:', victim);
    console.log('Medical:', medical);
    console.log('Family Info:', familyInfo);
    console.log('Event:', event);
  };

  const getInputClassName = (field) => {
    return errors[field] ? 'block w-full p-2 mb-2 border-2 border-red-500 rounded-md' : 'block w-full p-2 mb-2 border rounded-md';
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Data Entry Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Victim Information */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Victim Information</h2>
          <input
            type="text"
            name="birthCertificateNumber"
            value={victim.birthCertificateNumber}
            onChange={(e) => handleChange(e, setVictim)}
            placeholder="Birth Certificate Number"
            className={getInputClassName('birthCertificateNumber')}
          />
          <input
            type="text"
            name="name"
            value={victim.name}
            onChange={(e) => handleChange(e, setVictim)}
            placeholder="Name"
            className={getInputClassName('name')}
          />
          <select
            name="gender"
            value={victim.gender}
            onChange={(e) => handleChange(e, setVictim)}
            className={getInputClassName('gender')}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="medicalID"
            value={victim.medicalID}
            onChange={(e) => handleChange(e, setVictim)}
            placeholder="Medical ID"
            className={getInputClassName('medicalID')}
          />
          
          {/* Status Dropdown */}
          <select
            name="status"
            value={victim.status}
            onChange={(e) => handleChange(e, setVictim)}
            className={getInputClassName('status')}
          >
            <option value="">Select Status</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>

          <input
            type="number"
            name="eventID"
            value={victim.eventID}
            onChange={(e) => handleChange(e, setVictim)}
            placeholder="Event ID"
            className={getInputClassName('eventID')}
          />
          <input
            type="number"
            name="familyID"
            value={victim.familyID}
            onChange={(e) => handleChange(e, setVictim)}
            placeholder="Family ID"
            className={getInputClassName('familyID')}
          />
        </div>

        {/* Medical Information */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Medical Information</h2>
          <input
            type="text"
            name="medicalID"
            value={medical.medicalID}
            onChange={(e) => handleChange(e, setMedical)}
            placeholder="Medical ID"
            className={getInputClassName('medicalID')}
          />
          <label htmlFor="dateOfBirth" className="block text-sm font-semibold mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={medical.dateOfBirth}
            onChange={(e) => handleChange(e, setMedical)}
            id="dateOfBirth"
            max={today} // Max date set to today's date
            className={getInputClassName('dateOfBirth')}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          <label htmlFor="dateOfDeath" className="block text-sm font-semibold mb-1">Date of Death</label>
          <input
            type="date"
            name="dateOfDeath"
            value={medical.dateOfDeath}
            onChange={(e) => handleChange(e, setMedical)}
            id="dateOfDeath"
            max={today} // Max date set to today's date
            className={getInputClassName('dateOfDeath')}
          />
          {errors.dateOfDeath && <p className="text-red-500 text-sm">{errors.dateOfDeath}</p>}
          <input
            type="text"
            name="medicalCondition"
            value={medical.medicalCondition}
            onChange={(e) => handleChange(e, setMedical)}
            placeholder="Medical Condition"
            className={getInputClassName('medicalCondition')}
          />
          <select
            name="bloodGroup"
            value={medical.bloodGroup}
            onChange={(e) => handleChange(e, setMedical)}
            className={getInputClassName('bloodGroup')}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input
            type="text"
            name="hospitalID"
            value={medical.hospitalID}
            onChange={(e) => handleChange(e, setMedical)}
            placeholder="Hospital ID"
            className={getInputClassName('hospitalID')}
          />
        </div>

        {/* Family Information */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Family Information</h2>
          <input
            type="text"
            name="headName"
            value={familyInfo.headName}
            onChange={(e) => handleChange(e, setFamilyInfo)}
            placeholder="Family Head Name"
            className={getInputClassName('headName')}
          />
          <input
            type="text"
            name="contact"
            value={familyInfo.contact}
            onChange={(e) => handleChange(e, setFamilyInfo)}
            placeholder="Contact Number"
            className={getInputClassName('contact')}
          />
          <input
            type="text"
            name="address"
            value={familyInfo.address}
            onChange={(e) => handleChange(e, setFamilyInfo)}
            placeholder="Address"
            className={getInputClassName('address')}
          />
          <input
            type="text"
            name="subsidyID"
            value={familyInfo.subsidyID}
            onChange={(e) => handleChange(e, setFamilyInfo)}
            placeholder="Subsidy ID"
            className={getInputClassName('subsidyID')}
          />
        </div>

        {/* Event Information */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Event Information</h2>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={(e) => handleChange(e, setEvent)}
            placeholder="Event Date"
            className={getInputClassName('date')}
          />
          <input
            type="text"
            name="description"
            value={event.description}
            onChange={(e) => handleChange(e, setEvent)}
            placeholder="Event Description"
            className={getInputClassName('description')}
          />
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={(e) => handleChange(e, setEvent)}
            placeholder="Event Location"
            className={getInputClassName('location')}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
