import { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = t.nameRequired;
    
    if (!formData.email.trim()) {
      tempErrors.email = t.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = t.emailInvalid;
    }
    
    if (!formData.subject.trim()) tempErrors.subject = t.subjectRequired;
    if (!formData.message.trim()) tempErrors.message = t.messageRequired;
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Fake API call / Logic
      console.log('Form submitted:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container card">
        <div className="contact-header">
          <h1>{t.contactTitle}</h1>
          <p>{t.contactSubtitle}</p>
        </div>

        {success && <div className="alert alert-success">{t.messageSent}</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">{t.fullName}</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">{t.subject}</label>
            <select 
              id="subject" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
              className={errors.subject ? 'input-error' : ''}
            >
              <option value="">-- {t.subject} --</option>
              <option value="general">{t.generalInquiry}</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">{t.message}</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange}
              placeholder={t.typeMessage}
              className={errors.message ? 'input-error' : ''}
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-primary w-100">{t.sendMessage}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
