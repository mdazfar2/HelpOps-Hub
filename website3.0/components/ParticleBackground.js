//Importing Particles from @tsparticles/react
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    // Initialize particles engine when component mounts
    initParticlesEngine(async (engine) => {
      // Load slim configuration for particles engine
      await loadSlim(engine);
    }).then(() => {
      // Set initialization flag to true once particles engine is initialized
      setInit(true);
    });
  }, []);

  // Function to handle when particles are loaded into the container
  const particlesLoaded = (container) => {
    console.log(container); // Example: Log the container where particles are loaded
  };

  // Memoized options for particles configuration
  const options = useMemo(
    () => ({
      // Limit frames per second for particle rendering
      fpsLimit: 120, 
      fullScreen:{
        enable:false,
        zindex:0
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            // Interaction mode on click
            mode: "repulse", 
          },
          onHover: {
            enable: true,
            // Interaction mode on hover
            mode: "repulse", 
          },
        },
        modes: {
          repulse: {
            // Distance of repulsion effect
            distance: 200, 
            // Duration of repulsion effect
            duration: 0.4, 
          },
          grab: {
            // Distance of grab interaction
            distance: 150,
          },
        },
      },
      particles: {
        number: {
          // Number of particles
          value: 100, 
          density: {
            enable: true,
            // Area within which particles are density distributed
            value_area: 800, 
          },
        },
        color: {
          // Particle color
          value: "#FFFFFF", 
        },
        shape: {
          // Particle shape type
          type: "triangle", 
          stroke: {
            width: 0,
            // Stroke color
            color: "#000000", 
          },
          polygon: {
            // Number of sides for polygon shape
            nb_sides: 12, 
          },
        },
        links: {
          // Color of links between particles
          color: "#FFFFFF",
          // Distance of links between particles
          distance: 180, 
          // Enable linking between particles
          enable: true, 
          // Opacity of links
          opacity: 0.8, 
          // Width of links
          width: 1, 
        },
        move: {
          // Movement direction of particles
          direction: "none", 
          // Enable particle movement
          enable: true, 
          outModes: {
            // Out mode for particles when they move out of canvas
            default: "bounce", 
          },
          // Random movement direction
          random: true, 
          // Speed of particle movement
          speed: 5, 
          // Allow straight particle movement
          straight: false, 
        },
        opacity: {
          // Opacity value of particles
          value: 0.7, 
        },
        size: {
          // Size range of particles
          value: { min: 1, max: 3 },
        },
      },
      // Detect retina displays
      detectRetina: true, 
    }),
    []
  );

  // Render Particles component with specified ID, initialization callback, and options
  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
