pipeline {
    agent any
    stages{
        stage('Obtain Latest Version Number of Git Branch, and Store Into Variable') {
            steps {
                sh 'git_V_Num=$(git describe --tags)'
                echo git_V_Num
            }
        }
        stage('Run JS') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm install'
                    sh 'node main.js'
                }
            }
        }
        stage('Keep .html Artifacts'){
            steps {
                dir('GCS/articles') {
                    archiveArtifacts artifacts: '**/*.html'
                }
            }
        }
    }
}
