import './App.css'

function App() {
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
          <button className="btn btn-secondary" onClick={() => alert('IP сервера скопирован! (это пиздёж, не скопирован)')}>
            IP: play.iven.qzz.io
          </button>
        </div>
      </main>

      <footer className="footer">
      </footer>
    </div>
  );
}

export default App
