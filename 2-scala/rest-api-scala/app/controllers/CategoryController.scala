package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import services.CategoryService
import models.Category
import play.api.libs.json._

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents, categoryService: CategoryService) extends BaseController {

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getAllCategories() = Action {
    val categories = categoryService.getAllCategories()
    Ok(Json.toJson(categories))
  }

  def getCategoryById(id: Int) = Action {
    categoryService.getCategoryById(id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound
    }
  }
}
