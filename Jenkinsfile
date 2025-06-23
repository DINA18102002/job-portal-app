pipeline {
    agent any

    environment {
        IMAGE_NAME_BACKEND = 'theena18/job-portal-backend'
        IMAGE_NAME_FRONTEND = 'theena18/job-portal-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        GIT_REPO = 'https://github.com/DINA18102002/job-portal-app.git'
        GIT_CREDENTIALS = 'github-pat'
    }

    tools {
        maven 'Maven 3.9.10'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: "${GIT_CREDENTIALS}", url: "${GIT_REPO}", branch: 'main'
            }
        }

        stage('Maven Build - Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh "docker build --network=host -t ${IMAGE_NAME_BACKEND}:${IMAGE_TAG} backend"
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh '''
                        docker run --rm --network=host \
                        -v $PWD:/app -w /app/frontend node:20-alpine sh -c "
                            npm config set registry https://registry.npmjs.org && \
                            npm config set fetch-timeout 60000 && \
                            npm ci
                        "
                    '''
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh "docker build --network=host -t ${IMAGE_NAME_FRONTEND}:${IMAGE_TAG} -f frontend/Dockerfile frontend"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push theena18/job-portal-backend:$BUILD_NUMBER
                        docker push theena18/job-portal-frontend:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Update Kubernetes YAMLs') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${GIT_CREDENTIALS}", usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    sh '''
                        git config --global user.email "jenkins@theena.com"
                        git config --global user.name "jenkins"
                        git remote set-url origin https://${GIT_USER}:${GIT_TOKEN}@github.com/DINA18102002/job-portal-app.git

                        sed -i "s|image: .*job-portal-backend.*|image: theena18/job-portal-backend:$BUILD_NUMBER|" k8s/backend-deployment.yaml
                        sed -i "s|image: .*job-portal-frontend.*|image: theena18/job-portal-frontend:$BUILD_NUMBER|" k8s/frontend-deployment.yaml

                        git add k8s/backend-deployment.yaml k8s/frontend-deployment.yaml
                        git commit -m "Update images to tag $BUILD_NUMBER"
                        git push origin main
                    '''
                }
            }
        }

        stage('ArgoCD Deploy') {
            steps {
                sh '''
                    argocd login 172.26.98.203:32013 --username admin --password xMx-BrgevrPyDLU3 --insecure
                    
                    if ! argocd app get job-portal-app > /dev/null 2>&1; then
                        argocd app create job-portal-app \
                        --repo https://github.com/DINA18102002/job-portal-app.git \
                        --path k8s \
                        --dest-server https://kubernetes.default.svc \
                        --dest-namespace default \
                        --directory-recurse \
                        --sync-policy automated \
                        --upsert
                    fi

                    argocd app sync job-portal-app
                    argocd app wait job-portal-app --health --operation
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Build failed! Check Jenkins logs for details."
        }
        success {
            echo "✅ Build & GitOps deployment completed successfully!"
        }
    }
}
