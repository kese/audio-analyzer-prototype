import { debounce, throttle } from 'lodash'
import React from 'react'
import AudioControls from './audio-controls'
import Selection from './selection'
import Settings from './settings'
import RmsLevels from './rms-levels'
import FreqSpectra from './freq-spectra'

import app from './app'

export default class AudioDisplay extends React.Component {

    reset(props) {
        const { audio } = props
        const resolution = Math.min(250, audio.buffer.length)
        const chunkSizeExp = 6
        const selOffset = 0.0
        const selExtent = 1.0
        const position = 0.0
        const logScale = true
        this.setState({ position, selOffset, selExtent, chunkSizeExp, resolution, logScale })
        audio.update = this.update.bind(this)
        audio.preparePlayback(selOffset, selExtent)
    }

    update(state) { this.setState(state) }

    componentWillMount() { this.reset(this.props) }

    componentWillReceiveProps(props) {
        if (props.audio !== this.props.audio) this.reset(props)
    }
    componentWillUpdate({ audio }, { selOffset, selExtent }) {
        if (selOffset !== this.state.selOffset || selExtent !== this.state.selExtent)
            audio.preparePlayback(selOffset, selExtent)
    }

    toggleAudio() {
        this.props.audio.togglePlayback()
        this.forceUpdate()
    }

    stopAudio() {
        const { audio } = this.props
        const { selOffset, selExtent } = this.state
        audio.preparePlayback(selOffset, selExtent)
        this.forceUpdate()
    }

    toggleLogScale() {
        this.setState({ logScale: !this.state.logScale })
    }

    render() {

        const update = this.update.bind(this)
        const { audio } = this.props
        const { buffer: { length }} = audio
        const { selOffset, selExtent, resolution, position, logScale } = this.state

        const maxChunkSizeExp = Math.min(10, ~~Math.log2(length / resolution))
        const chunkSizeExp = Math.min(this.state.chunkSizeExp, maxChunkSizeExp)
        const chunkSize = Math.pow(2, chunkSizeExp)
        const maxResolution = Math.min(1600, ~~(length / chunkSize))
        const selMinExtent = Math.max(0.01, chunkSize * resolution / length)
        const offTime = ~~(selOffset * audio.buffer.duration * 1000) / 1000
        const extTime = ~~(selExtent * audio.buffer.duration * 1000) / 1000

        const audioRunning = audio.context.state === 'running'
        const playButtonLabel = audioRunning ? 'Pause' : 'Play'
        const logScaleText = logScale ? 'Switch to linear scale' : 'Switch to logarithmic scale'

        const selPosLeft = Math.max(0, Math.min(1, position / audio.buffer.duration))
        const posLeft = Math.max(0, Math.min(1, (position / audio.buffer.duration - selOffset) / selExtent))
        const posRounded = ~~(position * 1000) / 1000
        const posDisplay = audioRunning ? 'block' : 'none'

        return (
            <div className={'display'}>
                <section className={'navigation'}>
                    <h2><span>Selection</span> <span className={'status'}>
                            (Offset: {offTime}s, Length: {extTime}s, Position: {posRounded}s)
                        </span>
                    </h2>
                    <div className={'graph'}>
                        <Selection
                            disabled={audioRunning}
                            offset={selOffset}
                            extent={selExtent}
                            minExtent={selMinExtent}
                            update={update} />
                        <div className={'position'} style={{ left: `${selPosLeft * 100}%`, display: posDisplay }}/>
                        <RmsLevels
                            audio={audio}
                            offset={0.0}
                            extent={1.0}
                            chunkSize={512}
                            resolution={1000}
                            fill={false}
                            logScale={logScale}
                            aspectRatio={20} />
                    </div>
                </section>
                <section className={'rms'}>
                    <h2>RMS-Levels</h2>
                    <div className={'graph'}>
                        <div className={'position'} style={{ left: `${posLeft * 100}%`, display: posDisplay }}/>
                        <RmsLevels
                            audio={audio}
                            offset={selOffset}
                            extent={selExtent}
                            chunkSize={chunkSize}
                            resolution={resolution}
                            fill={false}
                            logScale={logScale}
                            aspectRatio={8} />
                    </div>
                </section>
                <section className={'spectra'}>
                    <h2>Spectrogram</h2>
                    <div className={'graph'}>
                        <div className={'position'} style={{ left: `${posLeft * 100}%`, display: posDisplay }} />
                        <FreqSpectra
                            audio={audio}
                            offset={selOffset}
                            extent={selExtent}
                            chunkSize={chunkSize}
                            resolution={resolution} />
                    </div>
                </section>
                <section className={'misc'}>
                    <h2>Sonstiges</h2>
                    <Settings
                        disabled={audioRunning}
                        chunkSizeExp={chunkSizeExp}
                        chunkSize={chunkSize}
                        maxChunkSizeExp={maxChunkSizeExp}
                        resolution={resolution}
                        maxResolution={maxResolution}
                        update={update} />
                    <div className={'buttons'}>
                        <p className={'button'}>
                            <button
                                className={'play'}
                                onClick={this.toggleAudio.bind(this)}>{playButtonLabel}
                            </button>
                        </p>
                        <p className={'button'}>
                            <button
                                className={'stop'}
                                onClick={this.stopAudio.bind(this)}>Stop
                            </button>
                        </p>
                        <p className={'button'}>
                            <button
                                className={'logscale'}
                                onClick={this.toggleLogScale.bind(this)}>{logScaleText}
                            </button>
                        </p>
                    </div>
                </section>
            </div>
        )
    }
}
