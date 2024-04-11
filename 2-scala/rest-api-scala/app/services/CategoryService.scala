package services

import javax.inject._
import models.Category
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json._
import slick.jdbc.SQLiteProfile.api._
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CategoryService @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
    private val db = dbConfigProvider.get.db

    class CategoryTable(tag: Tag) extends Table[Category](tag, "category") {
        def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
        def name = column[String]("name")
        def * = (id, name) <> ((Category.apply _).tupled, Category.unapply)
    }

    val categories = TableQuery[CategoryTable]

    def getAllCategories(): Future[Seq[Category]] = {
        db.run(categories.result)
    }

    def getCategoryById(id: Int): Future[Option[Category]] = {
        db.run(categories.filter(_.id === id).result.headOption)
    }
}