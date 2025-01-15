import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { ParallaxProvider } from "react-scroll-parallax";
import Slider from "react-slick";
import { ParallaxBanner } from "react-scroll-parallax";

// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  // We’ll store a ref to the container of each slide
  const slideRefs = useRef([]);

  const [progress, setProgress] = useState(0);

  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const slides = [
    {
      id: 1,
      subtitle: "Lightning the way to",
      title: "Your next adventure",
      type: "top-bottom",
      layers: [
        {
          image: "/starsbg-1.jpg",
          speed: -10,
          className: "zoomOut",
          style: { pointerEvents: "none" },
        },
        {
          image: "/rock-top.webp",
          speed: -10,
          className: "topImage",
          style: {
            height: "645px",
            pointerEvents: "none",
          },
        },
        {
          image: "/rock-bottom.webp",
          speed: -5,
          className: "bottomImage",
          style: {
            pointerEvents: "none",
            height: "536px",
            position: "absolute",
            display: "block",
            top: 386,
            zIndex: 6,
            objectPosition: "bottom",
          },
        },
      ],
    },
    {
      id: 2,
      subtitle: "Chasing dreams",
      title: "Beyound the horizon",
      type: "left-right",
      layers: [
        {
          image: "/starsbg-2.jpg",
          speed: -20,
          className: "zoomOut",
          style: { pointerEvents: "none" },
        },
        {
          image: "/left-rock.webp",
          speed: -10,
          className: "leftImage",
          style: {
            pointerEvents: "none",
          },
        },
        {
          image: "/right-rock.webp",
          speed: -5,
          className: "rightImage",
          style: {
            pointerEvents: "none",
            position: "absolute",
            display: "block",
            objectPosition: "bottom",
          },
        },
      ],
    },
    {
      id: 3,
      subtitle: "Lightning the way to",
      title: "Your next adventure",
      type: "top-bottom",
      layers: [
        {
          image: "/starsbg-3.jpg",
          speed: -20,
          className: "zoomOut",
          style: { pointerEvents: "none" },
        },
        {
          image: "/top-rock2-min.webp",
          speed: -10,
          className: "topImage",
          style: {
            height: "426px",
            pointerEvents: "none",
          },
        },
        {
          image: "/bottom-rock2-min.webp",
          speed: -5,
          className: "bottomImage",
          style: {
            pointerEvents: "none",
            height: "323px",
            position: "absolute",
            display: "block",
            top: 600,
            zIndex: 6,
            objectPosition: "bottom",
          },
        },
      ],
    },
    {
      id: 4,
      subtitle: "Guiding your fourney",
      title: "through the night",
      type: "left-right",
      layers: [
        {
          image: "/starsbg-4.jpg",
          speed: -20,
          className: "zoomOut",
          style: { pointerEvents: "none" },
        },
        {
          image: "/left-man-min.webp",
          speed: -5,
          className: "leftImage",
          style: {
            pointerEvents: "none",
            width: "980px",
            position: "absolute",
            display: "block",
            left: 0,
            bottom: 0,
            objectPosition: "bottom",
          },
        },
      ],
    },
  ];

  // Slick settings: We turn off its fade/speed so GSAP can handle the animation.
  const settings = {
    // dots: true,
    arrows: true,
    infinite: true,
    speed: 0, // <-- turn off Slick's built-in speed
    fade: true, // <-- turn off Slick's built-in fade
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    cssEase: "none", // <-- no built-in easing
    autoplay: true,
    autoplaySpeed: 7200,
    pauseOnHover: false,
    useTransform: true,
    easing: "easeInOut",
    lazyLoad: false,
    beforeChange: (oldIndex, newIndex) => {
      // Animate the old slide out
    },
    afterChange: (currentIndex) => {
      // Animate the new slide in
      setActiveSlide(currentIndex);
      setProgress(0);
    },
  };

  useEffect(() => {
    // We want 100 steps in 7.2 seconds:
    // 7.2s / 100 steps = 72ms per step
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          return 0;
        }
        return oldProgress + 1;
      });
    }, 72);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <ParallaxProvider>
        <div
          style={{ width: "100%", overflow: "hidden", position: "relative" }}
        >
          <Slider
            {...settings}
            ref={(slider) => {
              sliderRef = slider;
            }}
          >
            {slides.map((slide, index) => {
              // Is this slide currently active?
              const isActive = index === activeSlide;

              // Create layers. If you want to disable parallax for inactive slides,
              // you can do so here, but for now we'll keep them the same.
              const adjustedLayers = slide.layers;

              // Force a re-render if it's active or not (optional technique)
              const uniqueKey = isActive
                ? `active-slide-${slide.id}-${activeSlide}`
                : `inactive-slide-${slide.id}`;

              return (
                <div
                  key={slide.id}
                  ref={(el) => (slideRefs.current[index] = el)} // store a ref
                  style={{
                    // start slides invisible (except the first one)
                    opacity: index === 0 ? 1 : 0,
                  }}
                >
                  <ParallaxBanner
                    key={uniqueKey}
                    layers={adjustedLayers}
                    style={{ height: "100vh" }}
                  >
                    <div
                      className="zoomInText"
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "0 200px",
                        gap: 6,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "28px",
                          margin: 0,
                          textTransform: "capitalize",
                          fontFamily: "Playfair Display",
                          fontStyle: "italic",
                        }}
                      >
                        {slide.subtitle}
                      </h2>
                      <h2
                        style={{
                          fontSize: "96px",
                          margin: "8px 0 20px 0",
                          textTransform: "uppercase",
                          fontWeight: 900,
                          fontFamily: "Unbounded",
                        }}
                      >
                        {slide.title}
                      </h2>
                      <button
                        onClick={next}
                        className="btn"
                        style={{
                          padding: "16px 36px",
                          background: "transparent",
                          border: "1px solid #fff",
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: 400,
                          fontFamily: "Unbounded",
                          cursor: "pointer",
                          borderRadius: "5px",
                          color: "rgb(251, 198, 47)",
                          borderColor: "rgb(251, 198, 47)",
                        }}
                      >
                        Enter
                      </button>
                    </div>
                  </ParallaxBanner>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background: "rgb(251, 198, 47)",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      position: "absolute",
                      bottom: 50,
                      left: 50,
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "35px",
                          fontWeight: 400,
                          fontFamily: "Unbounded",
                        }}
                      >
                        0{index + 1}
                      </span>{" "}
                      <span
                        style={{
                          color: "rgba(252, 191, 39, 0.55)",
                          fontSize: "14px",
                          fontWeight: 400,
                          fontFamily: "Unbounded",
                        }}
                      >
                        /0{slides.length}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      position: "absolute",
                      bottom: 50,
                      right: 50,
                      zIndex: 100,
                    }}
                  >
                    <button
                      onClick={previous}
                      style={{
                        padding: "10px",
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                        fontFamily: "Unbounded",
                        cursor: "pointer",
                        borderRadius: "5px",
                        color: "rgb(251, 198, 47)",
                        borderColor: "rgb(251, 198, 47)",
                      }}
                    >
                      -
                    </button>
                    <div
                      style={{
                        width: "1px",
                        height: "40px",
                        background: "rgb(251, 198, 47)",
                      }}
                    ></div>
                    <button
                      onClick={next}
                      style={{
                        padding: "10px",
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                        fontFamily: "Unbounded",
                        cursor: "pointer",
                        borderRadius: "5px",
                        color: "rgb(251, 198, 47)",
                        borderColor: "rgb(251, 198, 47)",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default App;
