import { range } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import chroma from 'chroma-js'

const COLORCOUNT = 1024
/*const colorScale = new chroma.scale(['darkcyan', 'darkgreen', 'green', 'yellow', 'red']).out('hex')*/
const colorScale = new chroma.scale(['black', 'red', 'yellow', 'white']).out('hex')
const colors = range(COLORCOUNT).map(i => colorScale(i/COLORCOUNT))

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

export default class SpectroGraph extends React.Component {

    shouldComponentUpdate(props, state) {
        return props.data !== this.props.data
    }

    renderCanvas() {
        const { data } = this.props
        const canvas = ReactDOM.findDOMNode(this)
        const context = canvas.getContext('2d')

        canvas.setAttribute('width', data.length)
        canvas.setAttribute('height', data[0].length)

        data.forEach((spectrum, i) => {
            spectrum.forEach((mag, j) => {
                const value = Math.min(COLORCOUNT, ~~(mag * COLORCOUNT))
                context.fillStyle = colors[value]
                context.fillRect(i, data[0].length - j, 1, 1)
            })
        })

        blur (canvas, context, 6)
    }

    componentDidMount() { this.renderCanvas() }

    componentDidUpdate() { this.renderCanvas() }

    render() {
        return (<canvas></canvas>)
    }
}
