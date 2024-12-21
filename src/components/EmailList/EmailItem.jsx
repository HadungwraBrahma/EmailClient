import Avatar from "../Avatar/Avatar";
import "../../styles/EmailList.css";
import { formatLocalDate, formatISODate } from "../../utils/formatDate";

const EmailItem = ({ email, isSelected, onClick }) => {
  return (
    <div
      className={`email-item 
        ${isSelected ? "selected" : "unselected"} 
        ${email.isRead ? "read" : "unread"}`}
      onClick={onClick}
    >
      <Avatar name={email.from.name} />
      <section className="email-info">
        <div className="from">
          <span className="email-info-texts">From:</span> {email.from.email}
        </div>
        <div className="subject">
          <span className="email-info-texts">Subject:</span> {email.subject}
        </div>

        <p className="description">{email.short_description}</p>

        <div className="date-time">
          <time dateTime={formatISODate(email.date)}>
            {formatLocalDate(email.date)}
          </time>
          {email.isFavorite && <span className="favorite">Favorite</span>}
        </div>
      </section>

      {!email.isRead && <div className="unread-indicator"></div>}
    </div>
  );
};

export default EmailItem;
