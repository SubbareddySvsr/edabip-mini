pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'GitHub repository checkout successful'
            }
        }

        stage('Project Check') {
            steps {
                echo 'EDABIP project found successfully'

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

        stage('CI Test') {
            steps {
                echo 'EDABIP CI pipeline is working successfully!'
            }
        }
    }
}