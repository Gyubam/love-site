import DdayCounter from "./components/DdayCounter";
import Gallery from "./components/Gallery";
import FloatingHearts from "./components/FloatingHearts";
import Journal from "./components/Journal";

export default function Home() {
  return (
    <main>
      <FloatingHearts />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="animate-fade-in-up">
          <h1 className="hero-title">아가주현</h1>
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

      {/* Journal Section */}
      <section style={{ padding: "4rem 1rem 5rem" }}>
        <h2 className="section-title animate-fade-in">Our Diary</h2>
        <p className="section-subtitle">우리의 하루 일지</p>
        <div className="section-divider" />
        <Journal />
      </section>

      {/* Message Section */}
      <section className="message-section">
        <div className="message-card animate-fade-in-up">
          <p>
            아구약 사랑한단다.
            <br />
            <br />
            오래오래 썽질내지 않구 사랑하자꾸나.
            <br />
            <br />
            검은머리 파뿌리 레쭈고 &#x2661;
          </p>
          <div className="message-heart animate-pulse-soft">&hearts;</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with &hearts; for JuHyeon</p>
      </footer>
    </main>
  );
}
