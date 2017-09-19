import { range, throttle } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import chroma from 'chroma-js'
import { FreqSpectraAnalyser } from './analyser'

const colorCount = 1024
/*const colorScale = new chroma.scale(['darkcyan', 'darkgreen', 'green', 'yellow', 'red']).out('hex')*/
const colorScale = new chroma.scale(['black', 'red', 'yellow', 'white']).out('hex')
const colors = range(colorCount).map(i => colorScale(i / colorCount))

function blur(canvas, context, passes) {
  passes = passes || 4;
  context.globalAlpha = 0.0625;
  for (let i = 1; i <= passes; i++) {
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
          context.drawImage(canvas, x, y);
      }
    }
  }
  context.globalAlpha = 1.0;
}

export default class FreqSpectra extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.updateData = throttle(this.__updateData, 50)
    }

    __updateData(props) {
        const analyser = this.analyserForProps(props)
        const { offset, resolution, aspectRatio } = props
        const start = ~~(offset * analyser.params.chunkCount)
        const data = analyser.seq(start, resolution)
        this.setState({ analyser, data })
    }

    updateCanvas(data) {
        const canvas = ReactDOM.findDOMNode(this)
        const context = canvas.getContext('2d')
        canvas.setAttribute('width', data.length)
        canvas.setAttribute('height', data[0].length)
        data.forEach((spectrum, i) => {
            spectrum.forEach((magnitude, j) => {
                context.fillStyle = colors[~~(magnitude * colorCount)]
                context.fillRect(i, data[0].length - j, 1, 1)
            })
        })
        blur (canvas, context)
    }

    analyserForProps(props) {
        const { audio, chunkSize, resolution, extent } = props
        const chunkCount = ~~(resolution / extent)
        const { analyser } = this.state
        if (analyser && analyser.chunkCount === chunkCount) return analyser
        return new FreqSpectraAnalyser(audio, {
            chunkSize, chunkCount, channelMask: 3, dB: true, min: -100, max: 0
        })
    }

    shouldComponentUpdate(props, state) {
        return state.data !== this.state.data
    }

    componentWillMount() { this.updateData(this.props) }

    componentDidMount() {
        this.state.data.then(data => this.updateCanvas(data))
    }

    componentWillReceiveProps(props) { this.updateData(props) }

    componentDidUpdate() {
        this.state.data.then(data => this.updateCanvas(data))
    }

    render() { return (<canvas/>) }
}
