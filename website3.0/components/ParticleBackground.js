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
    .catch(err => console.error(err))