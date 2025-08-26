import { LightningElement } from 'lwc';
import profilePic from '@salesforce/resourceUrl/profilePhoto';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import JSPDF from '@salesforce/resourceUrl/jspdf';
import linkedInImage from '@salesforce/resourceUrl/linkedinSvg'; // Assuming you have a LinkedIn image resource

export default class GptProfileComponent extends LightningElement {
    jsPdfInitialized = false;
    jsPDF;
    linkedinImage = linkedInImage; // LinkedIn image resource
    


    renderedCallback() {
        if (this.jsPdfInitialized) {
            return;
        }
        
        Promise.all([
            loadScript(this, JSPDF + '?' + new Date().getTime())
        ]).then(() => {
            // Store reference to the library
            this.jsPDF = window.jspdf.jsPDF;
            this.jsPdfInitialized = true;
            console.log('PDF library loaded successfully');
        }).catch(error => {
            console.error('Error loading PDF library:', error);
            this.showToast('Error', 'Error loading PDF library: ' + error.message, 'error');
        });
    }

    // Personal Information
    profilePicUrl = profilePic;
    name = 'Yogeeswar M';
    email = 'yogeeswar99@gmail.com';
    mailToLink = 'mailto:' + this.email; // Assuming you have an email variable defined
    location = 'Hyderabad, India';
    experience = '10 years in IT industry, 7 years in Salesforce';
    linkedInUrl = 'https://www.linkedin.com/in/yogeeswar-madupuri/';
    linkedInUrlLabel = 'LinkedIn Profile';
    trailblazerUrl = 'https://www.salesforce.com/trailblazer/ymadupuri';
    githubUrl = 'https://github.com/yogeeswarmadupuri';

