FROM maven:3.8.5-openjdk-17 AS build

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=build /target/JobPortal-0.01-SNAPSHOT.jar JobPortal.jar

EXPOSE 9090

ENTRYPOINT ["java","-jar","JobPortal.jar"]


