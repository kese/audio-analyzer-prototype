import { throttle, debounce, extend } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import d3 from '../vendor/d3'
import { RmsLevelsAnalyser } from './analyser'

function line(height, data) {
    return d3.svg.line()
        .x((d, i) => i)
        .y(d => height * (1 - d))
        .interpolate("basis")(data)
}

function area(height, data) {
    return d3.svg.area()
        .x((d, i) => i)
        .y0(d => height)
        .y1(d => height * (1 - d))
        .interpolate("basis")(data)
}

function pathData(height, data, fill = false) {
    return (fill ? area : line)(height, data)
}

export default class RmsLevels extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.updateData = throttle(this.__updateData, 50)
    }

    height({ resolution, aspectRatio }) {
        return resolution / aspectRatio
    }

    __updateData(props) {
        const analyser = this.analyserForProps(props)
        const { offset, resolution } = props
        const start = ~~(offset * analyser.params.chunkCount)
        const data = analyser.seq(start, resolution)
        this.setState({ analyser, data })
    }

    analyserForProps(props) {
        const { audio, chunkSize, resolution, extent, logScale } = props
        const chunkCount = ~~(resolution / extent)
        const { analyser } = this.state
        if (analyser && analyser.chunkCount === chunkCount && logScale === analyser.dB) return analyser
        const scale = logScale ? { dB: true, min: -100, max: 0 } : { dB: false, min: 0, max: 1}
        const params = extend(scale, { chunkSize, chunkCount, channelMask: 3 })
        return new RmsLevelsAnalyser(audio, params)
    }

    updatePath(data) {
        const svg = d3.select(ReactDOM.findDOMNode(this))
        const height = this.height(this.props)
        const path = svg.select('path')
            .attr('d', pathData(height, data, this.props.fill))
        const { x, width } = path.node().getBBox()
        svg.attr('viewBox', `${x} 0 ${width} ${height}`)
    }

    componentWillMount() {
        this.updateData(this.props)
    }

    componentDidMount() {
        this.state.data.then(data => this.updatePath(data))
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps)
    }

    componentDidUpdate() {
        this.state.data.then(data => this.updatePath(data))
    }

    shouldComponentUpdate(props, state) {
        return state.data !== this.state.data
    }

    render() { return (<svg preserveAspectRatio="none" width="100%"><path/></svg>) }
}
