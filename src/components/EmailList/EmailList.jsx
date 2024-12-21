import EmailItem from './EmailItem';
import '../../styles/EmailList.css';

const EmailList = ({ 
  emails, 
  selectedEmail, 
  isLoading, 
  onEmailClick 
}) => {
  if (isLoading) {
    return <div className="loading">Loading emails...</div>;
  }

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          isSelected={selectedEmail && email.id === selectedEmail.id}
          onClick={() => onEmailClick(email)}
        />
      ))}
    </div>
  );
};

export default EmailList;