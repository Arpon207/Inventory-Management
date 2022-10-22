//Navbar
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

//Banner

const banner = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const bannerButton = {
  hidden: { x: 0 },
  visible: {
    x: [0, 5, 0],
    transition: { duration: 3, repeat: Infinity },
  },
};

export { container, item, banner, bannerButton };