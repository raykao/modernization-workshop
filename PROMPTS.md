# Java Modernization - Sample Prompts

1. The "Pre-Flight" Check - Assessment & Compatibility

```markdown
Review this legacy Java 8 class. Identify deprecated libraries and suggest modern alternatives (e.g., replacing `java.util.Date` with `java.time`). Focus on improving thread safety and reducing memory overhead for a containerized environment.
```
---

```markdown
Act as a Senior Java Architect. Analyze this `pom.xml` file and identify all dependencies that are incompatible with Java 17 and Spring Boot 3. For each conflict, suggest the most stable version and note if any breaking API changes require manual refactoring.
```
---


2. Refactoring & Logic

```markdown
Convert this imperative `for-loop` logic into Java Streams API. Ensure the code remains readable for a maintainer who may be more familiar with Java 8. Add Javadoc comments explaining the transformation.
```
---

```markdown
Refactor this code to migrate from javax. to jakarta. namespaces** for Jakarta EE 10 compatibility. Update any related persistence or validation annotations accordingly.
```
---


3. Containerization

```markdown
Generate a multi-stage Dockerfile for this Maven-based Spring Boot application. Use an Eclipse Temurin JRE on Alpine Linux as the base image to minimize the attack surface. Ensure the application runs as a non-root user to comply with university security standards.
```
---


4. Infrastructure as Code & CI/CD

```markdown
Generate an Azure Bicep template to deploy this containerized app to Azure Container Apps. Include a Log Analytics workspace for monitoring and set up an ingress for public traffic on port 8080. Ensure the scaling rules are set to 0 when idle to save departmental budget.
```
---

```markdown
Create a GitHub Actions workflow (.yml) that builds this Java project using Maven, builds a Docker image, pushes it to Azure Container Registry, and deploys it to Azure Container Apps. Use environment secrets for all credentials.
```
---