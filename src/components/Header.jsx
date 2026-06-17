import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Trang chủ</Link></li>
          <li><Link to="/lucky" className="nav-link">Vòng quay may mắn</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;