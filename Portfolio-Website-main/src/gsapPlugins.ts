import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

// gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
