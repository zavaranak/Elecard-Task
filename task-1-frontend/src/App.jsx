import Header from "./components/Header"
import Footer from "./components/Footer"
import Content from "./components/Content"
import './scss/app.scss'
const App = () =>{
    return (
        <div className ='app__container'>
        <Header />
        <Content />
        <Footer />
        </div >
    )
}

export default App