pipeline {
    agent any
    stages{
        stage('Branch Ver Num') {
            steps {
                sh 'git_V_Num=$(git describe --tags)'
                sh 'echo git_V_Num'
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
