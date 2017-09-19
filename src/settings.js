import { throttle } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'

export default class extends React.Component {

    updateChunkSize({ target: { valueAsNumber: chunkSizeExp }}) {
        this.props.update({ chunkSizeExp })
    }

    updateResolution({ target: { valueAsNumber: resolution }}) {
        this.props.update({ resolution })
    }

    render() {
        const { chunkSize, chunkSizeExp, maxChunkSizeExp } = this.props
        const { resolution, maxResolution } = this.props
        return (
            <div className={'settings'}>
                <p className={'setting'}>
                    <label htmlFor={'resolution'}>Resolution</label>
                    <input id={'resolution'}
                        onInput={this.updateResolution.bind(this)}
                        type={'range'}
                        min={2}
                        max={maxResolution}
                        defaultValue={resolution}
                        step={1}/>
                    <span className={'value'}>{resolution}</span>
                </p>
                <p className={'setting'}>
                    <label htmlFor={'chunkSize'}>Precision</label>
                    <input id={'chunkSize'}
                        onInput={this.updateChunkSize.bind(this)}
                        type={'range'}
                        min={0}
                        defaultValue={chunkSizeExp}
                        max={maxChunkSizeExp}
                        step={1}
                    />
                    <span className={'value'}>{chunkSize}</span>
                </p>
            </div>
        )
    }
}
