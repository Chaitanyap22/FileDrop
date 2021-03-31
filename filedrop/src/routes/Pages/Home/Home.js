import { h } from 'preact';
import network from '../../../assets/images/illustrations/network.svg';
import twoDevices from '../../../assets/images/illustrations/two_devices.svg';
import threeDevices from '../../../assets/images/illustrations/three_devices.svg';
import earth from '../../../assets/images/illustrations/earth.svg';
import './Home.scss';

const Home = () => (
  <main class="landing-page">
    <section class="hero full-screen">

      <div class="info">
        <h1 class="title">Share files with friends and family like never before!</h1>
        <h2 class="subtitle">Using just a web browser across any device on not locally but GLOBALLYYYY!!!</h2>

        <a href="/app" class="btn">
          Start Sharing
        </a>
      </div>

      <img class="network-img" src={network} alt="Devices connected using FileDrop" />

      <svg class="waves" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,160L21.8,160C43.6,160,87,160,131,181.3C174.5,203,218,245,262,234.7C305.5,224,349,160,393,133.3C436.4,107,480,117,524,106.7C567.3,96,611,64,655,80C698.2,96,742,160,785,176C829.1,192,873,160,916,138.7C960,117,1004,107,1047,112C1090.9,117,1135,139,1178,170.7C1221.8,203,1265,245,1309,234.7C1352.7,224,1396,160,1418,128L1440,96L1440" stroke-dasharray="1650" stroke-dashoffset="1650">
          <animate
            attributeName="stroke-dashoffset"
            from="1650"
            to="0"
            dur="2s"
            fill="freeze"
            keySplines=".42,0,.58,1"
            calcMode="spline"
            keyTimes="0; 1"
          />
        </path>
      </svg>

    </section>


    <section class="features">
      <div class="feature">
        <img src={twoDevices} alt="Laptop and mobile connected together" loading="lazy" style="margin-right: -60px" />
        <h2>Easy to use</h2>
        <p>
          FileDrop is a web app, just open it in your browser, join a block, and start sharing. No need to download specific apps for different platforms.
        </p>
      </div>

      <div class="feature">
        <img src={threeDevices} alt="Laptop and two mobiles connected together" loading="lazy" />
        <h2>Multi-device</h2>
        <p>
          Traditionally, sharing files to multiple devices has been a hassle. With FileDrop, you can share files across multiple devices with ease.
        </p>
      </div>
      
      <div class="feature">
        <img src={earth} alt="Devices in different parts of the world using FileDrop to share files" loading="lazy" style="transform: scale(0.9)" />
        <h2>Anywhere</h2>
        <p>
          FileDrop is built on modern web technologies, allowing it to work on devices far away from each other. It just needs to be connected to the internet.
        </p>
      </div>
    </section>

    <section class="about" id="about">

      <blockquote>
        <span>"</span>Filedrop by HotCoder.io&trade;, inspired by WebTorents and PeerToPeer Connections, is purely a magic. With FileDrop you don't just share files on your local network but on any network, not matter where you are present.<span>"</span>

        <footer>
          <a href="https://hotcoder.in" target="_blank" rel="noopener noreferrer">
            <img src="../../../assets/images/logo.png" alt="HotCoder Pvt. Ltd." />
          </a>
          <cite class="author">HotCoder.io&trade; Software Dev Team</cite>
          <cite class="position">HotCoder Pvt. Ltd. | India</cite>
        </footer>
      </blockquote>

    </section>

    <section class="hero final-cta">
      <div>
        <h2 class="title">Let's start sharing!</h2>
        <h3 class="subtitle">No registrations required, it's completely free</h3>

        <a href="/app" class="btn">
          Start sharing
        </a>
      </div>
    </section>
  </main>
);

export default Home;
