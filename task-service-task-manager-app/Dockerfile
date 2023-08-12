FROM maven:3.8-jdk-11 AS maven_build

LABEL MAINTAINER="gyovanne"

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN mvn package


FROM adoptopenjdk/openjdk11:alpine-jre

ARG JAR_FILE=task-service-task-manager-app.jar

WORKDIR /opt/app

COPY --from=maven_build /usr/src/app/target/${JAR_FILE} /opt/app/

# ADD ./entrypoint.sh /opt/app/entrypoint.sh

ENTRYPOINT ["java","-jar","task-service-task-manager-app.jar"]
# ENTRYPOINT ["sh","./entrypoint.sh"]
