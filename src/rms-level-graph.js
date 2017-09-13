import React from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import fft from 'fft'

const d3svg = {

    create(el, data) {
        d3.select(el).append('path')
        if (data) this.render(el, data)
    },

    render(el, data) {
        const h = data.length / 10
        const line = d3.svg.line()
            .x((d, i) => i)
            .y(d => h * (1 - d))
            .interpolate("basis")(data)

        const svg = d3.select(el)
        const path = svg.select('path').attr('d', line)
        const { x, width } = path.node().getBBox()
        path.style('stroke-width', '0.2')
        svg.attr('viewBox', `${x} 0 ${width} ${h}`)
    }
}

export default class RmsLevelGraph extends React.Component {
    shouldComponentUpdate(props, state) {
        return props.data !== this.props.data
    }

    componentDidMount() {
        d3svg.create(ReactDOM.findDOMNode(this), this.props.data)
    }

    componentDidUpdate() {
        d3svg.render(ReactDOM.findDOMNode(this), this.props.data)
    }

    render() {
        return (<svg></svg>)
    }
}
