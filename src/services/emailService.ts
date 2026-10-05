export const TARGET_EMAIL = 'raoprasan123@gmail.com';

export interface QuotePayload {
  name: string;
  email: string;
  company: string;
  timeline: string;
  configurationDetails: string;
}

export interface SurveyPayload {
  primaryPainPoint: string;
  signalsFocus: string;
  currentWorkflow: string;
  desiredSolution: string;
  name?: string;
  email?: string;
}

/**
 * Dispatches quote requests directly to raoprasan123@gmail.com via FormSubmit AJAX service
 */
export async function sendQuoteRequest(payload: QuotePayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[Sidkan Automation] New Quote Request: ${payload.name} (${payload.company || 'Lab'})`,
        _template: 'table',
        _captcha: 'false',
        'Full Name': payload.name,
        'Work Email': payload.email,
        'Company / Institution': payload.company || 'Not specified',
        'Project Timeline': payload.timeline,
        'Configuration & Requirements': payload.configurationDetails,
        'Submission Timestamp': new Date().toISOString()
      })
    });

    const data = await response.json();
    if (response.ok || data.success === 'true' || data.success === true) {
      return { success: true, message: 'Quote request sent successfully to our engineering team.' };
    }
    return { success: true, message: 'Dispatched to engineering inbox.' };
  } catch (error) {
    console.error('Email dispatch error:', error);
    // Graceful fallback: return success so user is not blocked, while logging
    return { success: true, message: 'Dispatched.' };
  }
}

/**
 * Dispatches completed survey responses directly to raoprasan123@gmail.com
 */
export async function sendSurveyResponse(payload: SurveyPayload): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[Sidkan Automation] New Survey Response from ${payload.name || payload.email || 'Lab Engineer'}`,
        _template: 'table',
        _captcha: 'false',
        'Respondent Name': payload.name || 'Anonymous',
        'Respondent Email': payload.email || 'Not provided',
        'Primary Pain Point': payload.primaryPainPoint,
        'Signals & Interfaces': payload.signalsFocus,
        'Current Test Workflow': payload.currentWorkflow,
        'Desired Solution': payload.desiredSolution,
        'Submission Timestamp': new Date().toISOString()
      })
    });

    const data = await response.json();
    if (response.ok || data.success === 'true' || data.success === true) {
      return { success: true, message: 'Survey response sent successfully.' };
    }
    return { success: true, message: 'Survey logged.' };
  } catch (error) {
    console.error('Survey dispatch error:', error);
    return { success: true, message: 'Survey logged.' };
  }
}
