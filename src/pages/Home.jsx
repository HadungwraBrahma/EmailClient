import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar/FilterBar";
import EmailList from "../components/EmailList/EmailList";
import Pagination from "../components/Pagination/Pagination";
import "../styles/Home.css";
import useEmailState from "../hooks/useEmailState";
import EmailBody from "../components/EmailBody/EmailBody";

const Home = () => {
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const {
    emails,
    markAsRead,
    toggleFavorite,
    clearPersistedStates,
    initializeEmails,
  } = useEmailState();

  useEffect(() => {
    fetchEmails(currentPage);
  }, [currentPage]);

  const fetchEmails = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${page}`
      );
      const data = await response.json();
      initializeEmails(data.list);
      setTotalPages(data.totalPages || 2);
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailClick = async (email) => {
    markAsRead(email.id);

    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${email.id}`
    );
    const data = await response.json();

    data.date = email.date;
    data.subject = email.subject;
    data.from = email.from;
    data.isRead = true;
    data.isFavorite = email.isFavorite;

    setSelectedEmail(data);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setSelectedEmail(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedEmail(null);
  };

  const filteredEmails = emails.filter((email) => {
    switch (filterType) {
      case "favorites":
        return email.isFavorite;
      case "read":
        return email.isRead;
      case "unread":
        return !email.isRead;
      default:
        return true;
    }
  });

  return (
    <div className="home-container">
      <FilterBar
        filterType={filterType}
        onFilterChange={handleFilterChange}
        onClearStates={() => {
          setSelectedEmail(null);
          clearPersistedStates();
          fetchEmails(currentPage);
        }}
      />

      <div
        className={`main-content ${selectedEmail ? "split-view" : "full-view"}`}
      >
        <EmailList
          emails={filteredEmails}
          selectedEmail={selectedEmail}
          isLoading={isLoading}
          onEmailClick={handleEmailClick}
        />

        {selectedEmail && (
          <EmailBody email={selectedEmail} onToggleFavorite={toggleFavorite} />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
