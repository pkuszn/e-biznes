package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import java.time.LocalDate
import models.Product
import play.api.libs.json._
import scala.collection.mutable.ListBuffer

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val products: ListBuffer[Product] = ListBuffer(
    Product(1, "Earl Grey", 1, 10.99, LocalDate.parse("2024-04-10"), available = true),
    Product(2, "Jasmine Green Tea", 2, 12.50, LocalDate.parse("2024-04-09"), available = true),
    Product(3, "Chamomile", 3, 9.99, LocalDate.parse("2024-04-08"), available = true),
    Product(4, "Peppermint", 4, 8.75, LocalDate.parse("2024-04-07"), available = true),
    Product(5, "Darjeeling", 1, 11.25, LocalDate.parse("2024-04-06"), available = true),
    Product(6, "Matcha", 2, 15.99, LocalDate.parse("2024-04-05"), available = true),
    Product(7, "Oolong", 3, 14.50, LocalDate.parse("2024-04-04"), available = true)
  )

  implicit val productWrites: Writes[Product] = Json.writes[Product]
  implicit val productReads: Reads[Product] = Json.reads[Product]

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getAllProducts() = Action {
    Ok(Json.toJson(products))
  }

  def getProductById(id: Long) = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound
    }
  }

  def addProduct() = Action(parse.json) { request =>
    request.body.validate[Product].map { product =>
      val newProductId = products.map(_.id).max + 1
      products += product.copy(id = newProductId)
      Created(Json.toJson(product))
    }.getOrElse(BadRequest("Invalid product JSON"))
  }

  def updateProduct(id: Long) = Action(parse.json) { request =>
    request.body.validate[Product].map { updatedProduct =>
      products.indexWhere(_.id == id) match {
        case idx if idx >= 0 =>
          products.update(idx, updatedProduct)
          Ok(Json.toJson(updatedProduct))
        case _ => NotFound
      }
    }.getOrElse(BadRequest("Invalid product JSON"))
  }

  def deleteProduct(id: Long) = Action {
    products.indexWhere(_.id == id) match {
      case idx if idx >= 0 =>
        products.remove(idx)
        Ok("Product deleted")
      case _ => NotFound
    }
  }
}

