pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm config ls'
                }

                echo "Testing is over"
            }
        }
    }
}
