import mill._
import $ivy.`com.lihaoyi::mill-contrib-playlib:`,  mill.playlib._

object scalarestapiproduct extends PlayModule with SingleModule {

  def scalaVersion = "2.12.19"
  def playVersion = "2.8.13"
  def twirlVersion = "2.0.1"

  object test extends PlayTests
}
