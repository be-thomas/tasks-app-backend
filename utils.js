
module.exports = {
    is_string(s) {
        return typeof s === 'string' || s instanceof String
    },

    is_boolean(b) {
        return typeof b == "boolean"
    },

    is_array(arr) {
        return Array.isArray(arr)
    },

    is_integer(n) {
        return Number.isInteger(n)
    }
}
