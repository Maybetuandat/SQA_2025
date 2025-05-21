const { getStatisticById } = require('../services/statistic.service')


//maybetuandat
const getStatisticsHandler = async (req, res) => {
    const id = req.params.id;
    var statistic = await getStatisticById(id)
    if (statistic.status === 200) {
        const response = {
            code: 1,
            status: 200,
            message: "successfully",
            data: statistic.data
        };

        res.status(200).json(response);
    }
    else if (statistic.status === 404) {
        const response = {
            code: 0,
            status: 404,
            message: "Không tìm thấy thống kê",
        };
        res.status(404).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 500,
            message: "Lỗi hệ thống",
        };
        res.status(500).json(response);
    }
}

module.exports = { getStatisticsHandler }