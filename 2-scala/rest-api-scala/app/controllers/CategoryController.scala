package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import models.Category
import play.api.libs.json._
import scala.collection.mutable.ListBuffer

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val categories: ListBuffer[Category] = ListBuffer(
    Category(1, "Czarna herbata"),
    Category(2, "Zielona herbata"),
    Category(3, "Herbata owocowa"),
    Category(4, "Herbata ziołowa"),
    Category(5, "Pu-erh"),
    Category(6, "Oolong"),
    Category(7, "Biała herbata")
  )

  implicit val categoryWrites: Writes[Category] = Json.writes[Category]
  implicit val categoryReads: Reads[Category] = Json.reads[Category]


  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getAllCategories() = Action {
    Ok(Json.toJson(categories))
  }

  def GetCategoryByID(id: Int) = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound
    }
  }

  def addCategory() = Action(parse.json) { request =>
    request.body.validate[Category].map { category =>
      val newCategoryId = categories.map(_.id).max + 1
      categories += category.copy(id = newCategoryId)
      Created(Json.toJson(category))
    }.getOrElse(BadRequest("Invalid category JSON"))
  }

  def updateCategory(id: Int) = Action(parse.json) { request =>
    request.body.validate[Category].map { updatedCategory =>
      categories.indexWhere(_.id == id) match {
        case idx if idx >= 0 =>
          categories.update(idx, updatedCategory)
          Ok(Json.toJson(updatedCategory))
        case _ => NotFound
      }
    }.getOrElse(BadRequest("Invalid category JSON"))
  }

  def deleteCategory(id: Int) = Action {
    categories.indexWhere(_.id == id) match {
      case idx if idx >= 0 =>
        categories.remove(idx)
        Ok("Category deleted")
      case _ => NotFound
    }
  }
}
