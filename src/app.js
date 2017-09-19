import { ipc, path } from './electron'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import Events from './events'
import AudioControls from './audio-controls'
import AudioDisplay from './audio-display'

Events.enhance(React.Component)

class App extends React.Component {

    shouldComponentUpdate({ audio }, nextState) {
        return audio !== this.props.audio
    }

    componentWillReceiveProps() {
        if (this.props.audio) this.props.audio.shutdown()
    }

    render() {
        if (!this.props.audio)
            return (<div className={'start'}><span className={'msg'}>Right click to open an audio file...</span></div>)
        return (<AudioDisplay audio={this.props.audio} />)
    }
}

const container = document.querySelector('#app')
const app = ReactDOM.render(<App/>, container)
export default app

app.on('audioLoaded', audio => ReactDOM.render(<App audio={audio}/>, container))
app.start = () => {}
 //
// app.start = () =>
//     app.trigger('loadFile', path.resolve('./data/daten_frequencyshift.wav'))
