import Events from 'ampersand-events'

export default Object.assign(Events, {
    enhance(Class) {
        Object.assign(Class.prototype, this)
    }
})
