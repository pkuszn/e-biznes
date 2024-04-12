package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import java.time.LocalDate
import models.Purchase
import play.api.libs.json._
import scala.collection.mutable.ListBuffer

@Singleton
class PurchaseController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val purchases: ListBuffer[Purchase] = ListBuffer(
    Purchase(1, 1, 101, 10.99, 2, LocalDate.parse("2024-04-10"), 1, 1),
    Purchase(2, 2, 102, 12.50, 1, LocalDate.parse("2024-04-09"), 2, 2),
    Purchase(3, 3, 103, 9.99, 3, LocalDate.parse("2024-04-08"), 1, 1),
    Purchase(4, 4, 104, 8.75, 1, LocalDate.parse("2024-04-07"), 2, 3),
    Purchase(5, 5, 105, 11.25, 2, LocalDate.parse("2024-04-06"), 1, 2),
    Purchase(6, 6, 106, 15.99, 1, LocalDate.parse("2024-04-05"), 2, 1),
    Purchase(7, 7, 107, 14.50, 3, LocalDate.parse("2024-04-04"), 1, 3)
  )

  implicit val purchaseWrites: Writes[Purchase] = Json.writes[Purchase]
  implicit val purchaseReads: Reads[Purchase] = Json.reads[Purchase]

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getAllPurchases() = Action {
    Ok(Json.toJson(purchases))
  }

  def getPurchaseById(id: Long) = Action {
    purchases.find(_.id == id) match {
      case Some(purchase) => Ok(Json.toJson(purchase))
      case None => NotFound
    }
  }

  def addPurchase() = Action(parse.json) { request =>
    request.body.validate[Purchase].map { purchase =>
      val newPurchaseId = purchases.map(_.id).max + 1
      purchases += purchase.copy(id = newPurchaseId)
      Created(Json.toJson(purchase))
    }.getOrElse(BadRequest("Invalid purchase JSON"))
  }

  def updatePurchase(id: Long) = Action(parse.json) { request =>
    request.body.validate[Purchase].map { updatedPurchase =>
      purchases.indexWhere(_.id == id) match {
        case idx if idx >= 0 =>
          purchases.update(idx, updatedPurchase)
          Ok(Json.toJson(updatedPurchase))
        case _ => NotFound
      }
    }.getOrElse(BadRequest("Invalid purchase JSON"))
  }

  def deletePurchase(id: Long) = Action {
    purchases.indexWhere(_.id == id) match {
      case idx if idx >= 0 =>
        purchases.remove(idx)
        Ok("Purchase deleted")
      case _ => NotFound
    }
  }
}
