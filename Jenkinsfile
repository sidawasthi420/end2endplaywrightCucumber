pipeline {
    agent any
    tools {
        nodejs 'node-lts'   // Make sure NodeJS is configured in Jenkins Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sidawasthi420/end2endplaywrightCucumber.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --reporter=html'
            }
        }
        stage('Archive Reports') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            junit 'test-results/*.xml' // if you configure Playwright to output JUnit XML
        }
        success {
            emailext (
                to: 'siddhantawasthi009@gmail.com',
                subject: "Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <html>
                <body>
                <p>Hello Team,</p>
                <p>The latest Jenkins build has completed successfully.</p>
                <p><b>Project Name:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> #${env.BUILD_NUMBER}</p>
                <p><b>Build Status:</b> <span style="color: green;"><b>SUCCESS</b></span></p>
                <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p><b>Playwright Report:</b> <a href="http://localhost:8080/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Playwright_20Report">Click here</a></p>
                <p>Best regards,<br><b>Automation Team</b></p>
                </body>
                </html>
                """,
                mimeType: 'text/html',
                attachLog: true
            )
        }
        failure {
            emailext (
                to: 'siddhantawasthi009@gmail.com',
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <html>
                <body>
                <p>Hello Team,</p>
                <p>The latest Jenkins build has <b style="color: red;">FAILED</b>.</p>
                <p><b>Project Name:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> #${env.BUILD_NUMBER}</p>
                <p><b>Build Status:</b> <span style="color: red;"><b>FAILED &#10060;</b></span></p>
                <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p>Please check the logs and take necessary actions.</p>
                <p><b>Playwright Report (if available):</b> <a href="http://localhost:8080/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Playwright_20Report">Click here</a></p>
                <p>Best regards,<br><b>Automation Team</b></p>
                </body>
                </html>
                """,
                mimeType: 'text/html',
                attachLog: true
            )
        }
    }
}
