/**
 * InfoCard Usage Examples and Documentation
 * 
 * This file demonstrates how to use the new universal InfoCard component
 * to handle dynamic API responses with different content types.
 */

import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { AIResponseRenderer } from './ai-response-renderer';

export const InfoCardExamples = () => {
  // Example 1: Blog posts from your API
  const blogResponse = `Here are the latest blog posts from IT Path Solutions:

<component:info_card>
title: Medical Tourism In The Digital Age: How Technology And Apps Are Transforming Patient Care
link: https://www.itpathsolutions.com/build-a-medical-tourism-app/
fields:
 - key: Posted on
   value: August 22, 2025
 - key: Author
   value: Keyur Patel
<<end>>

<component:info_card>
title: AI Chatbots In Healthcare: Benefits, Use Cases, Challenges, And How To Build One
link: https://www.itpathsolutions.com/how-to-build-an-ai-chatbot-for-healthcare/
fields:
 - key: Posted on
   value: August 19, 2025
 - key: Author
   value: Keyur Patel
<<end>>

For more blog posts, please visit: https://www.itpathsolutions.com/blog/`;

  // Example 2: Job openings from your API
  const jobResponse = `Here are the latest job openings at IT Path Solutions:

<component:info_card>
title: Lead Business Consultant
link: https://www.itpathsolutions.com/careers/
fields:
  - key: Experience
    value: 3 to 6 years
  - key: Number of Openings
    value: 2 (Urgent)
  - key: Responsibilities
    value: Generate leads from international geographies, professional networks, forums, marketing campaigns, and other innovative methods
<<end>>

<component:info_card>
title: Digital Marketing Head
link: https://www.itpathsolutions.com/careers/
fields:
  - key: Experience
    value: 4 to 5 years
  - key: Number of Openings
    value: 1 (Urgent)
  - key: Responsibilities
    value: Develop and execute a comprehensive digital marketing strategy aligned with business objectives
<<end>>

For more details and to apply, please visit our [Careers page](https://www.itpathsolutions.com/careers/).`;

  // Example 3: Testimonials from your API
  const testimonialResponse = `Here are a few client testimonials for IT Path Solutions:

<component:info_card>
title: Rick Portillo
fields:
  - key: Quote
    value: "I've been working with IT Path Solutions for about two years. They've been great to work with, as they're professional and reliable. They're also available quite a bit throughout the day, even though I'm based in the US and they're in India. I've worked with three different developers on this project and all of them take the time to understand what I need and then do a great job to deliver. I would recommend IT Path Solutions to anyone! They work hard to deliver quality work. They have great communication and get back to you quickly, and make sure you are 100% happy with the project results once completed."
  - key: Client
    value: Rick Portillo
<<end>>

<component:info_card>
title: Mike Bryant
fields:
  - key: Quote
    value: "I have now worked on about 4 projects with IT Path Solutions team. A few of the ongoing projects have almost hit the 2 year mark. They do a good job assigning the right teams for the projects. Although I am in the US and they are mainly over in India, they have done their best to make themselves available when we need to talk. One of the areas that I respect them the most for is that they have been very fair and honest when it comes to pricing out projects and fulfilling what they said they would do. They are very professional and a company that you can trust."
  - key: Client
    value: Mike Bryant
<<end>>

For more testimonials, please visit our [Testimonials page](https://www.itpathsolutions.com/testimonials-it-path-solutions/).`;

  // Example 4: Mixed content with fallback
  const mixedResponse = `Here's some information about our services:

This is regular text that will be rendered as markdown.

<component:info_card>
title: Contact Information
fields:
  - key: Email
    value: contact@itpathsolutions.com
  - key: Phone
    value: +1-555-123-4567
  - key: Website
    value: https://www.itpathsolutions.com
  - key: Technologies
    value: React, Node.js, Python, AWS, Docker
  - key: Rating
    value: 4.8
<<end>>

And here's more text that continues after the component.

**This text has markdown formatting** and should render properly.`;

  // Example 5: Malformed component (testing fallback)
  const fallbackResponse = `Here's an example with malformed data:

<component:info_card>
title: This card is missing the closing tag but should still render
fields:
  - key: Status
    value: This should still work
  - key: Note
    value: The parser is robust and handles edge cases

Some text without proper component structure should fall back to markdown rendering.`;

  const examples = [
    { title: "Blog Posts", content: blogResponse },
    { title: "Job Openings", content: jobResponse },
    { title: "Testimonials", content: testimonialResponse },
    { title: "Mixed Content", content: mixedResponse },
    { title: "Fallback Handling", content: fallbackResponse }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        InfoCard Component Examples
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Universal component for rendering dynamic API responses with structured data
      </Typography>

      {examples.map((example, index) => (
        <Paper key={index} elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            {example.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <AIResponseRenderer message={example.content} />
        </Paper>
      ))}

      <Paper elevation={1} sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Key Features:
        </Typography>
        <Typography component="div" variant="body2" color="text.secondary">
          <ul>
            <li><strong>Dynamic rendering:</strong> Automatically detects and renders different field types</li>
            <li><strong>Smart formatting:</strong> Special handling for emails, phones, links, ratings, and technologies</li>
            <li><strong>Fallback support:</strong> Gracefully handles malformed or missing data</li>
            <li><strong>Markdown integration:</strong> Seamlessly combines structured components with markdown text</li>
            <li><strong>Icon mapping:</strong> Automatically assigns relevant icons based on field names</li>
            <li><strong>Responsive design:</strong> Works well on all screen sizes</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};

export default InfoCardExamples;
