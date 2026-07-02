import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, project_type, message } = data;

    const { data: resendData, error } = await resend.emails.send({
      from: '3Kubiko Web <onboarding@resend.dev>',
      to: ['3Kubiko.ventas@gmail.com'],
      subject: `Nuevo contacto web - ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Nuevo mensaje de contacto web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Proyecto:</strong> ${project_type}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify(resendData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
