import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ProtectedContent from '@components/ProtectedContent/ProtectedContent';
import Alert from '@components/Alert/Alert';
import { LanguageContext, languageText } from '@utils/textContext';
import './App.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAlertStatus } from '@store/appSlice';

const App = () => {
  const currentLanguage = localStorage.getItem('lang');
  let lang;
  if (currentLanguage) lang = currentLanguage;
  else {
    localStorage.setItem('lang', 'en');
    lang = 'en';
  }
  const [text, setText] = useState(languageText[lang]);

  const [showAlert, setShowAlert] = useState(true);
  const status = useSelector(selectAlertStatus);
  const [displayChat, toggleChat] = useState(false);
  const alertHandler = () => {
    setShowAlert(false);
    setTimeout(() => {
      setShowAlert(true);
    }, 100);
  };
  useEffect(() => {
    const darkmode = localStorage.getItem('darktheme');
    if (darkmode === 'true') {
      document.documentElement.classList.add('dark-theme');
    }
  });
  useEffect(() => {
    alertHandler();
  }, [status.count]);
  return (
    <LanguageContext.Provider value={{ text, setText }}>
      <div className='app'>
        {showAlert && <Alert status={status.alertStatus} />}
        <Header toggleChat={toggleChat} />
        <ProtectedContent displayChat={displayChat} />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
