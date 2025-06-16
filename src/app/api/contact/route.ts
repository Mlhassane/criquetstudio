import { NextResponse } from 'next/server';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message }: ContactForm = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'CRIQUET BROADCAST <mahamanelhassane@gmail.com>',
      to: ['criquetbroadcast@gmail.com'],
      subject: `Message de contact de ${name}`,
      reply_to: email,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ 
      message: 'Email envoyé avec succès',
      id: data?.id 
    }, { 
      status: 200 
    });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'envoi de l\'email' 
    }, { 
      status: 500 
    });
  }
}