    handleDownloadPDF() {
        if (!this.jsPdfInitialized || !this.jsPDF) {
            this.showToast('Error', 'PDF library not initialized', 'error');
            return;
        }

        try {
            console.log('Creating PDF...');
            const doc = new this.jsPDF();
            let yPos = 20;
            const margin = 20;
            const lineHeight = 7;
            
            console.log('Setting up header...');
            // Header section
            doc.setFontSize(24);
            try {
                doc.setFont('helvetica', 'bold');
            } catch (e) {
                console.error('Font error:', e);
                doc.setFont('Helvetica');
            }
            doc.text(this.name, margin, yPos);
            yPos += lineHeight * 2;

            // Contact Information
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(this.email, margin, yPos);
            yPos += lineHeight;
            doc.text(this.location, margin, yPos);
            yPos += lineHeight;
            doc.text(this.experience, margin, yPos);
            yPos += lineHeight * 2;

            // Professional Summary
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Professional Summary', margin, yPos);
            yPos += lineHeight;
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const summary = this.template.querySelector('.summary-text').textContent;
            const splitSummary = doc.splitTextToSize(summary, 170);
            doc.text(splitSummary, margin, yPos);
            yPos += (splitSummary.length * lineHeight) + lineHeight;

            // Skills Section
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Technical Skills', margin, yPos);
            yPos += lineHeight * 1.5;

            // Salesforce Skills
            doc.setFontSize(12);
            doc.text('Salesforce Expertise:', margin, yPos);
            yPos += lineHeight;
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            this.salesforceSkills.forEach(skill => {
                doc.text('• ' + skill, margin + 5, yPos);
                yPos += lineHeight;
            });
            yPos += lineHeight;

            // Secondary Skills
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Secondary Technologies:', margin, yPos);
            yPos += lineHeight;
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            this.secondarySkills.forEach(skill => {
                doc.text('• ' + skill, margin + 5, yPos);
                yPos += lineHeight;
            });
            yPos += lineHeight;

            // Check if we need a new page for leadership skills
            if (yPos > 240) { // Add some buffer for leadership section
                doc.addPage();
                yPos = 20;
            }

            // Leadership Skills with more space
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Leadership & Soft Skills', margin, yPos);
            yPos += lineHeight * 1.5;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            this.leadershipSkills.forEach(skill => {
                const splitText = doc.splitTextToSize('• ' + skill, 170);
                doc.text(splitText, margin, yPos);
                yPos += (splitText.length * lineHeight) + lineHeight * 0.5;
            });
            yPos += lineHeight;

            // Work Experience
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Professional Experience', margin, yPos);
            yPos += lineHeight * 1.5;

            doc.setFontSize(11);
            this.workExperience.forEach(job => {
                doc.setFont('helvetica', 'bold');
                doc.text(job.company, margin, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(job.duration, 120, yPos);
                yPos += lineHeight;
                
                doc.setFont('helvetica', 'italic');
                doc.text(job.position, margin, yPos);
                yPos += lineHeight;

                if (job.project) {
                    doc.setFont('helvetica', 'normal');
                    doc.text('Key Project: ' + job.project, margin, yPos);
                    yPos += lineHeight;
                }

                if (job.projects) {
                    doc.setFont('helvetica', 'normal');
                    doc.text('Key Projects:', margin, yPos);
                    yPos += lineHeight;
                    job.projects.forEach(project => {
                        doc.text('• ' + project, margin + 5, yPos);
                        yPos += lineHeight;
                    });
                }
                yPos += lineHeight;
            });

            // Education Section
            doc.addPage(); // Start new page for remaining sections
            yPos = 20; // Reset Y position
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Education', margin, yPos);
            yPos += lineHeight * 1.5;

            doc.setFontSize(11);
            this.education.forEach(edu => {
                doc.setFont('helvetica', 'bold');
                doc.text(edu.institution, margin, yPos);
                yPos += lineHeight;
                
                if (edu.degree) {
                    doc.setFont('helvetica', 'normal');
                    doc.text(edu.degree, margin, yPos);
                    yPos += lineHeight;
                }
                
                doc.setFont('helvetica', 'normal');
                doc.text(`${edu.year} - ${edu.grade}`, margin, yPos);
                yPos += lineHeight * 1.5;
            });

            // Certifications Section
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Certifications', margin, yPos);
            yPos += lineHeight * 1.5;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            this.certifications.forEach(cert => {
                doc.text('• ' + cert.name, margin, yPos);
                yPos += lineHeight;
            });
            yPos += lineHeight;

            // Achievements Section - Start on new page
            doc.addPage();
            yPos = 20;

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Key Achievements', margin, yPos);
            yPos += lineHeight * 1.5;

            // Define categories and their achievements
            const achievementCategories = [
                { title: 'Enterprise Integration & Architecture', endIndex: 4 },
                { title: 'Advanced Salesforce Development', endIndex: 8 },
                { title: 'Migration & DevOps Excellence', endIndex: 11 },
                { title: 'Legal & Document Automation', endIndex: 13 },
                { title: 'Test Automation Innovation', endIndex: 17 },
                { title: 'Leadership & Process Excellence', endIndex: 21 },
                { title: 'Business Impact & Recognition', endIndex: 23 }
            ];

            let startIndex = 0;
            doc.setFontSize(11);
            let pageHeight = doc.internal.pageSize.height - 20; // Get usable page height

            achievementCategories.forEach((category, idx) => {
                // Check if we need a new page
                if (yPos > pageHeight - 40) { // Leave space for at least title and one achievement
                    doc.addPage();
                    yPos = 20;
                }

                // Add category title
                doc.setFont('helvetica', 'bold');
                doc.text(category.title + ':', margin, yPos);
                yPos += lineHeight * 1.2;

                // Add achievements for this category
                doc.setFont('helvetica', 'normal');
                for (let i = startIndex; i < category.endIndex; i++) {
                    // Calculate height needed for this achievement
                    const splitText = doc.splitTextToSize('• ' + this.achievements[i], 170);
                    const textHeight = splitText.length * lineHeight;

                    // Check if we need a new page for this achievement
                    if (yPos + textHeight > pageHeight) {
                        doc.addPage();
                        yPos = 20;
                    }

                    doc.text(splitText, margin, yPos);
                    yPos += textHeight + (lineHeight * 0.5); // Add half line spacing between achievements
                }

                // Add spacing between categories
                yPos += lineHeight * (idx < achievementCategories.length - 1 ? 1 : 0); // No extra space after last category
                startIndex = category.endIndex;
            });

            console.log('Saving PDF...');
            // Save the PDF
            try {
                doc.save('YogeeswarM_Resume.pdf');
                console.log('PDF saved successfully');
                this.showToast('Success', 'PDF downloaded successfully', 'success');
            } catch (saveError) {
                console.error('Error saving PDF:', saveError);
                throw saveError;
            }
        } catch (error) {
            this.showToast('Error', 'Failed to generate PDF: ' + error.message, 'error');
        }
    }

    // Removed duplicate showToast method
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }

