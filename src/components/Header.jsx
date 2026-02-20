import ThemeBtn from "./ThemeBtn";

function Header() {

  return (
    <header className="py-6 px-4 mb-8 bg-(--color-bg-surface) shadow-sm flex justify-between items-center container mx-auto rounded-b-xl">
      <h1 className="font-bold text-3xl text-(--color-text-main)">
        Redux Toolkit Cards
      </h1>
      <ThemeBtn />
    </header>
  );
}

export default Header;
