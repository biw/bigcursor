import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import isMobile from "ismobilejs";
import { Helmet } from "react-helmet";
import cursorIcon from '../images/cursor-icon.png'
import metaImage from '../images/meta-img.png'

const sty = StyleSheet.create({
  body: {
    width: "100vw",
    minHeight: "100vh",
    background: "#DBA708",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "none",
    position: 'absolute',
  },
  madeBy: {
    lineHeight: 1.4,
    paddingTop: 16
  }
});

const Cursor = () => (
  <svg
    width="216"
    height="324"
    viewBox="0 0 216 324"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path
        d="M17.1018 17.9124V271.023L69.5462 221.424L113.595 306.241L170.012 275.942L129.148 199.026H198.215L17.1018 17.9124Z"
        fill="white"
      />
    </g>
    <path
      d="M32.5092 54.6799V234.902L72.9642 195.563L118.599 281.343L147.593 266.074L103.33 183.638H161.467L32.5092 54.6799Z"
      fill="black"
    />
    <defs>
      <filter
        id="filter0_d"
        x="0.101837"
        y="0.912422"
        width="215.113"
        height="322.329"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="8.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const Pointer = () => (
  <svg
    width="322"
    height="338"
    viewBox="0 0 322 338"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "relative", right: 78 }}
  >
    <g filter="url(#filter0_d)">
      <path
        d="M78.8115 65.5295C79.251 81.3618 100.409 147.7 102.761 181.98C80.4001 154.744 65.025 132.815 39.1522 139.793C21.7909 151.825 21.6554 161.738 29.1724 181.98C67.4958 231.499 91.4181 266.152 120.805 290.396V313.531C155.694 314.424 169.667 313.793 184.766 310.809C194.983 303.842 199.09 298.011 206.086 287.221C214.446 298.206 219.345 303.191 228.314 310.809H253.263C252.036 297.16 249.558 284.603 253.263 279.055C288.093 226.912 295.818 213.58 294.09 175.175C298.075 144.305 303.517 124.258 278.666 118.019C267.99 120.161 262.021 121.506 253.263 139.793C252.483 112.865 247.517 101.452 224.231 100.781C202.805 100.163 198.656 111.363 197.014 139.793C195.893 110.405 192.316 97.332 167.074 95.7909C146.363 95.3693 142.65 106.864 144.393 139.793C136.612 107.313 133.463 67.3697 128.97 56.3255C120.121 34.5739 114.224 24.3934 95.4017 24.1181C80.823 28.6436 77.9805 35.59 78.8115 65.5295Z"
        fill="white"
      />
      <path
        d="M78.8115 65.5295C79.251 81.3618 100.409 147.7 102.761 181.98C80.4001 154.744 65.025 132.815 39.1522 139.793C21.7909 151.825 21.6554 161.738 29.1724 181.98C67.4958 231.499 91.4181 266.152 120.805 290.396V313.531C155.694 314.424 169.667 313.793 184.766 310.809C194.983 303.842 199.09 298.011 206.086 287.221C214.446 298.206 219.345 303.191 228.314 310.809H253.263C252.036 297.16 249.558 284.603 253.263 279.055C288.093 226.912 295.818 213.58 294.09 175.175C298.075 144.305 303.517 124.258 278.666 118.019C267.99 120.161 262.021 121.506 253.263 139.793C252.483 112.865 247.517 101.452 224.231 100.781C202.805 100.163 198.656 111.363 197.014 139.793C195.893 110.405 192.316 97.332 167.074 95.7909C146.363 95.3693 142.65 106.864 144.393 139.793C136.612 107.313 133.463 67.3697 128.97 56.3255C120.121 34.5739 114.224 24.3934 95.4017 24.1181C80.823 28.6436 77.9805 35.59 78.8115 65.5295Z"
        stroke="black"
        stroke-width="14"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <path
      d="M235.248 256.545L235.248 191.585"
      stroke="black"
      stroke-width="14"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M158.248 256.545L158.248 191.585"
      stroke="black"
      stroke-width="14"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M196.248 256.545L196.248 191.585"
      stroke="black"
      stroke-width="14"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_d"
        x="0.439255"
        y="0.118095"
        width="321.1"
        height="337.787"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="8.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const Header = () => ( <Helmet>
  <style>
    {`/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

    `}
  </style>
  <title>BigCursor</title>
  <link
    rel="icon"
    type="image/png"
    href={cursorIcon}
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="apple-touch-icon" href={cursorIcon} />
  {/* <!-- Primary Meta Tags --> */}
  <meta name="title" content="BigCursor" />
  <meta
    name="description"
    content="It's a really big cursor."
  />

  {/* <!-- Open Graph / Facebook --> */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://biwills.com/bigcursor" />
  <meta property="og:title" content="BigCursor" />
  <meta
    property="og:description"
    content="It's a really big cursor."
  />
  <meta property="og:image" content={metaImage} />

  {/* <!-- Twitter --> */}
  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:url"
    content="https://biwills.com/bigcursor"
  />
  <meta property="twitter:title" content="BigCursor" />
  <meta
    property="twitter:description"
    content="It's a really big cursor."
  />
  <meta property="twitter:image" content={`https://biwills.com${metaImage}`} />
</Helmet>)

class App extends React.Component {
  state = {
    x: 0,
    y: 0,
    buttonHover: false
  };
  render() {
    if (isMobile().any) {
      return (
        <div className={css(sty.body)}>
          <Header />
          This site only works on a desktop, sorry 🙃
        </div>
      );
    }
    return (
      <div
        className={css(sty.body)}
        onMouseMove={e => {
          this.setState({
            x: Math.min(e.clientX - 18, e.currentTarget.clientWidth - 220),
            y: Math.min(e.clientY - 22, e.currentTarget.clientHeight - 327)
          });
        }}
      >
       <Header />
        <div
          style={{
            position: "absolute",
            left: this.state.x,
            top: this.state.y,
            pointerEvents: "none"
          }}
        >
          {this.state.buttonHover ? <Pointer /> : <Cursor />}
        </div>
        <button
          onClick={() => {
            window.open(
              "https://twitter.com/intent/tweet/?text=It's a really big cursor https://biwills.com/bigcursor"
            );
          }}
          onMouseOver={() => this.setState({ buttonHover: true })}
          onMouseOut={() => this.setState({ buttonHover: false })}
          style={{ cursor: "none" }}
        >
          click to share on twitter
        </button>
        <div className={css(sty.madeBy)}>
          made by{" "}
          <a
            style={{ cursor: "none" }}
            href="https://twitter.com/biwills"
            onMouseOver={() => this.setState({ buttonHover: true })}
            onMouseOut={() => this.setState({ buttonHover: false })}
          >
            @biwills
          </a>
        </div>
      </div>
    );
  }
}

export default App;
