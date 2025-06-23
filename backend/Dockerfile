# ---- Build Stage ----
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# ---- Runtime Stage ----
FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=build /app/target/Job-Portal-0.0.1-SNAPSHOT.jar JobPortal.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "JobPortal.jar"]
