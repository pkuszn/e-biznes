FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    software-properties-common \
    wget \
    bsdmainutils \
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

RUN java -version
RUN kotlinc -version

CMD ["/bin/bash"]