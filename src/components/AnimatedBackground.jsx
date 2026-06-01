import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // start off-screen

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="animated-bg-container fixed inset-0 z-[-10] overflow-hidden bg-[#FDFBF4] pointer-events-none">
      {/* Top Left Blob */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)` }}
      >
        <div className="w-full h-full rounded-full mix-blend-multiply filter blur-[100px] opacity-60 bg-[#FCD34D] animate-blob"></div>
      </div>
      
      {/* Right Middle Blob */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.05}px)` }}
      >
        <div className="w-full h-full rounded-full mix-blend-multiply filter blur-[90px] opacity-50 bg-[#FCA5A5] animate-blob animation-delay-2000"></div>
      </div>
      
      {/* Bottom Left Blob */}
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.1}px)` }}
      >
        <div className="w-full h-full rounded-full mix-blend-multiply filter blur-[120px] opacity-50 bg-[#FDBA74] animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Mouse Follower Spotlight */}
      <div 
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 bg-[#FDE68A] pointer-events-none transition-transform duration-300 ease-out z-10"
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%)`,
          left: 0,
          top: 0
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
