# -------- Build Stage --------
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copy only relevant files to avoid conflict with system directories like /bin
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# -------- Runtime Stage --------
FROM openjdk:17.0.1-jdk-slim

WORKDIR /app
COPY --from=build /app/target/JobPortal-0.01-SNAPSHOT.jar JobPortal.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "JobPortal.jar"]
