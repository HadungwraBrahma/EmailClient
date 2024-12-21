import Avatar from "../Avatar/Avatar";
import "../../styles/EmailBody.css";
import { formatISODate, formatLocalDate } from "../../utils/formatDate";

const EmailBody = ({ email, onToggleFavorite }) => {
  return (
    <div className="email-body">
      <Avatar name={email.from.name} size="large" />
      <section className="email-body-items">
        <div className="email-body-header-container">
          <header className="email-body-header">
            <h1 className="email-body-subject">{email.subject}</h1>
            <time dateTime={formatISODate(email.date)} className="date-time">
              {formatLocalDate(email.date)}
            </time>
          </header>
          <button
            className="favorite-btn"
            onClick={() => {
              email.isFavorite = !email.isFavorite;
              onToggleFavorite(email.id);
            }}
          >
            {email.isFavorite ? "Remove from Favorites" : "Mark as favorite"}
          </button>
        </div>

        <main
          className="content"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />
      </section>
    </div>
  );
};

export default EmailBody;
