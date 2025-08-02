import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">O mnie</Link></li>
        <li><Link to="/albums" className="hover:underline">Albumy</Link></li>
        <li><Link to="/login" className="hover:underline">Admin</Link></li>
      </ul>
    </nav>
  );
}