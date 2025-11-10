# Contact Form Setup with n8n

This guide will help you configure the contact form to work with your existing n8n instance.

## Overview

The contact form will send submissions to an n8n webhook, which can then:
- Send you an email notification
- Store submissions in a database
- Forward to your CRM
- Send to Slack/Discord/Teams
- Or any other automation you want!

## Step 1: Create n8n Workflow

1. Access your n8n instance at `https://your-n8n-subdomain.yourdomain.com`

2. Click **"Add workflow"** and create a new workflow

3. **Add a Webhook node:**
   - Click the **+** button
   - Search for **"Webhook"**
   - Select **"Webhook"** node
   - Configure:
     - **HTTP Method**: POST
     - **Path**: `contact-form` (or any path you prefer)
     - **Authentication**: None (we'll add this later if needed)
   - Click **"Execute Node"** to get the webhook URL
   - Copy the **Production URL** (e.g., `https://n8n.yourdomain.com/webhook/contact-form`)

4. **Add an Email (Send) node:**
   - Click the **+** button after the webhook
   - Search for **"Send Email"**
   - Select **"Send Email"** node
   - Configure:
     - **From Email**: Your email (e.g., `noreply@yourdomain.com`)
     - **To Email**: Where you want to receive submissions (e.g., `contact@bigheartedlabs.com`)
     - **Subject**: `New Contact Form Submission from {{ $json.body.name }}`
     - **Email Type**: Text or HTML
     - **Text/HTML**:
       ```
       New contact form submission:

       Name: {{ $json.body.name }}
       Email: {{ $json.body.email }}
       Company: {{ $json.body.company }}

       Message:
       {{ $json.body.message }}

       ---
       Submitted at: {{ $now.format('YYYY-MM-DD HH:mm:ss') }}
       ```

   - **SMTP Configuration** (if using SMTP):
     - Host: Your SMTP server
     - Port: Usually 587 or 465
     - Username: Your email
     - Password: Your email password or app password

5. **Add a Respond to Webhook node:**
   - Click the **+** button after the Send Email node
   - Search for **"Respond to Webhook"**
   - Select **"Respond to Webhook"** node
   - Configure:
     - **Respond With**: JSON
     - **Response Body**:
       ```json
       {
         "success": true,
         "message": "Thank you! We'll get back to you soon."
       }
       ```
   - This sends a response back to the website confirming the submission was received

6. **Activate the workflow:**
   - Click **"Activate"** toggle in the top right
   - Your workflow is now live!

## Step 2: Test the Webhook

Test your webhook with curl:

```bash
curl -X POST https://n8n.yourdomain.com/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "message": "This is a test message"
  }'
```

You should receive an email!

## Step 3: Configure the Website

Add the webhook URL to your `.env` file:

```bash
NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/contact-form
```

Rebuild the Docker container:

```bash
docker-compose up -d --build bigheartedlabs
```

That's it! Your contact form is now live.

## Advanced Configuration

### Add Spam Protection

Add a **Filter** node between Webhook and Email:

- **Conditions**:
  - Email contains `@`
  - Name length > 2
  - Message length > 10

### Add Auto-Reply

Add another **Send Email** node that sends to `{{ $json.body.email }}`:

```
Subject: Thanks for contacting Big Hearted Labs

Hi {{ $json.body.name }},

Thank you for reaching out! We've received your message and will get back to you within 24 hours.

Best regards,
Big Hearted Labs Team
```

### Add to Slack/Discord

Add a **Slack/Discord** node to notify your team instantly:

```
New contact form submission!

👤 Name: {{ $json.body.name }}
📧 Email: {{ $json.body.email }}
🏢 Company: {{ $json.body.company }}
💬 Message: {{ $json.body.message }}
```

### Store in Database

Add a **Postgres/MySQL/MongoDB** node to store all submissions for future reference.

### Add Rate Limiting

In the Webhook node settings:
- Enable **"Respond Immediately"** to prevent slow responses
- Use n8n's built-in rate limiting or add a separate rate limit service

### Add reCAPTCHA (Optional)

For additional spam protection, you can add Google reCAPTCHA:

1. Get reCAPTCHA keys from Google
2. Add reCAPTCHA to the frontend form
3. In n8n, add an HTTP Request node to verify the reCAPTCHA token before processing

## Troubleshooting

### Emails not sending

**Check your SMTP credentials:**
- Make sure your email provider allows SMTP
- Gmail users: Use an App Password, not your regular password
- Check spam folder

**Alternative email providers:**
- SendGrid (free tier: 100 emails/day)
- Mailgun (free tier: 5,000 emails/month)
- AWS SES
- Use n8n's Gmail node instead of SMTP

### Webhook not receiving data

**Check the webhook URL:**
```bash
# Test with verbose output
curl -v -X POST https://n8n.yourdomain.com/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

**Check n8n logs:**
```bash
docker logs n8n
```

**Check Traefik routing:**
```bash
docker logs traefik | grep n8n
```

### CORS errors

If you get CORS errors in the browser, add to your n8n webhook node:
- **Response Headers**:
  - `Access-Control-Allow-Origin: https://bigheartedlabs.com`
  - `Access-Control-Allow-Methods: POST, OPTIONS`

Or better yet, configure Traefik to handle CORS.

## Example n8n Workflow (JSON)

Here's a complete workflow you can import:

```json
{
  "name": "Contact Form Handler",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "contact-form",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300],
      "webhookId": "contact-form"
    },
    {
      "parameters": {
        "fromEmail": "noreply@bigheartedlabs.com",
        "toEmail": "contact@bigheartedlabs.com",
        "subject": "=New Contact: {{ $json.body.name }}",
        "emailType": "text",
        "text": "=Name: {{ $json.body.name }}\nEmail: {{ $json.body.email }}\nCompany: {{ $json.body.company }}\n\nMessage:\n{{ $json.body.message }}",
        "options": {}
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "position": [450, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={ \"success\": true, \"message\": \"Thank you! We'll get back to you soon.\" }"
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{ "node": "Send Email", "type": "main", "index": 0 }]]
    },
    "Send Email": {
      "main": [[{ "node": "Respond to Webhook", "type": "main", "index": 0 }]]
    }
  }
}
```

Copy this and import it via **Workflows → Import from File** in n8n.

## Security Best Practices

1. **Enable authentication** on the webhook if it's publicly accessible
2. **Add rate limiting** to prevent abuse
3. **Validate all inputs** in n8n before processing
4. **Use environment variables** for sensitive data (email passwords, API keys)
5. **Monitor your workflow** for suspicious activity
6. **Keep n8n updated** to the latest version

## Next Steps

Once your contact form is working:
- [ ] Test from the actual website
- [ ] Check email delivery
- [ ] Set up auto-reply
- [ ] Add to Slack/Discord (optional)
- [ ] Monitor for spam
- [ ] Consider adding reCAPTCHA if you get spam
