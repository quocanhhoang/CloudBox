function checkHealth(req, res) {
    res.status(200).json({
        success: true,
        message: "CloudBox API is running!",
    });
}

module.exports = { checkHealth };