import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important'
import { addNote, NotesStateType } from './store/reducer';
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";
import filenamify from 'filenamify'

const colors = {
  // ordered from lightest to darkest
  /** the brightest white color `#FEFEFE` */
  white: '#FEFEFE',
  /** What should be used for text colors `#f9f9f9` */
  offWhite: '#f9f9f9',
  darkWhite: '#e8e8e8',
  lightGray: '#BBBBBB',
  /** lightest gray that should be used on a white / offWhite bg */
  mediumGray: '#737373',
  gray: '#646464',
  darkGray: '#222427',
  lightBlack: '#1a1a1a',
  darkBlack: '#000000',

  /** a new color for the left side only */
  darkPurple: '#3B3640',

  // alert colors
  blue: '#008cce',
  lightRed: '#dc5352',
  red: '#d12c2a',

  // current color for standard avatar, will need to change
  avatar: {
    blue: '#96d4cf',
    orange: '#ffae19',
    green: '#97DB5C',
  },

  /** brand colors */
  orange: '#DBA708',

  // external colors
  spotifyGreen: '#1db954',
  soundCloudOrange: '#ff8800',
  twitterBlue: '#1da1f2',

  active: {
    orange: '#DBC06E',
    lightGray: '#dddddd',
    twitterBlue: '#4db5f5',
  },

  // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
  opacity90: (color: string) => `${color}E6`,
  opacity80: (color: string) => `${color}CC`,
  opacity70: (color: string) => `${color}B3`,
  opacity60: (color: string) => `${color}99`,
  opacity50: (color: string) => `${color}80`,
  opacity40: (color: string) => `${color}66`,
  opacity30: (color: string) => `${color}4D`,
  opacity20: (color: string) => `${color}33`,
  opacity10: (color: string) => `${color}1A`,
}


interface Podcast {
  /** adds a listener function for the specified eventName. See below for the list of possible event names. */
  bind: (eventName: string, listener: () => void) => void
  /** removes all listener functions previously added for the specified eventName. See below for the list of possible event names. */
  unbind: (eventName: string) => void
  /** reloads the iframe element with a new widget specified by the url. All previously added event listeners will continue working. options is an object which allows you to define all possible widget parameters as well as a callback function which will be executed as soon as new widget is ready. See below for detailed list of widget parameters. */
  load:(url: string, options: object) => void
  /** plays the sound */
  play: () => void
  /** pauses the sound */
  pause: () => void
  /** toggles the sound */
  toggle: () => void
  /** jumps to a certain position in a sound */
  seekTo:(milliseconds: number) => void
  /** sets the widget volume to a certain value in the range 0-100. */
  setVolume: (volume: number) => void
  /** skips to the next sound (only if the widget contains multiple sounds). */
  next: () => void
  /** skips to the previous sound (only if the widget contains multiple sounds). */
  prev:() => void
  /** jumps to the soundIndex sound, starting from 0 (only if the widget contains multiple sounds). */
  skip: (soundIndex: number) => void
  /** The following methods are sorted out to a separate group called "getters"
   * because they return a value and do not modify the state of the widget.
   * Since communication between the parent page and the widget's iframe is
   * implemented through window.postMessage, it's not possible to return the
   * value synchronously. Because of this, every getter method accepts a
   * callback function as a parameter which, when called, will be given the
   * return value of the getter method. */
  /**  */
  /** returns the current volume, in the range of [0, 100]. */
  getVolume:(callback: (val: number) => void) => void
  /** returns current sound duration in milliseconds. */
  getDuration:(callback: (val: number) => void) => void
  /** returns current sound position in milliseconds. */
  getPosition:(callback: (val: number) => void) => void 
  /** returns the list of sound objects. */
  getSounds:(callback: (val: object[]) => void) => void 
  /** returns current sound object. */
  getCurrentSound:(callback: (val: object) => void) => void
  /** returns the index of current sound. */
  getCurrentSoundIndex:(callback: (val: number) => void) => void 
  /** whether the widget is paused. */
  isPaused:(callback: (val: boolean) => void) => void 

}
const toHHMMSS = (num: number) => {
  const sec_num = Math.floor(num /1000)
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  const seconds = sec_num - (hours * 3600) - (minutes * 60);

  const hourStr = hours < 10 ? `0${hours}` : hours
  const minuteStr = minutes < 10 ? `0${minutes}` : minutes
  const secondStr = seconds < 10 ? `0${seconds}` : seconds

  return `${hourStr}:${minuteStr}:${secondStr}`
}

