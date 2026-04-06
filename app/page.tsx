import DdayCounter from "./components/DdayCounter";
import Gallery from "./components/Gallery";
import FloatingHearts from "./components/FloatingHearts";

export default function Home() {
  return (
    <main>
      <FloatingHearts />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="animate-fade-in-up">
          <h1 className="hero-title">For You</h1>
          <p className="hero-subtitle">우리의 모든 순간이 소중해</p>
        </div>

        <DdayCounter />

        <div className="scroll-indicator animate-bounce-gentle">
          <span>scroll down</span>
          <span style={{ fontSize: "1.2rem" }}>&darr;</span>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: "4rem 1rem 5rem" }}>
        <h2 className="section-title animate-fade-in">Our Moments</h2>
        <p className="section-subtitle">함께한 우리의 순간들</p>
        <div className="section-divider" />
        <Gallery />
      </section>

      {/* Message Section */}
      <section className="message-section">
        <div className="message-card animate-fade-in-up">
          <p>
            매일매일 너와 함께하는 모든 순간이
            <br />
            나에게는 가장 큰 행복이야.
            <br />
            <br />
            앞으로도 함께 만들어갈
            <br />
            우리의 이야기가 기대돼.
            <br />
            <br />
            사랑해 &#x2661;
          </p>
          <div className="message-heart animate-pulse-soft">&hearts;</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with &hearts; for you</p>
      </footer>
    </main>
  );
}
