FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    software-properties-common \
    wget \
    bsdmainutils \
    unzip \ 
    && rm -rf /var/lib/apt/lists/*

RUN add-apt-repository ppa:openjdk-r/ppa

RUN apt-get update

RUN apt-get install -y openjdk-8-jdk

RUN apt-get install -y libarchive-tools

RUN wget -q -O - https://github.com/JetBrains/kotlin/releases/download/v1.6.10/kotlin-compiler-1.6.10.zip | \
    bsdtar -xf - -C /usr/local/lib

RUN chmod +x /usr/local/lib/kotlinc/bin/kotlinc

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin:/usr/local/lib/kotlinc/bin

ENV GRADLE_VERSION=8.7
RUN wget -q https://services.gradle.org/distributions/gradle-$GRADLE_VERSION-bin.zip -P /tmp \
    && unzip -q /tmp/gradle-$GRADLE_VERSION-bin.zip -d /opt \
    && rm -rf /tmp/gradle-$GRADLE_VERSION-bin.zip

ENV PATH $PATH:/opt/gradle-$GRADLE_VERSION/bin

RUN mkdir -p ./lib
RUN wget -q https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.36.0.3/sqlite-jdbc-3.36.0.3.jar -P ./lib

WORKDIR /usr/local/lib/kotlinc/project

COPY HelloWorld.kt .
COPY build.gradle .

RUN gradle build --warning-mode all

CMD ["gradle", "runApplication", "--warning-mode", "all", "--debug"]
