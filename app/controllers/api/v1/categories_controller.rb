class Api::V1::CategoriesController < Api::BaseController
  def index
    categories = Category.all
    render json: {
      "categories": categories
    }, status: 200
  end
end
