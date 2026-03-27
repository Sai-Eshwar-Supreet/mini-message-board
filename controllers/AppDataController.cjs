const { PORT, TITLE } = require("../models/AppData.cjs")

module.exports = {getAppData: () => ({PORT, TITLE}) }