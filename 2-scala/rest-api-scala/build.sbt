name := """rest-api-scala"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.13"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.0" % Test
libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick" % "3.3.2",
	"com.typesafe.slick" %% "slick-hikaricp" % "3.3.2",
)     
libraryDependencies += "org.xerial" % "sqlite-jdbc" % "3.34.0"
libraryDependencies += "com.typesafe.play" %% "play-slick-evolutions" % "4.0.2"
dependencyOverrides += "org.scala-lang.modules" %% "scala-xml" % "2.2.0"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
