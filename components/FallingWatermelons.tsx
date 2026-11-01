"use client";

const melons = [
  { left: "5%", size: 22, duration: 12, delay: -1, drift: 26 },
  { left: "12%", size: 28, duration: 15, delay: -4, drift: -18 },
  { left: "20%", size: 26, duration: 13, delay: -2, drift: 22 },
  { left: "28%", size: 30, duration: 16, delay: -6, drift: -22 },
  { left: "36%", size: 24, duration: 14, delay: -8, drift: 20 },
  { left: "44%", size: 32, duration: 17, delay: -3, drift: -27 },
  { left: "52%", size: 26, duration: 15, delay: -5, drift: 16 },
  { left: "60%", size: 29, duration: 18, delay: -9, drift: -19 },
  { left: "68%", size: 27, duration: 13, delay: -7, drift: 24 },
  { left: "76%", size: 31, duration: 16, delay: -2, drift: -20 },
  { left: "84%", size: 25, duration: 14, delay: -5, drift: 18 },
  { left: "92%", size: 23, duration: 12, delay: -10, drift: -25 },
];

export default function FallingWatermelons() {
  return (
    <div aria-hidden="true" className="falling-watermelon-layer">
      {melons.map((melon, index) => (
        <span
          key={index}
          className="falling-watermelon-item"
          style={{
            left: melon.left,
            animationDelay: `${melon.delay}s`,
            animationDuration: `${melon.duration}s`,
            fontSize: `${melon.size}px`,
            ["--drift" as any]: `${melon.drift}px`,
          }}
        >
          🍉
        </span>
      ))}
    </div>
  );
}
