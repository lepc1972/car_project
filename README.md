
# Car Showroom Front-end Application

## Overview   lepc

This repository contains the Car Showroom front-end application. For my application for a DevOps position at tanX.fi, I am using this project to demonstrate my skills in containerization, continuous integration/continuous deployment (CI/CD), and deployment on Kubernetes using Argo CD.

Since I am interested in a DevOps Engineer role and may not have expertise in building the specific application mentioned, I have utilized this sample application to effectively showcase my DevOps skills. I hope this approach is considered suitable.

## DevOps Skills Demonstration

### Containerization
- The application is containerized using Docker. I have created a Dockerfile to build the application image  to run the application locally in a containerized environment.
- The Docker image is pushed to Docker Hub for easy access and deployment.

### Continuous Integration/Continuous Deployment (CI/CD)
- I have set up a CI/CD pipeline using Jenkins. The pipeline includes stages for building the Docker image, running tests, and deploying the application using ArgoCD.
- The pipeline is triggered automatically on every commit to the repository, ensuring that the application is always in a deployable state.

### Deployment on Kubernetes using Argo CD
- The application is deployed on a Kubernetes cluster using Argo CD for continuous delivery.
- Argo CD automates the deployment process and ensures that the application is always up-to-date with the latest changes.
- Kubernetes manifests are used to define the deployment, service, and ingress resources required for the application.

## Repository Structure
- `Dockerfile`: Defines the steps to build the Docker image for the application.
- `Jenkinsfile`: Defines the CI/CD pipeline stages and steps.
- `manifests/`: Contains Kubernetes manifests for deploying the application on a Kubernetes cluster using Argo CD.

## Steps to Run Locally
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sujithsai08/car-showroom-frontend.git
   cd car-showroom-frontend
   ```

2. **Build and run the application**
   ```sh
   docker build -t carshowroom:1 .
   docker run -p 3001:3001 carshowroom:1 
   ```

## CI/CD Pipeline
The CI/CD pipeline defined in the `Jenkinsfile` includes the following stages:
1. **Build**: Builds the Docker image for the application.
2. **Test**: Runs tests to ensure the application is functioning correctly.
3. **Push**: Pushes the Docker image to Docker Hub.
4. **Deploy**: Deploys the application to the Kubernetes cluster using Argo CD.

## Deployment on Kubernetes and Additional Information
For more details about the project and the CI/CD pipeline, please read my blog [here](https://sujith08.hashnode.dev/end-to-end-cicd-project-using-jenkins-and-argocd).




## Conclusion
By utilizing the Car Showroom front-end application, I have demonstrated my ability to implement DevOps practices, including containerization, CI/CD pipelines, and Kubernetes deployment with Argo CD. This project showcases my skills in ensuring smooth deployment, scalability, and maintenance of applications and infrastructure.

# car_project
# car_project
# car_project
# car_project
