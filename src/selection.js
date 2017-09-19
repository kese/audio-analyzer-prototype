import React from 'react'
import ReactDOM from 'react-dom'
import interact from 'interact.js'

export default class Selection extends React.Component {

    componentDidMount() {
        interact(ReactDOM.findDOMNode(this))
            .draggable({})
            .resizable({
                edges: { left: true, right: true }
            })
            .on('dragmove', ({ target: el, dx }) => {
                const delta = dx / el.parentNode.offsetWidth
                const { offset, extent } = this.props
                const selOffset = Math.max(0.0, Math.min(1 - extent, offset + delta))
                this.props.update({ selOffset })
            })
            .on('resizemove', ({ target: el, rect }) => {
                const { offset, minExtent } = this.props
                const parent = el.parentNode.getBoundingClientRect()
                const left = Math.max(0, rect.left)
                const width = Math.min(rect.right, parent.right) - left
                const selExtent = width / parent.width
                if (selExtent < minExtent) return
                const selOffset = left / parent.width
                this.props.update({ selOffset, selExtent })
            })
    }

    // invoked on incoming props after initial rendering happened;
    // setState allowed and not triggering additional call to render()
    componentWillReceiveProps(nextProps) {
        const { minExtent, extent, offset } = nextProps
        if (minExtent <= extent) return
        const el = ReactDOM.findDOMNode(this)
        const selOffset = Math.min(1 - minExtent, offset)
        this.props.update({ selOffset, selExtent: minExtent })
    }

    // invoked after setState, before rendering; setState not allowed
    componentWillUpdate(nextProps, nextState) { }

    // invoked just after updates are flushed to DOM
    componentDidUpdate(prevProps, prevState) { }

    render() {
        const { offset, extent, minExtent } = this.props
        const left = `${offset * 100}%`
        const width = `${extent * 100}%`
        const minWidth = `${minExtent * 100}%`
        return (<div className={'selection'} style={{ left, width, minWidth }} />)
    }
}
