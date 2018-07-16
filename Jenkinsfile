pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                sh 'pwd'
                sh 'ls'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm i --verbose markdown-it'
                }
                sh 'pwd'
                sh 'ls'
                echo "Testing is over"
            }
        }
    }
}
