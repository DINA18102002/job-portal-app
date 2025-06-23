pipeline {
    agent any

    environment {
        IMAGE_NAME_BACKEND = 'theena18/job-portal-backend'
        IMAGE_NAME_FRONTEND = 'theena18/job-portal-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    }

    tools {
        maven 'Maven 3.9.10'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github-pat', url: 'https://github.com/DINA18102002/job-portal-app.git', branch: 'main'
            }
        }

        stage('Maven Build') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Frontend Build') {
            agent {
                docker{
                    image 'node:18-alpine'
                }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME_BACKEND}:${IMAGE_TAG} ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME_FRONTEND}:${IMAGE_TAG} ./frontend"
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
                withCredentials([usernamePassword(credentialsId: 'github-pat', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    sh '''
                        git config --global user.email "jenkins@theena.com"
                        git config --global user.name "jenkins"
                        git remote set-url origin https://${GIT_USER}:${GIT_TOKEN}@github.com/YOUR_USERNAME/job-portal-app.git

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
                        --repo https://github.com/YOUR_USERNAME/job-portal-app.git \
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
