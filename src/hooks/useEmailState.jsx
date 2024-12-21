import { useState } from 'react';

const useEmailState = (initialEmails = []) => {
  const [emails, setEmails] = useState(initialEmails);

  const loadPersistedEmailStates = (fetchedEmails) => {
    return fetchedEmails.map((email) => {
      const persistedEmail = 
        JSON.parse(localStorage.getItem(`email_${email.id}`)) || {};
      return {
        ...email,
        isRead: persistedEmail.isRead !== undefined
          ? persistedEmail.isRead
          : email.isRead || false,
        isFavorite: persistedEmail.isFavorite !== undefined
          ? persistedEmail.isFavorite
          : email.isFavorite || false,
      };
    });
  };

  const saveEmailState = (email) => {
    localStorage.setItem(
      `email_${email.id}`,
      JSON.stringify({
        isRead: email.isRead,
        isFavorite: email.isFavorite,
      })
    );
  };

  const markAsRead = (emailId) => {
    const updatedEmails = emails.map((e) => {
      if (e.id === emailId) {
        const updatedEmail = { ...e, isRead: true };
        saveEmailState(updatedEmail);
        return updatedEmail;
      }
      return e;
    });

    setEmails(updatedEmails);
  };

  const toggleFavorite = (emailId) => {
    const updatedEmails = emails.map((item) => {
      if (item.id === emailId) {
        const updatedEmail = { 
          ...item, 
          isFavorite: item.isFavorite !== undefined 
            ? !item.isFavorite 
            : true 
        };
        saveEmailState(updatedEmail);
        return updatedEmail;
      }
      return item;
    });
    setEmails(updatedEmails);
  };

  const clearPersistedStates = () => {
    emails.forEach((email) => {
      localStorage.removeItem(`email_${email.id}`);
    });
  };

  const initializeEmails = (fetchedEmails) => {
    const initializedEmails = loadPersistedEmailStates(fetchedEmails);
    setEmails(initializedEmails);
  };

  return {
    emails,
    markAsRead,
    toggleFavorite,
    clearPersistedStates,
    initializeEmails,
  };
};

export default useEmailState;