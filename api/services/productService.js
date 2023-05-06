const ProductRepo = require("../repository/productRepo");

class productService {
  constructor() {
    this.productrepo = new ProductRepo();
  }

  async listItem(data) {
    try {
      const response = await this.productrepo.Create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteItem(id) {
    try {
      const response = await this.productrepo.Delete(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async UpdateItem(id, product) {
    try {
      const response = await this.productrepo.Update(id, product);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetItem(id) {
    try {
      const response = await this.productrepo.Get(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetItems(query) {
    try {
      const response = await this.productrepo.GetAll(query);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async createReview(data) {
    try {
      const { params, body, user } = data;

      const productId = params.id;
      const { name, _id } = user;
      const { rating, comment } = body;
      const review = {
        user: _id,
        name,
        rating: Number(rating),
        comment,
      };

      const product = await this.productrepo.Get(productId);
      if (!product) throw new Error("No product is found");
      const isReviewed = product.reviews.findIndex(
        (review) => review.user.toString() == _id.toString()
      );

      console.log(isReviewed, "isreviewed");
      if (isReviewed != -1) {
        product.reviews[isReviewed] = review;
      } else {
        console.log("inside else");
        product.reviews.push(review);
      product.numOfReviews = product.reviews.length;

      }
      const denominator = product.ratings ? 2 : 1;
      console.log(denominator, "denominator");
      product.ratings = (
        (product.ratings + Number(rating)) /
        denominator
      ).toFixed(1);
      await product.save({ validateBeforeSave: false });

      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = productService;
