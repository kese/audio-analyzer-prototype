import { ipc } from './electron'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import Events from './events'
import AudioControls from './audio-controls'
import AudioDisplay from './audio-display'

Events.enhance(React.Component)

class App extends React.Component {

    componentWillMount() {
        this.setState({})
    }

    shouldComponentUpdate(props, state) {
        return !!state.audio && state.audio !== this.state.audio
    }

    render() {
        const { audio } = this.state
        if (!audio) return (<div>Please open an audio file...</div>)
        return (<AudioDisplay audio={audio} />)
    }
}

const app = ReactDOM.render(<App/>, document.querySelector('#app'))
export default app

app.on('audioLoaded', audio => {

    if (app.state.audio) app.state.audio.shutdown()

    app.setState({ audio })

    console.log('onAudioLoaded', audio)

    /*const logParams = {
        channelMask: 3,
        chunkSize: 256,
        chunkCount: 500,
        dB: true,
        min: -100,
        max: 0
    }

    const params = {
        channelMask: 3,
        chunkSize: 256,
        chunkCount: 500,
        dB: false,
        min: 0,
        max: 1
    }

    const peakLevels = new PeakLevelsAnalyser(audio, logParams)
    const rmsLevels = new RmsLevelsAnalyser(audio, logParams)
    const freqSpectra = new FreqSpectraAnalyser(audio, logParams)

    Promise.join(peakLevels.seq(0, 500), rmsLevels.seq(0, 500), freqSpectra.seq(0, 500))
        .then(([peakLevels, rmsLevels, freqSpectra]) =>
            app.setState({ peakLevels, rmsLevels, freqSpectra }))*/

})
/*
function togglePlayback() {
    const { audio } = app.state
    audio.togglePlayback()

    const playback = app.state.playback === 'Play' ? 'Stop' : 'Play'

    audio.togglePlayback

    let offset = 0
    let paused = true
    let delta = 5
    function render() {
       if (paused || offset === 500 - 256) return
       Promise.join(
               peakLevels.seq(offset, 256),
               rmsLevels.seq(offset, 256),
               freqSpectra.seq(offset, 256)
           )
           .then(([peakLevels, rmsLevels, freqSpectra]) =>
               app.setState({ peakLevels, rmsLevels, freqSpectra }))

        offset += delta
        if (!paused) setTimeout(() => requestAnimationFrame(render), 100)
     }

     const toggle = function() {
         paused = !paused
         if (!paused) requestAnimationFrame(render)
     }
}
*/
