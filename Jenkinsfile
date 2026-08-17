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
                bat 'dir'
            }
        }

        stage('CI Test') {
            steps {
                echo 'EDABIP CI pipeline is working successfully!'
            }
        }
    }
}
