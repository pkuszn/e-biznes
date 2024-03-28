FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y python3.8 && \
    apt-get install -y python3-pip && \
    apt-get clean

RUN ln -s /usr/bin/python3.8 /usr/bin/python

RUN pip3 install pipenv

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

WORKDIR /app

COPY . /app

CMD ["bash"]