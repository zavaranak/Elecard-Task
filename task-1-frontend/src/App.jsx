import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ProtectedContent from '@components/ProtectedContent/ProtectedContent';
import { LanguageContext, languageText } from '@utils/textContext';
import './App.scss';
import { useEffect, useState } from 'react';

const App = () => {
  const currentLanguage = localStorage.getItem('lang');
  let lang;
  if (currentLanguage) lang = currentLanguage;
  else {
    localStorage.setItem('lang', 'en');
    lang = 'en';
  }
  const [text, setText] = useState(languageText[lang]);
  useEffect(() => {
    const darkmode = localStorage.getItem('darktheme');
    if (darkmode === 'true') {
      document.documentElement.classList.add('dark-theme');
    }
  });
  return (
    <LanguageContext.Provider value={{ text, setText }}>
      <div className='app'>
        <Header />
        <ProtectedContent />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
