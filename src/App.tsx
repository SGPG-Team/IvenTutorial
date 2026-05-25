import { useState } from 'react';
import './App.css'

function App() {
  const serverIP = "play.iven.qzz.io";

  const [showToast, setShowToast] = useState(false);

  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      
      <main className="content">
        <h1 className="title">
          {"ИВЕНЬ"}
        </h1>
        
        <p className="subtitle">
          Добро пожаловать на официальную вики по ивню. Здесь собраны все руководства по тактике, 
          управлению и правилам проведения ивней. 
          Изучи материалы перед игрой.
        </p>

        <div className="cta-group">
          <button className="btn btn-primary" onClick={() => alert('Тут будет переход к туториалу!')}>
            Открыть вики
          </button>
          <button className="btn btn-secondary" onClick={() => {
            navigator.clipboard.writeText(serverIP);
            setShowToast(true);

            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }}>
            IP: {serverIP}
          </button>
        </div>
      </main>

      <div className={`toast ${showToast ? 'toast-show' : ''}`}>
        <span className="toast-icon">🖨️</span>
        <div className="toast-text">
          <h4>IP-адрес скопирован!</h4>
        </div>
      </div>

      <footer className="footer">
      </footer>
    </div>
  );
}

export default App
