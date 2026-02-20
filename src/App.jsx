import ThemeController from "./components/ThemeController";
import Header from "./components/Header";
import CardForm from "./components/CardForm";
import CardsList from "./components/CardsList";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-(--color-bg-app) transition-colors duration-200">
      <Header />
      <ThemeController />
      <main className="container mx-auto px-4 pb-12">
        <CardForm />
        <CardsList />
      </main>
    </div>
  );
}
export default App;
