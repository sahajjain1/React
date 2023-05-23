import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsMonkey</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/play">Games</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todo">Todo</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <LogoutButton />
          </div>
        </div>
      </nav>
    );
  }
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // ...

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
  );
}

export default Navbar;
