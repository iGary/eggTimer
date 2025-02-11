import './Header.scss';

export const MainHeader = () => (
  <>
    <img
      src="src/assets/unitas_logo.svg"
      alt="Unitas logo"
      className="logo"
      data-testid="unitas-logo"
    />
    <div className="title">
      <h1>EGG TIMER</h1>
    </div>
  </>
)