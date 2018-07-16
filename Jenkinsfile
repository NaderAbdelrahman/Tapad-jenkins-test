pipeline {

    currentBuild.result = "SUCCESS YEE"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Test') {
            echo "We have begun testing"

            env.NODE_ENC = "test"

            sh 'node -v'
            sh 'npm install'
            sh 'npm test'

            echo "Testing is over"
        }

    }
    catch (err) {

            currentBuild.result = "FAILURE"

            throw err

    }

}
