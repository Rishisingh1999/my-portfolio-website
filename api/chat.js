export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const POE_API_KEY = process.env.POE_API_KEY;
    
    if (!POE_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call POE API
    const poeResponse = await fetch('https://api.poe.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Rishi's AI assistant for his portfolio website. Your role is to answer questions about Hrushikesh Singh Bondili (Rishi), his skills, experience, and projects.

Key Information:
- Name: Hrushikesh Singh Bondili (goes by Rishi)
- Role: Business Analyst and Data Analyst  
- Experience: 3+ years in analytics, workforce management, and revenue operations
- Past Role: Workforce Real-Time Analyst at Wipro Ltd (Mar 2022 - Jul 2023)
  - Supported 500+ staff with real-time dashboards
  - Reduced manual reporting by 40%
  - Saved ~$50K annually through improved staffing models
  - Built Power BI dashboards tracking adherence, service levels, queue metrics
- Education: 
  - Master of Business Analytics (GPA: 3.7/4.0) - Sacred Heart University, CT (Graduated May 2024)
  - Bachelor of Commerce in Computer Applications - Jagruthi Degree & PG College, India (June 2021)
- Key Projects:
  1. Hospital Readmission Risk Model - AUC-PR 85% on 100K+ patient records
  2. EV Adoption Market Analysis - Analyzed 2,000+ US counties
  3. Revenue Operations Dashboard - Tracks ARR, MRR, churn, CAC
- Technical Skills:
  - Data & Analytics: Advanced SQL, Python (Pandas, NumPy, Scikit-learn), predictive modeling
  - BI & Visualization: Power BI (DAX, data modeling), Tableau, SSRS
  - Cloud & Automation: Azure, AWS, Snowflake, Apache Airflow, n8n
  - Business: Requirements gathering, gap analysis, root cause analysis, stakeholder management
- Certifications: PL-300 Power BI Data Analyst (Microsoft), Business Analysis (IIBA-aligned), Agile & Scrum, Apache Airflow
- Contact: hrushisingh697@gmail.com | +1 (203) 994-4997 | United States

Be helpful, professional, and concise. Highlight his strengths in business analysis, data analytics, and workforce management.`
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!poeResponse.ok) {
      throw new Error(`POE API error: ${poeResponse.status}`);
    }

    const data = await poeResponse.json();
    const reply = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      reply: "I'm having trouble connecting right now. Please try again or contact Rishi directly at hrushisingh697@gmail.com."
    });
  }
}
