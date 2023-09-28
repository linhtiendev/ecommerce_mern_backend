const ProductService = require("../services/ProductService");

// hàm xử lý tạo sản phẩm
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } =
            req.body;
        // check input
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "error",
                message: "Input is required",
            });
        }
        // nếu k rơi vào case lỗi thì sẽ gọi đến service
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

// hàm xử lý sửa sản phẩm
const updateProduct = async (req, res) => {
    try {
        // hàm lấy id từ req
        const productId = req.params.id;
        // hàm nhận dl từ req
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: "ERROR",
                message: "Product id is required",
            });
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
};