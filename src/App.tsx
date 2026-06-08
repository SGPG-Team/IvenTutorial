import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import wikiMenu from './WikiPages';
import './App.css';

const serverIP = "play.iven.qzz.io";

function HomePage() {
  const [showToast, setShowToast] = useState(false);

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      
      <main className="content">
        <h1 className="title">{"ИВЕНЬ"}</h1>
        <p className="subtitle">
          Добро пожаловать на официальную вики по ивню. Здесь собраны все руководства по тактике, 
          управлению и правилам проведения ивней. Изучи материалы перед игрой.
        </p>

        <div className="cta-group">
          <Link to="/wiki/client" className="btn btn-primary">
            Открыть вики
          </Link>
          <button className="btn btn-secondary" onClick={handleCopyIP}>
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
    </div>
  );
}

function MarkdownRenderer({ path }: { path: string }) {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    let isMounted = true;

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Файл не найден');
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setMarkdownContent(text);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setMarkdownContent(`### ❌ Ошибка загрузки\nНе удалось загрузить файл статьи: ${err.message}`);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [path]);

  if (isLoading) {
    return <p className="wiki-loading">Загрузка данных...</p>;
  }

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>;
}

function WikiPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const currentTab = wikiMenu.find(item => item.id === articleId) || wikiMenu[0];

  const handleMenuClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="wiki-container">
      <button className="mobile-burger-btn" onClick={() => setIsSidebarOpen(true)}>
        ☰
      </button>

      <div 
        className={`wiki-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className="wiki-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <span className="sidebar-logo">Вики</span>
            <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
              ✕
            </button>
          </div>
          <button className="btn-back" onClick={() => navigate('/')}>← На главную</button>
        </div>
        
        <nav className="sidebar-menu">
          {wikiMenu.map((item) => (
            <Link
              key={item.id}
              to={`/wiki/${item.id}`}
              className={`menu-item ${currentTab.id === item.id ? 'active' : ''}`}
              style={{ textDecoration: 'none', display: 'block' }}
              onClick={handleMenuClick}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="wiki-content">
        <div className="markdown-body">
          <MarkdownRenderer key={currentTab.id} path={currentTab.path} />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wiki/:articleId" element={<WikiPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;