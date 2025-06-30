import React, { useState } from "react";
import "./Sidebar.css";
import Titulo from "../titulo/titulo";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [mostrarSubmenu, setMostrarSubmenu] = useState(false);

    const toggleSubmenu = () => {
        setMostrarSubmenu(!mostrarSubmenu);
    };

    return (
        <div className="sidebar">
            <Titulo />
            <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link">🏠 Home</Link>

                <button
                    onClick={toggleSubmenu}
                    className="sidebar-link submenu-button"
                    aria-expanded={mostrarSubmenu}
                >
                    💊 Farmácia {mostrarSubmenu ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                <div className={`submenu ${mostrarSubmenu ? "show" : ""}`}>
                    <Link to="/estoque" className="sidebar-sublink">📦 Estoque</Link>
                    <Link to="/entradas" className="sidebar-sublink">➕ Entrada</Link>
                    <Link to="/saida" className="sidebar-sublink">➖ Saídas</Link>
                </div>
                <Link to="/relatorio" className="sidebar-link"> Relatorio</Link>
                <Link to="/usuarios" className="sidebar-link">👥 Usuários</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
