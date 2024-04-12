addSbtPlugin("org.playframework" % "sbt-plugin" % "3.0.2")
addSbtPlugin("org.foundweekends.giter8" % "sbt-giter8-scaffold" % "0.16.2")

resolvers += Resolver.mavenLocal
resolvers += Resolver.defaultLocal
resolvers += "Maven Central" at "https://repo1.maven.org/maven2/"
