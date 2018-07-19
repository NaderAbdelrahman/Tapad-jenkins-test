pipeline {
    agent any
    environment {
        GITBRANCHVER = sh (
            script: 'git describe --tags',
            returnStdout: true
        ).trim()
    }
    stages{
        stage('Run JS') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm install'
                    sh 'node main.js GITBRANCHVER'
                }
            }
        }
        stage('Keep .html & .json Artifacts'){
            steps {
                dir('GCS/articles') {
                    archiveArtifacts artifacts: '**/*.html'
                }
                dir('GCS/metadata') {
                    archiveArtifacts artifacts: '**/*.json'
                }
            }
        }
    }
}
