import React from "react";

export default function WhatWeDo() {
  return (
    <section id="whatwedo" className="w-full py-24 px-4 md:px-16 bg-black relative overflow-hidden">
      <style>{`
        @keyframes fadeInOut1 {
          0% { opacity: 1; }
          23% { opacity: 1; }
          25% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes fadeInOut2 {
          0% { opacity: 0; }
          25% { opacity: 1; }
          48% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes fadeInOut3 {
          0% { opacity: 0; }
          50% { opacity: 1; }
          73% { opacity: 1; }
          75% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes fadeInOut4 {
          0% { opacity: 0; }
          75% { opacity: 1; }
          98% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes type1 {
          0% { width: 0; }
          20% { width: 100%; }
          23% { width: 100%; }
          25% { width: 0; }
          100% { width: 0; }
        }

        @keyframes type2 {
          0% { width: 0; }
          25% { width: 0; }
          45% { width: 100%; }
          48% { width: 100%; }
          50% { width: 0; }
          100% { width: 0; }
        }

        @keyframes type3 {
          0% { width: 0; }
          50% { width: 0; }
          70% { width: 100%; }
          73% { width: 100%; }
          75% { width: 0; }
          100% { width: 0; }
        }

        @keyframes type4 {
          0% { width: 0; }
          75% { width: 0; }
          95% { width: 100%; }
          98% { width: 100%; }
          100% { width: 0; }
        }

        .typing-container {
          min-height: 150px;
          position: relative;
        }

        .typing-line {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }

        .typing-line-1 {
          animation: fadeInOut1 24s infinite;
        }

        .typing-line-1 .typing-wrapper {
          animation: type1 24s steps(80) infinite;
        }

        .typing-line-2 {
          animation: fadeInOut2 24s infinite;
        }

        .typing-line-2 .typing-wrapper {
          animation: type2 24s steps(80) infinite;
        }

        .typing-line-3 {
          animation: fadeInOut3 24s infinite;
        }

        .typing-line-3 .typing-wrapper {
          animation: type3 24s steps(80) infinite;
        }

        .typing-line-4 {
          animation: fadeInOut4 24s infinite;
        }

        .typing-line-4 .typing-wrapper {
          animation: type4 24s steps(60) infinite;
        }

        .typing-wrapper {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          position: relative;
        }

        .typing-wrapper::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #22c55e;
        }

        .typing-text {
          display: inline;
          white-space: nowrap;
        }

        .stable-word {
          color: white;
          font-weight: bold;
          margin-right: 0.3em;
        }

        .highlight {
          color: #22c55e;
          font-weight: bold;
        }
      `}</style>

      <div className="max-w-5xl ml-8 md:ml-16 lg:ml-24">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-16 text-green-400 text-left">
          What We Do
        </h2>

        <div className="mb-12">
          <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            We
          </div>
          
          <div className="typing-container">
            <div className="typing-line typing-line-1 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <div className="typing-wrapper">
                <span className="typing-text">
                  <span className="text-white">connect </span>
                  <span className="highlight">visionary builders</span>
                  <span className="text-white"> with transformative projects.</span>
                </span>
              </div>
            </div>

            <div className="typing-line typing-line-2 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <div className="typing-wrapper">
                <span className="typing-text">
                  <span className="highlight">simplify</span>
                  <span className="text-white"> collaboration and </span>
                  <span className="highlight">accelerate</span>
                  <span className="text-white"> innovation.</span>
                </span>
              </div>
            </div>

            <div className="typing-line typing-line-3 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <div className="typing-wrapper">
                <span className="typing-text">
                  <span className="text-white">empower </span>
                  <span className="highlight">creators</span>
                  <span className="text-white"> to turn ideas into reality.</span>
                </span>
              </div>
            </div>

            <div className="typing-line typing-line-4 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <div className="typing-wrapper">
                <span className="typing-text">
                  <span className="highlight">build the future,</span>
                  <span className="text-white"> together.</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            <p>ProjectNexus is a revolutionary marketplace designed to bridge the gap between ambitious projects and talented developers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
