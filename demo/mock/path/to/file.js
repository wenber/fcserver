module.exports = exports = function (param) {
    return {
        status: 200,
        data: {
            list: param.param1
        },
        error: null
    }
};