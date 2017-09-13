import { debounce, throttle, defer } from 'lodash'
import React from 'react'
import app from './app'

export default class AudioControls extends React.Component {

    updateChunkSizeExp({ target: { valueAsNumber: newChunkSizeExp }}) {
        const { audio, params, updateParams } = this.props
        const { chunkSizeExp, maxResolution, resolution, maxZoom, zoom } = params
        const newChunkSize = Math.pow(2, newChunkSizeExp)
        const newMaxResolution = ~~(audio.buffer.length / 2)
        const newResolution = Math.min(1000, newMaxResolution * resolution / maxResolution)
        const newMaxZoom = Math.min(10.0, newMaxResolution / newResolution)
        const newZoom = Math.max(1.0, zoom * newMaxZoom / maxZoom)
        requestAnimationFrame(() => updateParams({
            chunkSizeExp: newChunkSizeExp,
            maxResolution: newMaxResolution, resolution: newResolution,
            maxZoom: newMaxZoom, zoom: newZoom
        }))
    }

    updateResolution({ target: { valueAsNumber: newResolution }}) {
        const { params, updateParams } = this.props
        const { resolution, maxResolution, maxZoom, zoom, chunkSizeExp } = params
        const chunkSize = Math.pow(2, chunkSizeExp)
        const newMaxZoom = Math.min(10.0, maxResolution / newResolution)
        const newZoom = Math.max(1.0, zoom * newMaxZoom / maxZoom)
        requestAnimationFrame(() => updateParams({
            resolution: newResolution,
            maxZoom: newMaxZoom, zoom: newZoom
        }))
    }

    updateZoom({ target: { valueAsNumber: newZoom }}) {
        const { params, updateParams } = this.props
        const { chunkSizeExp, resolution } = params
        const chunkSize = Math.pow(2, chunkSizeExp)
        requestAnimationFrame(() => updateParams({ zoom: newZoom }))
    }

    render() {
        const { audio, params } = this.props
        const { maxChunkSizeExp, chunkSizeExp, resolution } = params
        const { maxResolution, zoom, maxZoom } = params

        const chunkSize = Math.pow(2, chunkSizeExp)
        const maxResolutionClipped = Math.min(1000, maxResolution)

        return (
            <div className={'controls'}>
                <p className={'option'}>
                    <label htmlFor={'chunkSize'}>ChunkSize</label>
                    <input id={'chunkSize'}
                        onInput={throttle(this.updateChunkSizeExp.bind(this), 1000)}
                        type={'range'}
                        min={0}
                        defaultValue={chunkSizeExp}
                        max={maxChunkSizeExp}
                        step={1}
                    />
                    <span className={'value'}>{chunkSize}</span>
                </p>
                <p className={'option'}>
                    <label htmlFor={'resolution'}>Resolution</label>
                    <input id={'resolution'}
                        onInput={throttle(this.updateResolution.bind(this), 1000)}
                        type={'range'}
                        min={2}
                        max={maxResolutionClipped}
                        defaultValue={resolution}
                        step={1}/>
                    <span className={'value'}>{resolution}</span>
                </p>
                <p className={'option'}>
                    <label htmlFor={'zoom'}>Zoom</label>
                    <input id={'zoom'}
                        onInput={throttle(this.updateZoom.bind(this), 1000)}
                        type={'range'}
                        min={1.0}
                        max={maxZoom}
                        defaultValue={zoom}
                        step={0.1}/>
                    <span className={'value'}>{zoom}</span>
                </p>
            </div>
        )
    }
}
