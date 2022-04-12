import "./styles.css";
import logo from "../../logo.svg";
const Header = () => {
  console.log(Header.name, 'run')

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://github.com/jtr354"
        target="_blank"
        rel="noopener noreferrer"
      >
        TodoList
      </a>
    </header>
  );
};

export default Header;
