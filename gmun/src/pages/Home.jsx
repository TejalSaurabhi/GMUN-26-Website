import Announcements from "../components/Announcements";
import Carousel from "../components/carousel";
import Countdown from "../components/Countdown";
import Footer from "../components/Footer";
import Reviews from "../components/reviews/Reviews";
import Timeline from "../components/Timeline";

const Home = () => {
  return (
    <div style={{ backgroundImage: 'url("/assets/home-bg.jpg")', backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <header>
        <h1 className="heading">GMUN 2025</h1>
      </header>

      <section id="carousel" style={{ marginBottom: "50px" }}>
        <Carousel />
      </section>

      <div className="countdown-section" style={{ marginTop: "500px" }}>
        <Countdown />

        {/* <section id="about" style={{ color: '#B69354' }}>
                    <h2
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Welcome to GMUN 2025 IIT KGP
                    </h2>
                    <p
                        style={{
                            fontStyle: 'italic',
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        "Today's students... to tomorrow's leaders"
                    </p>
                </section>

                <section id="events" style={{ color: '#B69354' }}>
                    <h2
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Event Timeline
                    </h2>
                    <ul>
                        <li
                            style={{
                                color: '#B69354',
                                textShadow: `
                    0 0 12px rgba(0, 0, 0, 0.9), 
                    0 0 24px rgba(0, 0, 0, 0.8), 
                    0 0 36px rgba(0, 0, 0, 0.7), 
                    0 0 48px rgba(0, 0, 0, 0.6), 
                    0 0 60px rgba(0, 0, 0, 0.5)
                `,
                            }}
                        >
                            GMUN Conference
                        </li>
                        <li
                            style={{
                                color: '#B69354',
                                textShadow: `
                    0 0 12px rgba(0, 0, 0, 0.9), 
                    0 0 24px rgba(0, 0, 0, 0.8), 
                    0 0 36px rgba(0, 0, 0, 0.7), 
                    0 0 48px rgba(0, 0, 0, 0.6), 
                    0 0 60px rgba(0, 0, 0, 0.5)
                `,
                            }}
                        >
                            Workshops on Public Speaking
                        </li>
                        <li
                            style={{
                                color: '#B69354',
                                textShadow: `
                    0 0 12px rgba(0, 0, 0, 0.9), 
                    0 0 24px rgba(0, 0, 0, 0.8), 
                    0 0 36px rgba(0, 0, 0, 0.7), 
                    0 0 48px rgba(0, 0, 0, 0.6), 
                    0 0 60px rgba(0, 0, 0, 0.5)
                `,
                            }}
                        >
                            Networking Gala
                        </li>
                    </ul>
                </section>

                <section id="registration" style={{ color: '#B69354' }}>
                    <h2
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Registration
                    </h2>
                    <p
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Register now to secure your spot at GMUN 2025!
                    </p>
                    <a
                        href="registration.html"
                        style={{
                            color: '#0000FF',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Click here to register
                    </a>
                </section>

                <section id="contact" style={{ color: '#B69354' }}>
                    <h2
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Contact Us
                    </h2>
                    <p
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        If you have any questions, feel free to reach out!
                    </p>
                    <p
                        style={{
                            color: '#B69354',
                            textShadow: `
                0 0 12px rgba(0, 0, 0, 0.9), 
                0 0 24px rgba(0, 0, 0, 0.8), 
                0 0 36px rgba(0, 0, 0, 0.7), 
                0 0 48px rgba(0, 0, 0, 0.6), 
                0 0 60px rgba(0, 0, 0, 0.5)
            `,
                        }}
                    >
                        Email: <a href="mailto:info@communique.org" style={{ color: '#0000FF' }}>communique</a>
                    </p>
                </section> */}
      </div>

      <div className="announcements" style={{ marginTop: "120px" }}>
        <Announcements />
      </div>

      <div className="timeline">
        <Timeline />
      </div>

      <div className="reviews">
        <Reviews />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