const iframeHeight = 120

const sty = StyleSheet.create({
  body: {
    width: '100vw',
    minHeight: '100vh',
    background: colors.offWhite,
    overflowX: 'hidden'
  },
  container: {
    margin: 'auto',
    maxWidth: 632,
    width: '100%',
    padding: '0 16px 32px 16px',
  },
  h1Container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  h1Form: {
    display: 'inline-block',
    flexGrow: 1,
  },
  h1: {
    display: 'inline-block',
    marginRight: 16
  },
  note: {
    padding: 8,
    borderLeft: `5px solid ${colors.darkWhite}`,
    marginBottom: 16,
    lineHeight: 1.4,
  },
  h1Input: {
    display: 'inline-block',
    padding: 8,
    width: '100%',
    border: `1px solid ${colors.lightGray}`,
    background: colors.white,
    borderRadius: 2,
  },
  h1InputPending: {
    background: '#FFFF00'
  },
  audioHolder: {
    position:'relative',
    borderRadius: 2,
    marginBottom: 16,
    height: iframeHeight,
    overflow: 'hidden',
  },
  audioOverlay: {
    position: 'absolute',
    width: '100%',
    background: colors.opacity70(colors.darkBlack),
    color: colors.offWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: iframeHeight,
    fontSize: 22,
    fontFamily: 'monospace',
    cursor: 'pointer',
  },
  textarea: {
    fontSize: 16,
    lineHeight: 1.4,
    padding: 16,
    resize: 'none',
    width: '100%',
    border: `1px solid ${colors.lightGray}`,
    background: colors.white,
    borderRadius: 2,
  },
  allNotesContainer: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  noteContainer: {
    padding: 16,
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 2,
    ':nth-child(2n)': {
      background: colors.white,
    }
  },
  noteMessage: {},
  noteTime: {
    color: colors.blue,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  link: {
    color: colors.blue,
  },
  exportButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'fixed',
    fontSize: 14,
    right: 16,
    bottom: 16,
    zIndex: 1
  },
  exportButton: {
    background: '#3A8C26',
    border: 0,
    color: colors.offWhite,
    borderRadius: 2,
    padding: 8,
    cursor: 'pointer',
    textDecoration: 'none'
  }
})


interface State {
  noteValue: string
  podcastPlaying: boolean
  podcastURL: string
  
  isSoundCloudURLFocused: boolean
  soundCloudURLInputValue: string
  currentTrackTitle: string
}

interface Props {
  addNote: (note: {message: string, position: number, podcastURL: string}) => void
  notes: { [podcastURL: string]: { message: string; position: number; }[] | undefined; }
}

const podcastID = 'podcast'

class App extends React.Component<Props, State> {

  state: State = {
    isSoundCloudURLFocused: false,
    noteValue: '',
    podcastPlaying: false,
    podcastURL: 'https://soundcloud.com/a16z/blockchain-bitcoin',
    soundCloudURLInputValue: 'https://soundcloud.com/a16z/blockchain-bitcoin',
    currentTrackTitle: 'blockchain-bitcoin'
  }

  textarea:  React.RefObject<HTMLTextAreaElement> 
  input: React.RefObject<HTMLInputElement>
  
  constructor (props: Props) {
    super(props)
    this.textarea = React.createRef()
    this.input = React.createRef()
    window.onkeydown = () => {
      if (this.textarea.current && this.state.isSoundCloudURLFocused === false) {
        this.textarea.current.focus()
      }
    }
  }

  getPodcast = (): Podcast | undefined => {
    const podcast: Podcast = (window as any).SC.Widget(podcastID)
    return podcast
  }

  onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ noteValue: e.currentTarget.value })
    const podcast = this.getPodcast()
    if (podcast) {
      podcast.pause()
      this.setState({ podcastPlaying: false })
    }
  }

  onKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.state.noteValue === '') {
        return
      }
      const podcast = this.getPodcast()
      if (podcast) {
        podcast.play()
        const position: number = await new Promise(resolve => {
          podcast.getPosition(val => {
            resolve(val)
          })
        })
        this.props.addNote({
          podcastURL: this.state.podcastURL,
          message: this.state.noteValue,
          position,
        })
        this.setState({ 
          noteValue: '',
          podcastPlaying: true,
        })
      }

      // if(this.textarea.current) {
      //   this.textarea.current.blur()
      // }
    }
  }
  render() {
    const currentNotes = (this.props.notes[this.state.podcastURL] || [])
    return (
    <div className={css(sty.body)}>
      <div className={css(sty.exportButtonContainer)}> 
        <CSVLink
          data={currentNotes.map(n => ({ message: n.message, position: toHHMMSS(n.position)}))}
          filename={`${filenamify(this.state.currentTrackTitle)}-pauseNotes.csv`}
          className={css(sty.exportButton)}
          target="_blank"
          onClick={() => {
          }}
        >
        Export Notes as CSV
        </CSVLink>
      </div>
      <div className={css(sty.container)}>
        <div className={css(sty.h1Container)}>
          <h1 className={css(sty.h1)}>PauseNotes</h1>
          <form
            className={css(sty.h1Form)}
            onSubmit={e => {
              e.preventDefault()
              // if they hit enter and nothing is different
              if (this.state.podcastURL === this.state.soundCloudURLInputValue) {
                return
              }
              this.setState(s => ({ podcastURL: s.soundCloudURLInputValue }))
              const podcast = this.getPodcast()
              if (podcast) {
                podcast.load(this.state.soundCloudURLInputValue, {
                  callback: (e: any) => {
                    podcast.getCurrentSound((val: any) => {
                      const title = val.title || 'unknown-track'
                      this.setState({ currentTrackTitle: title})
                    })
                  }
                })
                
              }
            }}
          >
            <input
              className={css(sty.h1Input, this.state.soundCloudURLInputValue !== this.state.podcastURL ? sty.h1InputPending : null)}
              placeholder="Enter SoundCloud URL"
              onFocus={() => this.setState({ isSoundCloudURLFocused: true })}
              onBlur={() => this.setState({ isSoundCloudURLFocused: false })}
              onChange={e => this.setState({ soundCloudURLInputValue: e.target.value })}
              value={this.state.soundCloudURLInputValue}
            />
          </form>
        </div>
        <div className={css(sty.note)}>Take notes on podcasts without worrying
        about missing something,
        then jump around podcasts via your notes
        <br />
        Created by <a className={css(sty.link)}  rel="noopener noreferrer" target="_blank" href="https://twitter.com/biwills">@biwills</a> © 2019</div>
      <div className={css(sty.audioHolder)}>
        <div className={css(sty.audioOverlay)} onClick={() => {
          const podcast = this.getPodcast()
          if (podcast == null) {
            return
          }
          podcast.toggle()
          this.setState(s => ({ podcastPlaying: !s.podcastPlaying}))
        }}>{this.state.podcastPlaying ? 'Pause Podcast' : 'Play Podcast'}</div>
          <iframe
            title='podcast'
            id={podcastID}
            width='100%'
            height={iframeHeight}
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https://soundcloud.com/a16z/blockchain-bitcoin&color=%23445c54&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          />
      </div>
      <textarea
        ref={this.textarea}
        className={css(sty.textarea)}
        value={this.state.noteValue}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        placeholder="start typing to pause the podcast"
      />
      <div className={css(sty.allNotesContainer)}>
        {currentNotes.map(n => 
          <div className={css(sty.noteContainer)}>
            <div className={css(sty.noteMessage)}>{n.message}</div>
            <button type="button" onClick={() => {
              const podcast = this.getPodcast()
              if (podcast) {
                // seek to half a second before
                podcast.seekTo(Math.max(0, n.position - 500))
                podcast.play()
                // podcast.seekTo(n.position)

              }
            }} className={css(sty.noteTime)}>{toHHMMSS(n.position)}</button>
          </div>
        )}
      </div>
    </div></div>
  );
}}

export default connect((state: NotesStateType) => ({
  notes: state.notes,
}), {
  addNote,
})(App);
