# DevCraftsMan
Try out the application at: http://152.70.64.98/

[![Blinking LEDs](http://img.youtube.com/vi/aTLsB5ZAysc/0.jpg)](http://www.youtube.com/watch?v=aTLsB5ZAysc "Application")

## Inspiration
Developers often face challenges in understanding the usage patterns and performance characteristics of their code, and may also struggle to identify and fix errors in their codebase. This can lead to inefficiencies, errors, and bugs in the software. Therefore, there is a need for a tool that can assist developers in tracking data metrics, visualizing them, and generating summaries of code snippets. Additionally, such a tool should be able to identify bugs and measure the complexity of the code. By providing developers with these capabilities, DevCraftsman aims to address these challenges by providing a suite of features that can assist developers in identifying bugs, visualizing data metrics, and understanding the code. It can help improve the quality, performance, and maintainability of their codebase, ultimately resulting in better software solutions.

## What it does
DevCraftsman is a tool designed to help code developers improve the quality, performance, and maintainability of their software. Many developers struggle with understanding usage patterns, identifying and fixing errors, and managing the complexity of their code. DevCraftsman aims to address these challenges by providing a suite of features that can aid programmers in enhancing the calibre of their code. The tool is designed to be user-friendly and accessible to developers of all skill levels, regardless of their programming language or development environment. By using DevCraftsman, developers can gain a better understanding of how their code is being used and where potential issues may be lurking. This can help them improve the overall quality of their codebase, reduce the number of bugs and errors in their software, and ultimately save time and resources.

Some of the key features of DevCraftsman include:
- Displaying data metrics: DevCraftsman can help developers track and see GitHub repository's data metrics including stars, forks, contributors, issues, pull requests, commits, releases, branches, and total number of clones, providing valuable insights into the popularity, activity, and health of their codebase.

- Visualization: By leveraging DevCraftsman, developers can easily visualize daily data metrics, such as the number of commits, visitors, and total clones, collected from their code repositories. This can provide valuable insights into the usage and performance of their codebase, allowing them to identify trends and make informed decisions about how to improve their software.

- Code Summaries: DevCraftsman can generate summaries of program files, highlighting important details such as the number of lines of code, detailed explanation of each modules, and the overall complexity of the code.

- Error Detection: DevCraftsman can also identify static errors in the code, such as syntax errors or unused variables, helping developers catch potential issues early in the development process.

## How we built it
We used a range of modern technologies and tools to create DevCraftsman. For the backend, we utilized the FastAPI web framework, which allowed us to quickly and efficiently create endpoints for time complexity analysis, code summary or explanation, user authentication, and GitHub authorization. We implemented OAuth2 and JWT to ensure secure user authentication and authorization. To store user information and GitHub authorization tokens, we set up a MySQL database using Oracle's cloud infrastructure.

On the frontend, we utilized ReactJS to create an intuitive and responsive user interface. We designed the UI using the Bootstrap of ChakraUI library, which enabled us to create a visually appealing and user-friendly interface. We used the Axios library to handle HTTPS requests and fetch data from the FastAPI endpoints. We also utilized OpenAI's powerful API for generating summaries and analyzing the time complexity of code. To collect data from GitHub, we used the GitHub API, which allowed us to easily retrieve and analyze the data for metrics.

To deploy the tool, we utilized Docker, which allowed us to easily package and distribute the application. We deployed DevCraftsman in Oracle Cloud by creating a Kubernetes cluster, which we provisioned using Terraform. This allowed us to easily manage and scale our deployment, ensuring optimal performance and reliability for our users. The devops services used are Oracle Container Registry, Oracle MYSQL cluster, Oracle Kubernetes Cluster, Oracle CLI (oci), OCI Devops (build pipeline and deploy pipeline).

## Cloud Architecture

![WhatsApp Image 2023-02-17 at 8 03 59 PM](https://user-images.githubusercontent.com/73429989/219741953-c0b1a777-c5d6-4b36-8501-8eeeea432be0.jpeg)

## Work Flow
![WhatsApp Image 2023-02-17 at 11 22 39 AM](https://user-images.githubusercontent.com/73429989/219741934-1924b492-9c18-4abf-bae8-79a2566516b4.jpeg)


## Challenges we ran into
- DevCraftsman requires storing data about each user and their code submissions.
- Designing an efficient and scalable data model and learning new libraries and usage of API's was a challenge.
- Implementing and integrating the OpenAI API for generating code summaries and analyzing time complexity presented challenges in terms of understanding the API's functionality and incorporating it effectively into the application.
- Ensuring the security of user data, including authentication and authorization, was a complex challenge, especially when working with APIs such as GitHub's.
- Testing and deploying the application in the cloud environment was challenging, especially when dealing with Kubernetes and Terraform.

## What we learned
Throughout the development process, we gained a deeper understanding of the challenges and complexities involved in building a tool for developers, and learned how to balance the need for functionality and usability with performance and security.
- We learnt to create private endpoint access for the Github and OpenAI API keys and create secure user registration in FastAPI using JWT. 
- We also learnt to use OCI devops to automatically deploy the code when changes were made to the github repository. 
- We gained valuable experience in connecting and integrating with external APIs, such as the GitHub and OpenAI APIs, and learned how to securely and efficiently access and use these APIs within our application. 
- We learned how to use Terraform and OCI DevOps to automate the deployment process and ensure that our tool was always up-to-date and easily accessible to users.

## What's next for DevCraftsman
- Advanced code analysis to identify patterns and detect vulnerabilities using deep learning models.
- We plan to add support for more programming languages and frameworks, and to continue improving the tool's performance, scalability, and user interface based on user feedback and usage data.
- We also plan to explore the use of natural language processing to enhance the tool's capabilities for summarizing and explaining code, and to provide personalized recommendations and insights based on each user's programming style and preferences.
