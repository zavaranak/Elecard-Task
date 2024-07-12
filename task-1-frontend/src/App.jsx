import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
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
      <Content />
      <Footer />
    </div>
  );
};

export default App;
