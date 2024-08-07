import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ProtectedContent from '@components/ProtectedContent/ProtectedContent';
import './App.scss';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const darkmode = localStorage.getItem('darktheme');
    if (darkmode === 'true') {
      document.documentElement.classList.add('dark-theme');
    }
  });
  return (
    <div className='app'>
      <Header />
      <ProtectedContent />
      <Footer />
    </div>
  );
};

export default App;
