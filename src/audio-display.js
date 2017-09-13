import { debounce, throttle } from 'lodash'
import React from 'react'
import AudioControls from './audio-controls'
import PeakLevelGraph from './peak-level-graph'
import RmsLevelGraph from './rms-level-graph'
import FreqSpectraGraph from './freq-spectra-graph'
import { PeakLevelsAnalyser, RmsLevelsAnalyser, FreqSpectraAnalyser } from './analyser'
import app from './app'

export default class AudioDisplay extends React.Component {

    constructor(props) {
        super(props)
        this.state = { params: {}, position: 0.0 }
    }

    componentWillMount() {
        const { audio } = this.props
        this.resetAudio(audio)
    }

    componentWillReceiveProps(props) {
        if (props.audio !== this.props.audio) this.resetAudio(props.audio)
    }

    resetAudio(audio) {
        const maxChunkSizeExp = Math.min(10, ~~Math.log2(audio.buffer.length / 2) - 1)
        const chunkSizeExp = Math.min(6, maxChunkSizeExp)
        const chunkSize = Math.pow(2, chunkSizeExp)
        const maxResolution = ~~(audio.buffer.length / 2)
        const resolution = Math.min(250, maxResolution)
        const maxZoom = Math.min(10, maxResolution / resolution)
        const zoom = 1.0
        const chunkCount = ~~(zoom * resolution)
        const extent = ~~resolution
        const params = {
            position: 0.0,
            chunkSize, chunkCount, extent,
            maxChunkSizeExp, chunkSizeExp,
            maxResolution, resolution,
            maxZoom, zoom

        }
        this.updateParams(params, audio)
    }

    updateParams(newParams, audio = this.props.audio) {
        const params = Object.assign(this.state.params, newParams)
        const {chunkSizeExp, zoom, resolution} = params
        const chunkSize = Math.pow(2, chunkSizeExp)
        const chunkCount = ~~(zoom * resolution)
        const opts = {
            channelMask: 3, chunkSize, chunkCount,
            dB: true, min: -100, max: 0
        }
        const peakLevelsAnalyser = new PeakLevelsAnalyser(audio, opts)
        const rmsLevelsAnalyser = new RmsLevelsAnalyser(audio, opts)
        const freqSpectraAnalyser = new FreqSpectraAnalyser(audio, opts)
        const state = {
            params, peakLevelsAnalyser, rmsLevelsAnalyser, freqSpectraAnalyser
        }
        this.updateData(state, audio)
    }

    updateData(state, audio = this.props.audio) {
        const { params, peakLevelsAnalyser, rmsLevelsAnalyser, freqSpectraAnalyser } = state
        const { chunkSizeExp, zoom, resolution, position } = params
        const chunkSize = Math.pow(2, chunkSizeExp)
        const chunkCount = ~~(zoom * resolution)
        const extent = ~~resolution
        const __offset = ~~(position * chunkCount / audio.buffer.duration)
        const offset = Math.min(chunkCount - extent, __offset)
        Promise.join(
                peakLevelsAnalyser.seq(offset, extent),
                rmsLevelsAnalyser.seq(offset, extent),
                freqSpectraAnalyser.seq(offset, extent))
            .then(data => this.setState(Object.assign(state, { data })))
    }


    updatePosition({ target: { valueAsNumber: position }}) {
        const params = Object.assign(this.state.params, { position })
        const state = Object.assign(this.state, { params })
        requestAnimationFrame(() => this.updateData(state))

    }

    render() {
        const { audio } = this.props
        const { data, params } = this.state
        if (!data) return (<div/>)
        const [peakLevels, rmsLevels, freqSpectra ] = data
        return (
            <div className={'display'}>
                <AudioControls
                    audio={audio}
                    params={params}
                    updateParams={this.updateParams.bind(this)}
                />
                <p className={'position'}>
                    <label htmlFor={'position'}>Position</label>
                    <input id={'position'}
                        onInput={throttle(this.updatePosition.bind(this), 1000)}
                        type={'range'}
                        min={0.0}
                        max={audio.buffer.duration}
                        defaultValue={params.position}
                        step={0.01}/>
                    <span className={'value'}>{params.position}</span>
                </p>
                <section>
                    <h1>Peak-Levels</h1>
                    <PeakLevelGraph data={peakLevels} />
                </section>
                <section>
                    <h1>RMS-Levels</h1>
                    <RmsLevelGraph data={rmsLevels} />
                </section>
                <section>
                    <h1>Frequency Spectra</h1>
                    <FreqSpectraGraph data={freqSpectra} />
                </section>
            </div>
        )
    }
}
