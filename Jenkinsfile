pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm config ls'
                    sh 'npm i --verbose markdown-it'
                }

                echo "Testing is over"
            }
        }
    }
}