    // Skills categorized
    salesforceSkills = [
        'Agentforce',
        'Prompt Template',
        'Agent Actions',
        'Agentforce with Salesforce Einstein',
        'Apex with Enterprise Patterns',
        'Lightning Web Components (LWC)',
        'SOQL/SOSL',
        'Experience Cloud',
        'Sales Cloud',
        'REST API Integration',
        'Visualforce Pages',
        'Async Apex',
        'Batch Apex',
        'Single Sign-On (SSO)',
        'CI/CD',
        'Data Loader'
    ];

    secondarySkills = [
        'SQL',
        'Core Java',
        'Selenium',
        'TestNG',
        'Maven',
        'Cucumber',
        'Copado'
    ];

    leadershipSkills = [
        'Team Management',
        'Creative Thinking',
        'Collaborative Leadership',
        'Agile Methodologies',
        'Code Review',
        'Technical Mentoring'
    ];
    // Certifications with public badge image URLs (replace placeholders)
    certifications = [
        {
            name: 'Salesforce Certified Administrator',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/Administrator.png'
        },
        {
            name: 'Platform Developer I',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/Programmer.I.png'
        },
        {
            name: 'Platform Developer II',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/Programmer.II.png'
        },
        {
            name: 'Experience Cloud Consultant',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/Experience.Cloud.Consultant.png'
        },
        {
            name: 'Platform App Builder',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/App.Builder.png'  
        },
        {
            name: 'Sales Cloud Specialist',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/Sales.Consultant.png'
        },
        {
            name: 'AI Associate',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/AI.Associate.png'
        },
        {
            name: 'Data Cloud Consultant',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/Data.Cloud.Consultant.png'
        },
        {
            name: 'Copado Fundamentals I',
            imageUrl: 'https://abhimanyud3dx.github.io/superqbit-static-resources/resources/images/cert/copado/Fundamentals I Metadata Pipeline.png'
        }
    ];

    // Work Experience
    workExperience = [
        {
            company: 'F5 Networks',
            position: 'Software Developer Engineer III',
            duration: 'Sep 2020 - Present',
            project: 'MyF5 Application - Customer Experience Portal'
        },
        {
            company: 'UST Global Sdn. Bhd.',
            position: 'Software Development Engineer',
            duration: 'Aug 2018 - Aug 2020',
            projects: ['Salesforce DCS - Legal NDA', 'Salesforce DCS - Seller Application']
        },
        {
            company: 'Newt Global Pvt Ltd.',
            position: 'Automation Test Engineer',
            duration: 'Nov 2017 - Jul 2018',
            project: 'Bill to Cash Automation'
        },
        {
            company: 'UST Global',
            position: 'Automation Test Engineer',
            duration: 'Aug 2015 - Nov 2017',
            project: 'Turnpike Automation - Vehicle Insurance Processing'
        }
    ];

    // Education
    education = [
        {
            institution: 'P. R. Engineering College',
            degree: 'Electronics and Communication Engineering',
            year: '2014',
            grade: 'CGPA - 8.0 / 10'
        },
        {
            institution: 'Sri Chaitanya Co-Educational Junior College',
            year: '2010',
            grade: 'Percentage - 93%'
        },
        {
            institution: 'Vidhyodaya English Medium School',
            year: '2008',
            grade: 'Percentage - 78%'
        }
    ];

