FROM maven:3.8-jdk-11 AS maven_build

ARG PROFILE
ARG ADDITIONAL_OPTS

ENV PROFILE=${PROFILE}
ENV ADDITIONAL_OPTS=${ADDITIONAL_OPTS}

LABEL MAINTAINER="gyovanne"

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN mvn package


FROM adoptopenjdk/openjdk11:alpine-jre

ARG JAR_FILE=task-service-task-manager-app.jar

WORKDIR /opt/app

COPY --from=maven_build /usr/src/app/target/${JAR_FILE} /opt/app/

#ADD ./entrypoint.sh /opt/app/entrypoint.sh

EXPOSE 4001
EXPOSE 5005

#CMD java ${ADDITIONAL_OPTS} -jar task-service-task-manager-app.jar --spring.profiles.active=${PROFILE}
ENTRYPOINT ["java","-jar","task-service-task-manager-app.jar"]
#ENTRYPOINT ["sh","./entrypoint.sh"]
