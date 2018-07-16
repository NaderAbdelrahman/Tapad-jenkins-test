pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                nodejs('Node 10') {
                    console.log("hello");
                }

                echo "Testing is over"
            }
        }
    }
}
