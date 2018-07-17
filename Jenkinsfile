pipeline {
    agent any
    stages{
        stage('Execute Install Node Packages, and Run Script') {
            steps {

                echo "We have begun testing"
                sh 'node -v'
                sh 'ls'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm i --verbose markdown-it'
                    sh 'npm i --verbose fs'
                    sh 'node main.js'
                }
                archiveArtifacts artifacts: '*.html'
                echo "the output html file is in the artifacts tab for your viewing pleasure"
                echo "Testing is over"
            }
        }
        stage('Upload rendered html file to GCS') {
            steps {
                googleStorageUpload bucket: 'gs://scratch.frontend-stg.tapad.com', credentialsId: 'Tapad Registry', pattern: '*.html'
            }
        }
    }
}
