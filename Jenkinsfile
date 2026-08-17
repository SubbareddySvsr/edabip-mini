pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '312920516006'

        BACKEND_REPO = 'edabip-backend'
        FRONTEND_REPO = 'edabip-frontend'

        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'GitHub repository checkout successful'
            }
        }

        stage('Project Check') {
            steps {
                echo 'Checking EDABIP project structure'

                sh '''
                    echo "Current directory:"
                    pwd

                    echo "Project files:"
                    ls -la

                    echo "Backend:"
                    ls -la backend

                    echo "Frontend:"
                    ls -la frontend

                    echo "Infrastructure:"
                    ls -la infra
                '''
            }
        }

        stage('Docker Check') {
            steps {
                sh '''
                    echo "===== DOCKER VERSION ====="
                    docker --version

                    echo
                    echo "===== DOCKER ACCESS ====="
                    docker ps
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                    echo "===== BUILDING BACKEND IMAGE ====="

                    docker build \
                        -t ${ECR_REGISTRY}/${BACKEND_REPO}:${BUILD_NUMBER} \
                        ./backend

                    echo "Backend Docker image built successfully"
                '''
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                    echo "===== BUILDING FRONTEND IMAGE ====="

                    docker build \
                        -t ${ECR_REGISTRY}/${FRONTEND_REPO}:${BUILD_NUMBER} \
                        ./frontend

                    echo "Frontend Docker image built successfully"
                '''
            }
        }

        stage('ECR Login') {
            steps {
                sh '''
                    echo "===== LOGGING INTO AMAZON ECR ====="

                    aws ecr get-login-password \
                        --region ${AWS_REGION} | \
                    docker login \
                        --username AWS \
                        --password-stdin ${ECR_REGISTRY}

                    echo "ECR login successful"
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                    echo "===== PUSHING BACKEND IMAGE ====="

                    docker push \
                        ${ECR_REGISTRY}/${BACKEND_REPO}:${BUILD_NUMBER}

                    echo "Backend image pushed successfully"
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                    echo "===== PUSHING FRONTEND IMAGE ====="

                    docker push \
                        ${ECR_REGISTRY}/${FRONTEND_REPO}:${BUILD_NUMBER}

                    echo "Frontend image pushed successfully"
                '''
            }
        }

        stage('Verify ECR Images') {
            steps {
                sh '''
                    echo "===== BACKEND ECR IMAGE ====="

                    aws ecr describe-images \
                        --repository-name ${BACKEND_REPO} \
                        --region ${AWS_REGION} \
                        --query "imageDetails[].imageTags[]" \
                        --output table

                    echo
                    echo "===== FRONTEND ECR IMAGE ====="

                    aws ecr describe-images \
                        --repository-name ${FRONTEND_REPO} \
                        --region ${AWS_REGION} \
                        --query "imageDetails[].imageTags[]" \
                        --output table
                '''
            }
        }
    }

    post {
        success {
            echo '========================================='
            echo 'EDABIP CI PIPELINE SUCCESSFUL'
            echo 'Docker images built and pushed to ECR'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'EDABIP CI PIPELINE FAILED'
            echo 'Check the failed stage in Console Output'
            echo '========================================='
        }

        always {
            sh '''
                echo "===== DOCKER IMAGES ON JENKINS ====="
                docker images | head -20
            '''
        }
    }
}