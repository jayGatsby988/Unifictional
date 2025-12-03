import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, phone, size, useCase, preferredTime } = body;

    // Format preferred time for display
    const formatPreferredTime = (time: string) => {
      // If it's already formatted (from calendar), return as-is
      if (time.includes('at') || time.includes('AM') || time.includes('PM')) {
        return time;
      }
      // Otherwise, check old format mapping
      const timeMap: { [key: string]: string } = {
        'morning-9am': '9:00 AM - 10:00 AM',
        'morning-10am': '10:00 AM - 11:00 AM',
        'morning-11am': '11:00 AM - 12:00 PM',
        'afternoon-12pm': '12:00 PM - 1:00 PM',
        'afternoon-1pm': '1:00 PM - 2:00 PM',
        'afternoon-2pm': '2:00 PM - 3:00 PM',
        'afternoon-3pm': '3:00 PM - 4:00 PM',
        'afternoon-4pm': '4:00 PM - 5:00 PM',
        'flexible': 'Flexible - Any time works',
      };
      return timeMap[time] || time;
    };

    // Check if Gmail credentials are configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      console.error('Gmail User:', gmailUser ? 'Set' : 'Missing');
      console.error('Gmail Password:', gmailPassword ? 'Set' : 'Missing');
      
      // Still log the form submission for debugging
      console.log('Form submission received:', {
        name,
        email,
        company,
        phone,
        size,
        useCase,
        preferredTime,
        message,
      });

      return NextResponse.json(
        { 
          message: 'Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.',
          error: 'Missing email credentials',
          code: 'MISSING_CREDENTIALS'
        },
        { status: 503 }
      );
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Email content
    const mailOptions = {
      from: gmailUser,
      to: 'Unifictional@gmail.com',
      subject: `🚀 New Demo Booking Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #F6B800 0%, #1F4F9A 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Demo Request! 🎉</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #111827; margin-top: 0;">Contact Details:</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #1F4F9A;">👤 Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #1F4F9A;">📧 Email:</strong> <a href="mailto:${email}" style="color: #F6B800;">${email}</a></p>
              ${company ? `<p style="margin: 10px 0;"><strong style="color: #1F4F9A;">🏢 Company:</strong> ${company}</p>` : ''}
              ${phone ? `<p style="margin: 10px 0;"><strong style="color: #1F4F9A;">📱 Phone:</strong> ${phone}</p>` : ''}
              ${size ? `<p style="margin: 10px 0;"><strong style="color: #1F4F9A;">👥 Company Size:</strong> ${size}</p>` : ''}
              ${useCase ? `<p style="margin: 10px 0;"><strong style="color: #1F4F9A;">🎯 Use Case:</strong> ${useCase}</p>` : ''}
              ${preferredTime ? `<p style="margin: 10px 0;"><strong style="color: #1F4F9A;">⏰ Preferred Meeting Time:</strong> ${formatPreferredTime(preferredTime)}</p>` : ''}
            </div>
            
            <div style="margin-top: 25px; padding: 20px; background-color: #f3f4f6; border-radius: 8px; border-left: 4px solid #F6B800;">
              <h3 style="color: #111827; margin-top: 0;">💬 Message:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                ⏰ Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p>This is an automated notification from your Unifictional website</p>
          </div>
        </div>
      `,
    };

    // Send email
    console.log('Attempting to send email to:', 'Unifictional@gmail.com');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Full error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return NextResponse.json(
      { 
        message: 'Failed to send email', 
        error: error.message || String(error),
        code: error.code 
      },
      { status: 500 }
    );
  }
}

