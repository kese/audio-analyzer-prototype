import React from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'

const d3svg = {

    create(el, data) {
        d3.select(el).append('path')
        if (data) this.render(el, data)
    },

    render(el, data) {
        const svg = d3.select(el)
        const h = data.length / 10
        const area = d3.svg.area()
            .x((d, i) => i)
            .y0(({ min }) => h * (1 + min) / 2)
            .y1(({ max }) => h * (1 - max) / 2)
            .interpolate("basis")(data)
        const path = svg.select('path')
            .attr('d', area)
            .style('stroke-width', '0')
            .style('fill', '#6D7E9F')
        const { x, width } = path.node().getBBox()
        svg.attr('viewBox', `${x} 0 ${width} ${h}`)
    }
}


export default class PeakLevelGraph extends React.Component {

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
