import FourOFourVis from '../../../assets/images/illustrations/four-o-four.svg';

import './FourOFour.scss';

const FourOFour = () => (
  <main class="four-o-four">
    <img src={FourOFourVis} />
    <h1>Oops, this connection just broke into numbers!</h1>
    <p>Lets get you back to FileDrop to start sharing some files</p>
    <a class="btn" href="/">Go back home</a>
  </main>
);

export default FourOFour;