    // Key Achievements
    /*achievements = [
        'Developed custom LWC solutions for exporting list views from multiple objects at once.',
        'Built a custom solution to restore 25k community users who were accidentally deactivated.',
        'Developed a dynamic Visualforce page for a legal team to streamline agreement details.',
        'Implemented Boomi for data flow and integration between Salesforce and Clarify for trials fulfillment.',
        'Wrote custom logic for integrating third-party applications using REST APIs.',
        'Utilized Platform Events to build an exception logging framework and for real-time data synchronization with external systems.',
        'Proficient in Apex development, including triggers, scheduled jobs (Batch Apex), and Queueable jobs.',
        'Experienced in converting Process Builders to Flows.',
        'Involved in Salesforce Org Migration and Domain Impact Analysis.',
        'Experienced with Copado for managing deployments.',
        'Developed automation frameworks using C# and Selenium to reduce manual validation and improve data quality.',
        'Created test automation scripts with Selenium and TestNG for smoke and regression testing.',
        'Actively participated in all phases of the Scrum ceremony.',
        'Provided production support to resolve customer tickets and gave demos to business users.'
    ];*/
    achievements = [
    // Enterprise Integration & Architecture
    'Architected custom exception logging and integration data logging frameworks enabling effortless developer integration across teams.',
    'Implemented Platform Events for real-time data synchronization between Salesforce and external systems via Boomi subscriptions.',
    'Built advanced Okta SSO integration using Salesforce JIT Handler for seamless user authentication and provisioning.',
    'Developed enterprise-scale REST API integrations with third-party applications using custom Connected Apps and credential management.',
    
    // Advanced Salesforce Development
    'Created custom LWC solutions for multi-object list view exports, centralizing data access across multiple business units.',
    'Engineered Dynamic Apex solutions utilizing Object and Field describe information for runtime SOQL, SOSL, and DML operations.',
    'Implemented custom Field History Tracking framework beyond standard Salesforce capabilities for enhanced audit trails.',
    'Successfully restored 25k community users after ServiceNow mass deactivation through custom data recovery solutions.',
    
    // Migration & DevOps Excellence
    'Led end-to-end Salesforce Org Migration with comprehensive domain impact analysis ensuring zero business disruption.',
    'Modernized legacy automation by converting Process Builders to Flows, improving performance and maintainability.',
    'Configured and managed Copado deployments for streamlined CI/CD processes across multiple environments.',
    
    // Legal & Document Automation
    'Developed dynamic Visualforce pages with Adobe integration for legal team agreement generation and digital acceptance workflows.',
    'Created PDF rendering solutions with dynamic parameters for contract generation between enterprise clients.',
    
    // Test Automation Innovation
    'Built comprehensive C# + Selenium automation framework specifically for validating dynamic PDF document generation with variable parameters.',
    'Designed cross-platform test automation covering end-to-end business processes from Salesforce UI to document output validation.',
    'Implemented Jenkins-based CI/CD pipelines with automated smoke and regression test suites, reducing manual testing by 80%.',
    'Developed custom Selenium wrapper functions and TestNG frameworks for complex automated testing scenarios.',
    
    // Leadership & Process Excellence
    'Independently managed full-stack application lifecycle ensuring quality delivery across development, testing, and deployment phases.',
    'Collaborated with Technical Architects and developers to resolve complex requirement conflicts and technical challenges.',
    'Active Scrum participant across all ceremonies with focus on quality metrics evaluation and defect prioritization strategies.',
    'Delivered technical demos to business stakeholders and maintained comprehensive documentation in Confluence.',
    
    // Business Impact & Recognition
    'Received multiple Bef5 awards for exceptional project performance and technical innovation.',
    'Reduced manual validation overhead while significantly improving data quality through strategic automation implementation.'
];
}
